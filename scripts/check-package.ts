import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { packReleasePlan } from './pack-release.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const packageRoot = join(root, 'packages/core');
const consumer = mkdtempSync(join(tmpdir(), 'dominate-color-consumer-'));
const bun = process.execPath;
const compiler = join(root, 'node_modules/typescript/bin/tsc');

try {
  const sourceManifest = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
  const sourcePlan = join(consumer, 'source-plan.json');
  writeFileSync(
    sourcePlan,
    JSON.stringify({
      version: 1,
      plan: [
        [
          {
            kind: 'publish',
            name: sourceManifest.name,
            version: sourceManifest.version,
            access: 'public',
            tag: 'latest',
          },
        ],
      ],
    }),
  );
  const packedPlan = await packReleasePlan(sourcePlan, consumer);
  const tarball = packedPlan.plan[0][0].tarball;
  assert.ok(tarball, 'Expected a Bun-packed release artifact');
  writeFileSync(
    join(consumer, 'package.json'),
    JSON.stringify({
      name: 'package-consumer-smoke',
      private: true,
      dependencies: { '@dominate-color.js/core': `./${tarball.path}` },
    }),
  );
  execFileSync(bun, ['install', '--ignore-scripts'], { cwd: consumer, stdio: 'pipe' });

  for (const extension of ['mjs', 'cjs']) {
    const load =
      extension === 'mjs'
        ? "import * as core from '@dominate-color.js/core';"
        : "const core = require('@dominate-color.js/core');";
    writeFileSync(
      join(consumer, `smoke.${extension}`),
      `${load}
      const assert = ${extension === 'mjs' ? "(await import('node:assert/strict')).default" : "require('node:assert/strict')"};
      assert.equal(core.toHex([255, 0, 0, 1]), '#ff0000');
      assert.equal(typeof core.colorDetection, 'function');
      assert.deepEqual(core.imageToMatrix({ data: new Uint8ClampedArray([255, 0, 0, 255]) }), [[255, 0, 0, 1]]);
    `,
    );
    execFileSync('node', [`smoke.${extension}`], { cwd: consumer, stdio: 'pipe' });
  }

  for (const extension of ['mts', 'cts']) {
    writeFileSync(
      join(consumer, `types.${extension}`),
      `
      import { colorDetection, toHex, type RGBAColor } from '@dominate-color.js/core';
      const color: RGBAColor = [255, 0, 0, 1];
      const hex: string = toHex(color);
      const result: Promise<RGBAColor[]> = colorDetection(new ArrayBuffer(1), { distance: 'fast' });
      void hex; void result;
    `,
    );
  }
  execFileSync(
    'node',
    [
      compiler,
      '--noEmit',
      '--strict',
      '--module',
      'NodeNext',
      '--target',
      'ES2022',
      '--lib',
      'ES2022,DOM',
      'types.mts',
      'types.cts',
    ],
    { cwd: consumer, stdio: 'pipe' },
  );

  const manifest = JSON.parse(
    readFileSync(join(consumer, 'node_modules/@dominate-color.js/core/package.json'), 'utf8'),
  );
  assert.equal(manifest.name, '@dominate-color.js/core');
  for (const field of [
    'dependencies',
    'devDependencies',
    'optionalDependencies',
    'peerDependencies',
  ]) {
    for (const version of Object.values(manifest[field] ?? {})) {
      assert.equal(typeof version, 'string');
      assert.ok(
        !/^(catalog|workspace):/.test(String(version)),
        `Unresolved protocol in packed ${field}`,
      );
    }
  }
  console.log(
    'Bun release artifact: catalog/workspace references resolved; Node and TypeScript ESM/CJS consumers passed.',
  );
} finally {
  // Only remove the temporary directory created by this invocation.
  assert.equal(dirname(resolve(consumer)), resolve(tmpdir()));
  assert.ok(consumer.includes('dominate-color-consumer-'));
  rmSync(consumer, { recursive: true, force: true });
}

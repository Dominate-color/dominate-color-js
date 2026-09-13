import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { glob } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

type Release = {
  kind: string;
  name: string;
  version: string;
  tarball?: { path: string; integrity: string };
};

/** Preserve the Changesets publish plan, replacing publish entries with Bun-packed artifacts. */
export async function packReleasePlan(planPath: string, outputDirectory: string) {
  const plan = JSON.parse(readFileSync(planPath, 'utf8')) as { version: number; plan: Release[][] };
  assert.equal(plan.version, 1, 'Unsupported Changesets publish plan version');
  assert.ok(Array.isArray(plan.plan), 'Expected Changesets release groups');
  const workspaceConfig = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
    workspaces: { packages: string[] };
  };
  const patterns = workspaceConfig.workspaces.packages;
  const manifests = patterns
    .filter((pattern) => !pattern.startsWith('!'))
    .map((pattern) => `${pattern.replace(/\/$/, '')}/package.json`);
  const exclude = [
    '**/node_modules/**',
    '**/.git/**',
    ...patterns
      .filter((pattern) => pattern.startsWith('!'))
      .map((pattern) => `${pattern.slice(1).replace(/\/$/, '')}/package.json`),
  ];
  const packagesByName = new Map<
    string,
    {
      dir: string;
      packageJson: { name: string; version: string; private?: boolean };
    }
  >();
  for await (const manifest of glob(manifests, { cwd: root, exclude })) {
    const manifestPath = resolve(root, manifest);
    const packageJson = JSON.parse(readFileSync(manifestPath, 'utf8'));
    assert.ok(!packagesByName.has(packageJson.name), `Duplicate workspace: ${packageJson.name}`);
    packagesByName.set(packageJson.name, { dir: dirname(manifestPath), packageJson });
  }
  const packagesDirectory = resolve(outputDirectory, 'packages');
  mkdirSync(packagesDirectory, { recursive: true });

  for (const group of plan.plan) {
    assert.ok(Array.isArray(group), 'Expected a release group');
    for (const release of group) {
      if (release.kind !== 'publish') continue;
      const pkg = packagesByName.get(release.name);
      assert.ok(pkg && !pkg.packageJson.private, `Unknown or private package: ${release.name}`);
      assert.equal(
        pkg.packageJson.version,
        release.version,
        'Publish plan version differs from workspace',
      );
      const filename = `${release.name.replace(/^@/, '').replaceAll('/', '-')}-${release.version}.tgz`;
      const tarball = resolve(packagesDirectory, filename);
      assert.equal(dirname(tarball), packagesDirectory, 'Tarball path escaped output directory');
      execFileSync(process.execPath, ['pm', 'pack', '--filename', tarball], {
        cwd: pkg.dir,
        stdio: 'pipe',
      });
      release.tarball = {
        path: `packages/${filename}`,
        integrity: `sha256-${createHash('sha256').update(readFileSync(tarball)).digest('base64')}`,
      };
    }
  }

  // This is the public artifact format consumed by changeset publish --from-pack-dir.
  writeFileSync(join(outputDirectory, 'publish-plan.json'), `${JSON.stringify(plan, null, 2)}\n`);
  return plan;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const outputDirectory = join(root, '.release');
  mkdirSync(outputDirectory, { recursive: true });
  const sourcePlan = join(outputDirectory, 'source-plan.json');
  execFileSync(
    'node',
    [join(root, 'node_modules/@changesets/cli/bin.js'), 'publish-plan', '--output', sourcePlan],
    { cwd: root, stdio: 'inherit' },
  );
  await packReleasePlan(sourcePlan, outputDirectory);
  console.log('Bun release artifacts are ready in .release; nothing has been published.');
}

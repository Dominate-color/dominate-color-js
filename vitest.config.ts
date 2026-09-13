import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  test: {
    projects: [
      {
        test: {
          name: 'core',
          environment: 'node',
          include: ['packages/core/tests/**/*.test.ts'],
          restoreMocks: true,
          unstubGlobals: true,
        },
      },
    ],
    coverage: {
      provider: 'v8',
      include: ['packages/core/src/**/*.ts'],
      exclude: ['packages/core/src/**/index.ts', 'packages/core/src/**/*.d.ts'],
      reporter: ['text', 'json-summary', 'lcov'],
      // Existing suite baseline; old top-level coverage percentages were not enforced.
      thresholds: { statements: 84, branches: 49, functions: 91, lines: 81 },
    },
  },
});

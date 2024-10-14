import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  const tsconfigPath = mode === 'test'
    ? './tsconfig.test.json'
    : './tsconfig.build.json';

  return {
    plugins: [
      dts({ outDir: 'dist/dts', tsconfigPath }),
    ],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: true,
      lib: {
        entry: 'src/index.ts',
        formats: ['es', 'cjs'],
        fileName: 'index',
      },
    },
    test: {
      environment: 'happy-dom',
      include: ['tests/**/*.ts'],
      coverage: {
        enabled: true,
        provider: 'v8',
        include: ['src/**/*.ts'],
        exclude: ['src/**/index.ts'],
        branches: 100,
        functions: 100,
        statements: 100,
        lines: 100,
      },
    },
  };
});
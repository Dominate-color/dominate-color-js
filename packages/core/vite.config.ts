import { createViteConfig, createVitestConfig } from 'build-utils';

import packageJson from './package.json';

export default createViteConfig({
  packageName: packageJson.name,
  formats: ['es', 'cjs'],
  external: [
      '@dominate-color.js/math',
  ],
  test: createVitestConfig({
    coverage: {
      branches: 100,
      functions: 100,
      statements: 100,
      lines: 100,
    },
  }),
});

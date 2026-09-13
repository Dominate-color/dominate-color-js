[code-badge]: https://img.shields.io/badge/source-black?logo=github

# @dominate-color.js

A mono repository containing all packages named [dominate-color.js](/)

> ⚠️The package utilizes the Web API. If you intend to use it in a
> different environment, please check the repository for the
> presence of polyfills. If they are missing, you will be
> responsible for providing them.

## Packages

### [`@dominate-color.js/core`](https://github.com/Dominate-color/dominate-color-js#readme)

[core-npm-badge]: https://img.shields.io/npm/v/@dominate-color.js/core?logo=npm

[![core-npm-badge]](https://npmjs.com/package/@dominate-color.js/core)
![Size](https://img.shields.io/bundlephobia/minzip/@dominate-color.js/core)
[![code-badge]](https://github.com/Dominate-color/dominate-color-js/tree/master/packages/core)

A TypeScript library that is adept at extracting the dominant color from an image and providing detailed color analysis.

The functionality of `@dominate-color.js/core` is built to be precise and efficient, offering developers the tools needed to analyze colors in images, extract color palettes, and convert them into different formats, such as RGBA.

Prior to integrating `@dominate-color.js/core` into your project, it's recommended to review the [documentation](https://github.com/Dominate-color/dominate-color-js#readme) thoroughly to understand the full capabilities of the library and how to implement it effectively.

## Development

Use Bun 1.4.2 and Node.js 24.21.0 (pinned in `.bun-version` and `.node-version`). Bun manages the workspaces and dependencies; Vite, Vitest, and the package consumer checks also use Node. Library consumers do not need Bun.

```sh
bun install --frozen-lockfile
bun run check
```

| Command                                   | Purpose                                                               |
| ----------------------------------------- | --------------------------------------------------------------------- |
| `bun run build`                           | Build ESM/CJS with Vite, then emit declarations with TypeScript       |
| `bun run test` / `bun run test:watch`     | Run / watch the Vitest unit suite                                     |
| `bun run test:coverage`                   | Report coverage and enforce the existing suite baseline               |
| `bun run typecheck`                       | Check library, tests, scripts, and configuration types                |
| `bun run lint` / `bun run lint:types`     | Oxlint correctness checks / type-aware checks                         |
| `bun run format` / `bun run format:check` | Write / check Oxfmt formatting                                        |
| `bun run release:check`                   | Pack and test a temporary ESM/CJS + TypeScript consumer               |
| `bun run check`                           | Lint, formatting, types, unit tests, build, and package checks        |
| `bun run test:browser`                    | Build and run the browser smoke test in Chromium, Firefox, and WebKit |

Install browser binaries before the first browser run:

```sh
bunx playwright install chromium firefox webkit
bun run test:browser
```

On Linux CI, use `bunx playwright install --with-deps chromium firefox webkit`. CI checks fresh installs on Linux and Windows, and real browser APIs on Linux. Use `bun run test`, not `bun test`: this project retains Vitest and its coverage integration.

The browser suite always checks package imports. Image decoding is explicitly skipped when the browser build lacks `OffscreenCanvas` or `createImageBitmap` (for example, Playwright WebKit on Windows); this tooling change does not add browser polyfills.

The tooling migration intentionally leaves `packages/core/src` unchanged, including formatting. Oxfmt temporarily excludes that directory. Two narrow Oxlint overrides preserve existing defaults and array-to-string conversions in the color helpers; they do not disable type checking. Existing unit coverage is approximately 84% statements, 49% branches, 91% functions, and 81% lines. The previous configuration's top-level `100` coverage fields did not enforce thresholds; the new `coverage.thresholds` prevents regression from the measured baseline. Improving algorithm correctness and coverage remains separate work.

## Bun monorepo

The root `package.json` uses Bun's object-form `workspaces` configuration:

- `packages`: workspace discovery under `packages/*`.
- `catalog`: shared TypeScript, Vite, and Node type versions, referenced with `catalog:`.
- `catalogs.testing`: Vitest, its coverage provider, and Playwright, referenced with `catalog:testing`.
- `catalogs.quality`: Oxlint, its type-aware engine, and Oxfmt, referenced with `catalog:quality`.

Root tooling and `packages/core` both consume these catalogs. A shared version is declared once; change its catalog entry and run `bun install`. Internal packages continue to use `workspace:*`. The explicit `isolated` linker in `bunfig.toml` and the single committed `bun.lock` apply to all workspaces. See [Bun catalogs](https://bun.sh/docs/pm/catalogs).

`build` and the package part of `typecheck` use `bun run --workspaces` so newly added workspace scripts participate automatically. `dev` uses `--parallel --workspaces` to start watch processes together. Config-only packages do not need dummy build scripts. `packages:lint`, `packages:test`, and `packages:typecheck` run each workspace's own command; a package's Vitest command selects its own project. The root test command runs the shared Vitest project suite once, with aggregate coverage available separately.

Useful native commands:

```sh
# Run one package or a package plus its workspace dependencies.
bun run --filter '@dominate-color.js/core' test
bun run --filter '@dominate-color.js/core...' build

# Add an existing shared dependency to another workspace through its catalog.
bun add --cwd packages/core -D vitest --catalog=testing

# Inspect installed dependencies and explain a version.
bun pm ls
bun why vitest
bun outdated --filter './packages/*'
```

Filters also support exclusions and selecting dependent packages. Keep `build` dependency-aware; use `--parallel` for independent or persistent tasks. [Bun workspace commands](https://bun.sh/docs/pm/filter)

## Releases

Use ordinary `git commit` for commits. Commitizen, its Conventional Changelog adapter, and mandatory commit hooks are not needed here: release versions and changelogs come from Changeset files, not commit-message parsing. Conventional-style subjects such as `fix: ...` or `chore: ...` remain an optional convention.

Use `bun run changeset` to record a release entry. `bun run version-packages` updates versions and the Bun lockfile together. Changesets does not auto-commit these intermediate edits; commit the completed changes yourself, or let the release action create its version PR.

`bun run release:pack` asks Changesets for the publish plan and packs its public packages with **`bun pm pack`** into `.release`. Bun resolves both `catalog:` and `workspace:` references in the tarballs. `bun run release` then passes those artifacts to `changeset publish --from-pack-dir .release`, preserving Changesets' version selection, tags, and GitHub action integration. Changesets uses npm for the registry upload; installation and workspace management use Bun exclusively.

`release:pack` and `release:check` never publish. The latter exercises the same Bun packing code using an offline fixture plan and verifies that the packed manifest contains no unresolved catalog/workspace references before testing Node and TypeScript consumers.

Workspace discovery in the packing script uses the built-in `node:fs/promises` glob API, supported by the pinned Bun runtime. It reads the root workspace patterns, including exclusions, without a direct dependency on `@manypkg/get-packages`. Changesets still brings that package transitively.

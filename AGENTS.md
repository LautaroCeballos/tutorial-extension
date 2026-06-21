# AGENTS.md

MakeCode Arcade extension package. The PXT extension lives at the **root** of this repository (MakeCode imports a GitHub repo by looking for `pxt.json` at the root). No monorepo, no `package.json`, no `node_modules` — development happens in the MakeCode web editor against this GitHub repo.

## Layout

- `pxt.json` — extension manifest (required, must be at the repo root).
- `main.ts` — TypeScript source; exported `namespace`s become block categories, annotated functions become blocks.
- `README.md` — must contain a `for PXT/TARGET` line or the extension will not surface in MakeCode search even after approval. See https://makecode.com/extensions/getting-started.
- `tests/main.ts` — only included when the extension is compiled as the top-level program (i.e. when running tests). Listed in `pxt.json` `testFiles`.
- `icon.png` — optional; 16:9 ratio, ≥184 px wide. Only consumed by approved extensions.

## Gotchas

- **`pxt.json` at root, not in a subdirectory**: MakeCode's GitHub importer looks for the manifest at the top level. A nested `tutorial-extension/pxt.json` is invisible to the editor — the extension will not appear in Gear → Extensions, and the search will not find it. If you see the same name twice in the GitHub repo browser, that means the manifest is nested and the editor cannot pick it up.
- **Dependency on `core`**: to use Arcade APIs (`sprites`, `controller`, `scene`, `game`, `SpriteKind`, etc.), `pxt.json` `dependencies` must include `"core": "*"`. Omitting it compiles in isolation but blocks the user from calling the built-ins.
- **Size limit**: extension must be < 64 KB total. Larger files fail with `'{"message":"maximum file size in package is ~64k; file main.ts; size #####"}'`. Keep `main.ts` lean; split into multiple files.
- **`for PXT/TARGET` marker**: `README.md` must contain a line starting with `for PXT/TARGET`. Auto-added on repo init; do not delete.
- **Block annotations start with `//%`**: not regular comments. `//% block` (or `//% block="..."`) on exported functions is what surfaces them. `//% color`, `//% weight`, `//% icon` go on the namespace. See https://makecode.com/defining-blocks.
- **Renaming breaks users**: changing a function/namespace name changes the derived `blockId` and invalidates existing user projects. Set `//% blockId=...` explicitly on anything user-visible.
- **Localization**: per-block overrides use `//% block.loc.<lang>` and `//% jsdoc.loc.<lang>`; bulk strings go in `_locales/<lang>/strings.json`. Not needed unless shipping translations.
- **Help pages**: `//% help=github:repo-name/path/to/doc` links a block to `docs/<file>.md` (no `.md` extension in the attribute). `//% help=none` disables help for that block.
- **Tests**: `testFiles` + `testDependencies` in `pxt.json` gate the test harness. Tests run only when the extension itself is built standalone, not when imported into a project.
- **C++ not allowed in web editor**: PXT web authoring is TypeScript-only. C++ extensions require the local CLI + toolchain.
- **No `npm install` here**: there is no `package.json`. Do not introduce one; the extension is published via the GitHub sync button in the editor.

## Development workflow

1. Author/edit `main.ts` and `pxt.json` in the MakeCode editor (Import this GitHub repo, or paste into a custom blocks project to iterate on annotations).
2. Test by opening a separate Arcade project, Gear → Extensions → select `tutorial-extension` (will show as `Local`).
3. Commit via the GitHub sync button in the editor. Tick the **bump** checkbox to release a new version visible to users.
4. Approval is required for the extension to appear in public search; see https://makecode.com/extensions/approval.

## CLI (only if needed)

For C++ work or local builds, install PXT CLI: `npm install -g pxt`. Then from the repo root: `pxt build` (compile), `pxt test` (run `testFiles`), `pxt bump` (version bump). Not required for TypeScript-only iteration.

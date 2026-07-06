# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Pokedex simulator built with Vue 3, TypeScript, Vite, Pinia, and the [PokeAPI](https://pokeapi.co/) (consumed through `pokeapi-typescript`). The UI is a skeuomorphic Pokedex device operated with virtual buttons or the keyboard — there is no vue-router; "navigation" is a view state machine (see Architecture).

## Commands

```sh
npm install          # install dependencies
npm run dev          # Vite dev server with HMR
npm run build        # type-check (vue-tsc) + vite build, run in parallel
npm run type-check   # vue-tsc --noEmit only
npm run lint         # ESLint with --fix over .vue/.ts/.js etc.
npm run preview      # preview the production build
```

There is no test framework configured in this project.

## Architecture

### View state machine instead of routing

The app simulates a physical device with two screens. Which "screen content" renders is driven entirely by Pinia state in `src/store/controls.ts`:

- `mainView` (`TMainView`: `OFF | INTRO | MENU | LIST | POKEMON | YOSH | CREDITS | GENERATIONS`) selects the left screen's component.
- `secondaryView` (`TSecondaryView`: `1`–`8`) selects the right screen's component (BaseDetails, BaseStats, DamageRelations, EvolutionChain, PokemonMoves, SpriteCollection), some of which are reused with different props (e.g. views 3/4 are both `DamageRelations` with `relation: 'from' | 'to'`).

`src/components/templates/ThePokedex.vue` is the hub that maps this state to dynamic components via `<component :is>` (main views are wrapped in `<KeepAlive>`) and supplies per-view props and toast copy. To add a new view: create the component in `src/components/views/`, extend the `TMainView`/`TSecondaryView` types in `src/types/index.ts`, add it to the option maps in `ThePokedex.vue`, and wire its controls in `useControls.ts`.

### Input handling

All input funnels into a single command handler:

- `src/App.vue` listens for `keyup` globally and translates keys to virtual button commands (`keysToBtnMap`, e.g. `z` → `b`, `p` → `power`).
- On-screen buttons (D-pad, A/B/X/Y, numbers) emit the same command strings.
- `src/composables/useControls.ts` (`handleMainControl`) dispatches each command based on the current `mainView` — each view has its own `*Controls(command)` switch. This is where button behavior per view lives.

### State (Pinia setup stores)

- `src/store/pokemon.ts` — all PokeAPI data: the selected generation, the pokemon list (lazily marked `isLoaded` for progressive fetching), the active pokemon, and computed sprite sets (`transformSprites` normalizes the API sprite tree into animated/artwork × normal/shiny front/back pairs).
- `src/store/controls.ts` — device/UI state: current views, D-pad cursor positions for list/menu/gens (grid navigation via `getNextMove`, 2 columns), sprite display toggles (animated/shiny/front), and the momentarily-pressed button (`activeBtn`).

Both stores use the setup-function style (`defineStore('x', () => {...})`); follow that pattern for new stores.

### Global component auto-registration

`src/globals.js` registers every component in `src/components/*/*.vue` globally by filename. Templates use components (e.g. `<PokemonTile>`, `<Window>`) **without importing them** — this is intentional, don't add imports for them. It also means component filenames must be unique across all component folders. Components follow atomic design: `atoms/`, `molecules/`, `organisms/`, `templates/`, `views/` (views = screen content selected by the state machine).

### Styling

- SCSS with global injection: `vite.config.ts` prepends `@import "@/assets/main.scss"` into every component's styles, which pulls in `src/assets/scss/` partials (`_colors`, `_font`, `_sizes`, `_settings`, `_utils`). So `$red`, `$main-font`, `gap(n)` (4px grid), `rem(n)`, and mixins like `flex-center` are available in any `<style lang="scss">` block without imports.
- Class naming is BEM (`.pokedex-container__helper-wrapper`, `&--shift-right` modifiers).
- SVGs can be imported as Vue components via `vite-svg-loader`.

### Other conventions

- `@` path alias → `src/` (configured in both `vite.config.ts` and `tsconfig.json`).
- TypeScript is intentionally loose: `noImplicitAny: false`, `allowJs: true`. Shared types live in `src/types/index.ts`, including `IPokemonSpritesUpdated`, which patches gaps in `pokeapi-typescript`'s sprite typings.
- `src/composables/useLoading.ts` wraps async calls with a minimum loading duration (default 1200ms) so loaders don't flash; the pokemon store uses it for fetches.
- Analytics: Segment (`useSegment.ts`, prod-only for user tracking) and LogRocket (initialized in `main.ts`).
- Lint/format: ESLint (`plugin:vue/vue3-strongly-recommended` + TS + Prettier, `vue/attribute-hyphenation` off) and Prettier (single quotes, semicolons, no trailing commas, 120 print width).

# Changelog

## 1.1.0

### Added

- Pokémon search across all generations, by name or Pokédex number. Open it with the search key (replaces the 10 key), the `/` or `0` keyboard keys, or the round button on the main menu.
- Button sounds, Pokémon cries, and working volume controls (`-` and `+` keys), with an on-screen volume indicator.
- Volume controls listed in the Keyboard Controls and Buttons Map panels.
- Fade transitions between screens and after loading screens.
- Fan-made project disclaimer.

### Changed

- The Pokémon list loads much faster: one request per generation instead of one per Pokémon.
- Background images are now self-hosted, optimized WebP files.
- The app shows its version from `package.json`.

### Fixed

- The Pokémon list scrolls to keep the selected Pokémon visible when moving left and right.
- Each keypress is handled once (it could move the list cursor twice).
- Sprites in the Pokémon list are no longer clipped.

## 1.0.0

- First release.

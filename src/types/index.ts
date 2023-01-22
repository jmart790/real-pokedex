import type { IPokemonSprites } from 'pokeapi-typescript/dist/interfaces/Pokemon/Pokemon';

export type TMainView = 'OFF' | 'INTRO' | 'LIST' | 'POKEMON';

export type TSecondaryView = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type TActiveSpriteType =
  | 'animated'
  | 'animatedShiny'
  | 'artwork'
  | 'artworkShiny';

export interface IActiveSpriteSetting {
  type: TActiveSpriteType;
  isFront: boolean;
}

interface IFullSpriteSheet {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface IPokemonSpritesUpdated extends IPokemonSprites {
  other: {
    dream_world: {
      front_default: string;
      front_female: string;
    };
    home: {
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
  };
  'official-artwork': {
    front_default: string;
    front_shiny: string;
  };
  versions: {
    'generation-v': {
      'black-white': IFullSpriteSheet & {
        animated: IFullSpriteSheet;
      };
    };
  };
}

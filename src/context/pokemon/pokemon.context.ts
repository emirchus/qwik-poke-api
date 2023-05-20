import { createContextId } from "@builder.io/qwik";

export interface PokemonStateContext {
  pokemonId: number;
  backPokemonImage: boolean;
  isHidden: boolean;
}

export const PokemonContext = createContextId<PokemonStateContext>('pokemon.state-context');

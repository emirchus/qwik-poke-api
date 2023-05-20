import { createContextId } from "@builder.io/qwik";
import type { SmallPokemon } from "~/interfaces";

export interface PokemonsStateContext {
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[];
  noMore: boolean;
}

export const PokemonsContext = createContextId<PokemonsStateContext>(
  "pokemons.state-context"
);

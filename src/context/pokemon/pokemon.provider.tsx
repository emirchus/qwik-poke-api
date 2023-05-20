import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { PokemonStateContext, PokemonsStateContext } from "~/context";
import { PokemonContext, PokemonsContext } from "~/context";

export const PokemonProvider = component$(() => {
  const pokemonState = useStore<PokemonStateContext>({
    backPokemonImage: false,
    isHidden: true,
    pokemonId: 1,
  });

  const pokemonsState = useStore<PokemonsStateContext>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
    noMore: false,
  });

  useContextProvider(PokemonContext, pokemonState);

  useContextProvider(PokemonsContext, pokemonsState);

  useVisibleTask$(() => {
    const pokemon = localStorage.getItem("pokemon");

    if (pokemon) {
      const pokemonParsed = JSON.parse(pokemon);

      pokemonState.backPokemonImage = pokemonParsed.backPokemonImage;
      pokemonState.isHidden = pokemonParsed.isHidden;
      pokemonState.pokemonId = pokemonParsed.pokemonId;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonState.pokemonId,
      pokemonState.backPokemonImage,
      pokemonState.isHidden,
    ]);

    localStorage.setItem("pokemon", JSON.stringify(pokemonState));
  });

  return <Slot />;
});

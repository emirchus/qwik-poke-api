import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonContext } from "~/context";

export const usePokemonGame = () => {
  const pokemonContext = useContext(PokemonContext);

  const changePokemonId = $((value: number) => {
    if (pokemonContext.pokemonId + value > 0) {
      pokemonContext.pokemonId += value;
      pokemonContext.isHidden = true;
    }
  });

  const flipPokemon = $(() => {
    pokemonContext.backPokemonImage = !pokemonContext.backPokemonImage;
  });

  const togglePokemonHidden = $(() => {
    pokemonContext.isHidden = !pokemonContext.isHidden;
  });

  return {
    pokemonId: useComputed$(() => pokemonContext.pokemonId),
    isHidden: useComputed$(() => pokemonContext.isHidden),
    backPokemonImage: useComputed$(() => pokemonContext.backPokemonImage),
    nextPokemon: $(() => changePokemonId(+1)),
    previousPokemon: $(() => changePokemonId(-1)),
    flipPokemon,
    togglePokemonHidden,
  };
};

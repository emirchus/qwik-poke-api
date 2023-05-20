import type { PokemonResponse, SmallPokemon } from "~/interfaces";

export const getSmallPokemons = async (
  offset: number = 0,
  limit: number = 10
): Promise<SmallPokemon[]> => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  const pokemones = (await res.json()) as PokemonResponse;

  return pokemones.results.map(({ name, url }) => {
    return {
      name,
      id: +url.split("/").at(-2)!,
    };
  });
};

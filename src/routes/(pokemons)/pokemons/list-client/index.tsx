import {
  $,
  component$,
  useContext,
  useOnDocument,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { PokemonsContext, } from "~/context";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";

export default component$(() => {
  const pokemonState = useContext(PokemonsContext);

  // Se usa solo del lado cliente owo
  // useVisibleTask$(async ({ track }) => {
  //   track(() => pokemonState.currentPage);

  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
  //   pokemonState.pokemons = [
  //     ...pokemonState.pokemons,
  //     ...pokemons,
  //   ]
  // });

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);

    if (!pokemonState.noMore) {
      const pokemons = await getSmallPokemons(
        pokemonState.currentPage * 10,
        30
      );
      pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
      pokemonState.isLoading = false;

      if (pokemons.length === 0) {
        pokemonState.noMore = true;
      }
    }
  });

  useOnDocument(
    "scroll",
    $((event) => {
      const scroll = event.target as Document;
      const maxScroll = scroll.scrollingElement!.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;

      if (
        currentScroll + 200 >= maxScroll &&
        !pokemonState.isLoading &&
        !pokemonState.noMore
      ) {
        pokemonState.isLoading = true;
        pokemonState.currentPage++;
      }
    })
  );

  return (
    <div class="flex flex-col">
      <div class="flex flex-col justify-center items-center">
        <h1>List Client</h1>
        <h3>Página actual: {pokemonState.currentPage}</h3>
      </div>

      <div class="grid  mt-5 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-8">
        {pokemonState.pokemons.map((pokemon) => {
          return (
            <div
              key={pokemon.name}
              class="md-5 flex flex-col justify-center items-center"
            >
              {pokemon.name}
              <PokemonImage pokemonId={pokemon.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "List Client",
};

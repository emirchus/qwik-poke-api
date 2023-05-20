import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { usePokemonGame } from "~/hooks";

export const usePokemon = routeLoader$(async ({ params, redirect }) => {
  const id = Number(params.id);
  if (isNaN(id) || id <= 0 || id > 898) {
    redirect(301, "/");
  }

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}/`);

  if (res.status != 200) {
    redirect(301, "/");
    return;
  }
  const pokemon = await res.json();
  return pokemon;
});

export default component$(() => {
  const pokemon = usePokemon();
  const { isHidden, backPokemonImage, flipPokemon, togglePokemonHidden } =
    usePokemonGame();

  return (
    <div class="flex justify-center flex-col items-center">
      <span class="text-2xl">Pokemon: {pokemon.value.id}</span>

      <div class="mx-auto">
        <PokemonImage
          pokemonId={pokemon.value.id}
          hidden={isHidden.value}
          backImage={backPokemonImage.value}
        />
      </div>

      <div class="mt-2 flex flex-row justify-center space-x-4">
        <button onClick$={flipPokemon} class="btn btn-primary">
          Cambiar a {backPokemonImage ? "frente" : "espalda"}
        </button>
        <button onClick$={togglePokemonHidden} class="btn btn-primary">
          {isHidden ? "Mostrar" : "Ocultar"}
        </button>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Pokemon ",
};

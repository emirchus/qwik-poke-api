import { $, component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { usePokemonGame } from "~/hooks";

export default component$(() => {
  const navigate = useNavigate();

  const {
    backPokemonImage,
    flipPokemon,
    isHidden,
    nextPokemon,
    pokemonId,
    previousPokemon,
    togglePokemonHidden,
  } = usePokemonGame();

  const goToPokemon = $(() => {
    navigate(`/pokemon/${pokemonId.value}/`);
  });

  return (
    <>
      <h1 class="text-2xl">Welcome to Peach</h1>

      <p class="text-center text-9xl">{pokemonId.value}</p>

      <div class="w-screen flex justify-center">
        <a onClick$={goToPokemon}>
          <PokemonImage
            pokemonId={pokemonId.value}
            backImage={backPokemonImage.value}
            hidden={isHidden.value}
          />
        </a>
      </div>

      <div class="mt-2 flex flex-row justify-center space-x-4">
        <button onClick$={previousPokemon} class="btn btn-primary">
          {'<'}
        </button>
        <button onClick$={flipPokemon} class="btn btn-primary">
          Cambiar a {backPokemonImage ? "frente" : "espalda"}
        </button>
        <button
          onClick$={togglePokemonHidden}
          class="btn btn-primary"
        >
          {isHidden ? "Mostrar" : "Ocultar"}
        </button>
        <button onClick$={nextPokemon} class="btn btn-primary">
          {'>'}
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Peach",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

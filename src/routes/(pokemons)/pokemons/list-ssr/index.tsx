import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  Link,
  type DocumentHead,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import { Modal } from "~/components";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { getPokemonInformation } from "~/helpers/get-chat-gpt";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";
import type { SmallPokemon } from "~/interfaces";

export const usePokemons = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect }) => {
    const offset = Number(query.get("offset") || 0);

    if (isNaN(offset) || offset < 0) {
      redirect(301, `/pokemons/list-ssr?offset=0`);
    }

    return await getSmallPokemons(offset);
  }
);

export default component$(() => {
  const pokemons = usePokemons();

  const location = useLocation();

  const currentOffset = useComputed$(() => {
    const offsetString = new URLSearchParams(location.url.search).get("offset");

    return offsetString ? +offsetString : 0;
  });

  const modalOpened = useSignal(false);
  const modalState = useStore({
    id: 0,
    name: "",
    information: "",
  });

  //Modal functions
  const showModal = $((id: number, name: string) => {
    modalState.id = id;
    modalState.name = name;

    modalOpened.value = true;
  });

  const closeModal = $(() => {
    modalOpened.value = false;
  });

  useVisibleTask$(({ track }) => {
    track(() => modalState.name);

    if (modalState.name.trim().length > 0) {
      modalState.information = "";

      getPokemonInformation(modalState.name).then((response) => {
        modalState.information = response;
      });
    }
  });

  return (
    <>
      <div class="flex flex-col">
        <div class="flex flex-col justify-center items-center">
          <h1>SSR List</h1>

          <h3>Current offset: {currentOffset}</h3>
          <h3>
            {location.isNavigating ? "Cargando página" : "Página cargada"}
          </h3>
        </div>
        <div class="mt-10 flex flex-row space-x-4 justify-center items-center">
          <Link
            href={`/pokemons/list-ssr?offset=${currentOffset.value - 10}`}
            class="btn btn-primary "
          >
            Anteriores
          </Link>

          <Link
            href={`/pokemons/list-ssr?offset=${currentOffset.value + 10}`}
            class="btn btn-primary "
          >
            Siguiente
          </Link>
        </div>

        <div class="grid grid-cols-6 mt-5">
          {pokemons.value.map((pokemon) => {
            return (
              <div
                key={pokemon.name}
                onClick$={() => showModal(pokemon.id, pokemon.name)}
                class="md-5 flex flex-col justify-center items-center"
              >
                {pokemon.name}
                <PokemonImage pokemonId={pokemon.id} />
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        opened={modalOpened.value}
        closeFn={closeModal}
        size={modalState.information.trim().length > 0 ? "lg" : "md"}
      >
        <div q:slot="title">{modalState.name}</div>
        <div q:slot="content" class="flex flex-col justify-center items-center">
          <PokemonImage pokemonId={modalState.id} />
          {modalState.information.trim().length > 0 ? (
            <div class="mt-5">
              <p>{modalState.information}</p>
            </div>
          ) : (
            <div class="mt-5">
              <p>Cargando información...</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
});

export const head: DocumentHead = {
  title: "SSRList",
};

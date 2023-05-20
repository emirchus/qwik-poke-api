import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";

export interface PokemonImageProps {
  pokemonId: number;
  size?: number;
  backImage?: boolean;
  hidden?: boolean;
}

export const PokemonImage = component$<PokemonImageProps>(
  ({ pokemonId, size = 200, backImage = false, hidden = false }) => {
    const isLoaded = useSignal(false);

    useTask$(({ track }) => {
      track(() => pokemonId);

      isLoaded.value = false;
    });

    const imageUrl = useComputed$(() => {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${
        backImage ? "/back/" : "/"
      }${pokemonId}.png`;
    });

    return (
      <div
        class="flex items-center justify-center flex-col"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <img
          width={size}
          height={size}
          src={imageUrl.value}
          alt={`Pokemon ${pokemonId}`}
          class={{
            "mx-auto": true,
            hidden: !isLoaded.value,
            "brightness-0": hidden,
          }}
          document:onLoad$={() => {
            isLoaded.value = true;
          }}
        />
        {!isLoaded.value && <span class="text-2xl">...</span>}
      </div>
    );
  }
);

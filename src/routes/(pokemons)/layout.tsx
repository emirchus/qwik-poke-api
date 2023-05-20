import { Slot, component$ } from "@builder.io/qwik";
import Footer from "~/components/starter/footer/footer";
import Header from "~/components/starter/header/header";
import { PokemonProvider } from "~/context";

export default component$(() => {
  return (
    <PokemonProvider>
      <Header />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
      <Footer />
    </PokemonProvider>
  );
});

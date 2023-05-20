import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Footer from "~/components/starter/footer/footer";
import Header from "~/components/starter/header/header";

export const useCheckAuth$ = routeLoader$(({ cookie, redirect }) => {
  const user = cookie.get("user");
  if (!user) {
    redirect(302, "/login");
  }
});

export default component$(() => {
  return (
    <>
      <Header />
      <div class="flex flex-col items-center justify-center mt-2">
        <h3 class="text-5xl">Admin dash :v</h3>
        <Slot />
      </div>
      <Footer />
    </>
  );
});

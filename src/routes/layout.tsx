import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import styles from "./styles.css?inline";
export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: "HOLA",
  };
});

export default component$(() => {
  useStyles$(styles);
  return <Slot />;
});

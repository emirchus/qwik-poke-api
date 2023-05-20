import { $, useComputed$, useSignal } from "@builder.io/qwik";

export const useCounter = (initialValue: number = 0) => {
  const counter = useSignal(initialValue);

  const increment = $(() => {
    counter.value++;
    console.log(counter.value);
  });

  const decrement = $(() => {
    counter.value--;
  });

  return {
    counter: useComputed$(() => counter.value),
    increment,
    decrement,
  };
};

import { component$ } from "@builder.io/qwik";
import { useCounter } from "~/hooks";

export default component$(() => {
  const { counter, decrement, increment } = useCounter(0);

  return (
    <>
      <span class="text-2xl">Counter</span>
      <span class="text-8xl mt-8">{counter.value}</span>
      <div class="flex flex-row items-center justify-center space-x-8 mt-8">
        <button onClick$={decrement} class="btn btn-primary">
          -1
        </button>
        <button onClick$={increment} class="btn btn-primary">
          +1
        </button>
      </div>
    </>
  );
});

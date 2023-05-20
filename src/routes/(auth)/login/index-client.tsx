import {
  $,
  component$,
  useComputed$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";

import styles from "./login.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const formState = useStore({
    email: "",
    password: "",
    formPosted: false,
  });

  const onSubmit = $(() => {
    formState.formPosted = true;
  });

  const emailError = useComputed$(() => {
    const regexEmail = new RegExp(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );
    return formState.formPosted && !regexEmail.test(formState.email);
  });

  const passwordError = useComputed$(() => {
    return formState.formPosted && formState.password.length < 6;
  });

  // const isFormValid = useComputed$(() => {
  //   return !emailError.value && !passwordError.value;
  // });

  return (
    <form class="login-form" preventdefault:submit onSubmit$={onSubmit}>
      <div class="relative">
        <input
          name="email"
          type="text"
          placeholder="Email address"
          value={formState.email}
          class={{
            "not-valid": emailError.value,
          }}
          onInput$={(ev) => {
            formState.email = (ev.target as HTMLInputElement).value;
          }}
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={formState.password}
          class={{
            "not-valid": passwordError.value,
          }}
          onInput$={(ev) => {
            formState.password = (ev.target as HTMLInputElement).value;
          }}
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type="submit">Ingresar</button>
      </div>

      <code>{JSON.stringify(formState, undefined, 2)}</code>
    </form>
  );
});

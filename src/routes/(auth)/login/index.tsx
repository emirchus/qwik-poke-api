import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./login.css?inline";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";

export const userLoginUserAction = routeAction$(
  (data, { cookie, redirect }) => {
    const { email, password } = data;
    if (email === "emir@mail.com" && password === "123") {
      cookie.set(
        "user",
        { id: "1", email: "" },
        {
          secure: true,
          path: "/",
        }
      );
      redirect(302, "/");
    }

    return {
      success: false,
      error: "Invalid email or password",
    };
  }, zod$({
    email: z.string().email("Formato inválido ♿"),
    password: z.string().min(3, "Mínimo 3 caracteres ♿♿"),
  })
);

export default component$(() => {
  useStylesScoped$(styles);
  const action = userLoginUserAction();
  return (
    <Form class="login-form mt-5" action={action}>
      <div class="relative">
        <input name="email" type="text" placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>
      <div class="relative ">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type="submit">Ingresar</button>
      </div>
      <p>{action.value?.success}</p>

      <code>{JSON.stringify(action.value, undefined, 2)}</code>
    </Form>
  );
});

import { Layout } from "../components/layout";
import { env } from "../env";
import type { App } from "../server";
import { setSession } from "../auth/auth";

export function registerLogin(app: App) {
  app.get("/login", (c) => {
    return c.html(
      <Layout>
        <h1>Login</h1>

        <form action="/login" method="POST">
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </Layout>,
    );
  });

  app.post("/login", async (c) => {
    const body = await c.req.formData();
    const password = body.get("password") as string;
    if (password !== env.SECRET_API_KEY) {
      return c.redirect("/login");
    }
    setSession(c, password);
    return c.redirect("/dashboard");
  });
}

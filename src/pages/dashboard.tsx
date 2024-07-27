import { eq } from "drizzle-orm";
import { assertIsAuthenticated, getSession } from "../auth/auth";
import { Layout } from "../components/layout";
import { database } from "../db";
import { newsletters } from "../db/schema";
import type { App } from "../server";

export function registerDashboard(app: App) {
  app.get("/", assertIsAuthenticated, async (c) => {
    const newsletter = await database.query.newsletters.findMany();
    return c.html(
      <Layout session={getSession(c)}>
        <h1>Mailing List</h1>

        <form action="/" method="POST">
          <input required type="email" name="email" placeholder="Email" />
          <button type="submit">Add Email</button>
        </form>

        <ul>
          {newsletter.map((n) => (
            <li key={n.id}>
              {n.email}

              <form action={`/newsletter/${n.id}`} method="POST">
                <button type="submit">X</button>
              </form>
            </li>
          ))}
        </ul>
      </Layout>,
    );
  });

  app.post("/", assertIsAuthenticated, async (c) => {
    const body = await c.req.formData();
    const email = body.get("email") as string;

    await database
      .insert(newsletters)
      .values({
        email,
      })
      .onConflictDoNothing();

    return c.redirect("/");
  });

  app.post("/newsletter/:id", assertIsAuthenticated, async (c) => {
    const id = c.req.param().id;
    await database.delete(newsletters).where(eq(newsletters.id, id));
    return c.redirect("/");
  });
}

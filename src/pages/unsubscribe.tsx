import { eq } from "drizzle-orm";
import { assertIsAuthenticated } from "../auth/auth";
import { database } from "../db";
import { newsletters } from "../db/schema";
import type { App } from "../server";

export function registerUnsubscribe(app: App) {
  app.get("/unsubscribe/:id", assertIsAuthenticated, async (c) => {
    const newsletterId = c.req.param().id;
    await database.delete(newsletters).where(eq(newsletters.id, newsletterId));

    return c.html(<h1>You've been unsubscribed!</h1>);
  });
}

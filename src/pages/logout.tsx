import type { App } from "../server";
import { clearSession } from "../auth/auth";

export function registerLogout(app: App) {
  app.get("/logout", (c) => {
    clearSession(c);
    return c.redirect("/login");
  });
}

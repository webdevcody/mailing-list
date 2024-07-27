import { Hono } from "hono";
import { registerDashboard } from "./pages/dashboard";
import { serveStatic } from "hono/bun";
import { registerLogin } from "./pages/login";
import { registerLogout } from "./pages/logout";
import { registerUnsubscribe } from "./pages/unsubscribe";

const app = new Hono();

export type App = typeof app;

app.use("/static/*", serveStatic({ root: "./" }));

registerDashboard(app);
registerLogin(app);
registerLogout(app);
registerUnsubscribe(app);

app.notFound((c) => {
  return c.html("not found bro");
});

export default app;

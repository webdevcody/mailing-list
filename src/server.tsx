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

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

setInterval(() => {
  const usage = process.memoryUsage();
  console.log({
    rss: usage.rss,
    heapTotal: usage.heapTotal,
    heapUsed: usage.heapUsed,
  });
}, 60000);

export default app;

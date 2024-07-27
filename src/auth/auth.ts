import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { v4 } from "uuid";
import { createMiddleware } from "hono/factory";

let session: string | undefined;

export function setSession(c: Context, token: string) {
  session = v4();
  setCookie(c, "session", token);
}

export function getSession(c: Context) {
  return getCookie(c, "session");
}

export function clearSession(c: Context) {
  session = undefined;
  deleteCookie(c, "session");
}

export const assertIsAuthenticated = createMiddleware(async (c, next) => {
  if (!getSession(c)) {
    return c.redirect("/login");
  }
  await next();
});

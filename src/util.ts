import type { Context } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const flashCookieKey = "formError";

export function setFlashMessage(c: Context, message: string) {
  setCookie(c, flashCookieKey, message);
}

export function getFlashMessage(c: Context) {
  return getCookie(c, flashCookieKey);
}

export function clearFlashMessage(c: Context) {
  deleteCookie(c, flashCookieKey);
}

export function popFlashMessage(c: Context) {
  const message = getFlashMessage(c);
  deleteCookie(c, flashCookieKey);
  return message;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

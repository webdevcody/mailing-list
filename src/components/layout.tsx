import { type PropsWithChildren } from "hono/jsx";
import { Footer } from "./footer";
import { html } from "hono/html";
import { Header } from "./header";

export function Layout({
  session,
  children,
  title = "WDC Starter Kit",
}: PropsWithChildren<{ title?: string; session?: string }>) {
  return (
    <>
      {html`<!doctype html>`}
      <html>
        <head>
          <title>{title}</title>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {process.env.NODE_ENV !== "production" && (
            <script src="/static/livereload.js"></script>
          )}
          <link
            href={`/static/styles.css?t=${process.env.COMMIT_SHA}`}
            rel="stylesheet"
          />
        </head>

        <body className="bg-black text-white">
          <Header isAuthenticated={!!session} />
          {children}
          <Footer />

          {html`
            <script>
              document.addEventListener("DOMContentLoaded", (event) => {
                var fontLink = document.createElement("link");
                fontLink.href =
                  "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap";
                fontLink.rel = "stylesheet";
                document.head.appendChild(fontLink);
              });
            </script>
          `}
        </body>
      </html>
    </>
  );
}

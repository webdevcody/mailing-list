import { eq } from "drizzle-orm";
import { assertIsAuthenticated, getSession } from "../auth/auth";
import { Layout } from "../components/layout";
import { database } from "../db";
import { newsletters } from "../db/schema";
import type { App } from "../server";
import { addPending, sendEmail } from "../email/send-email";

export function registerDashboard(app: App) {
  app.get("/dashboard", assertIsAuthenticated, async (c) => {
    const newsletter = await database.query.newsletters.findMany();
    return c.html(
      <Layout session={getSession(c)}>
        <div className="space-y-8">
          <h1 class={"text-4xl"}>Mailing List</h1>

          <section>
            <h2 class={"text-2xl"}>Mass Send Emails</h2>
            <form action="/actions/send-emails" method="POST">
              <input name="subject" required placeholder="subject" />
              <textarea
                name="html"
                required
                placeholder="html format"
              ></textarea>{" "}
              <textarea
                name="text"
                required
                placeholder="text format"
              ></textarea>
              <button class={"btn"} type="submit">
                Send Emails
              </button>
            </form>
          </section>

          <form action="/actions/add-email" method="POST">
            <label htmlFor="emails">Emails (comma separated)</label>
            <textarea
              id="emails"
              required
              name="emails"
              placeholder="test@example.com\nyolo@example.com"
            ></textarea>
            <button class={"btn"} type="submit">
              Add Email
            </button>
          </form>

          <ul>
            {newsletter.map((n) => (
              <li key={n.id}>
                {n.email}
                <form action={`/actions/delete-email`} method="POST">
                  <input type="hidden" name="newsletterId" value={n.id} />
                  <button type="submit">X</button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      </Layout>,
    );
  });

  app.post("/actions/send-emails", assertIsAuthenticated, async (c) => {
    const body = await c.req.formData();
    const text = body.get("text") as string;
    const subject = body.get("subject") as string;
    const html = body.get("html") as string;

    const emails = await database.query.newsletters.findMany();

    addPending(emails.length);

    emails.map((e) => {
      return sendEmail({
        email: e.email,
        subject: subject,
        htmlBody: html,
        textBody: text,
        unsubscribeId: e.id,
      });
    });

    return c.redirect("/dashboard");
  });

  app.post("/actions/add-email", assertIsAuthenticated, async (c) => {
    const body = await c.req.formData();
    const emails = body.get("emails") as string;
    const email = emails.split("\n").map((e) => e.trim());

    await database
      .insert(newsletters)
      .values(email.map((e) => ({ email: e })))
      .onConflictDoNothing();

    return c.redirect("/dashboard");
  });

  app.post("/actions/delete-email", assertIsAuthenticated, async (c) => {
    const body = await c.req.formData();
    const newsletterId = body.get("newsletterId") as string;
    await database.delete(newsletters).where(eq(newsletters.id, newsletterId));
    return c.redirect("/dashboard");
  });
}

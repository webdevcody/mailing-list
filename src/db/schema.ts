import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { randomUUID } from "crypto";

export const newsletters = sqliteTable("newsletter", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  email: text("email").notNull().unique(),
});

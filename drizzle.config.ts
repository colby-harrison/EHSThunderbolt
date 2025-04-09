import type { Config } from "drizzle-kit";

import { env } from "@/env";

console.log("DATABASE_URL:", env.DATABASE_URL);
console.log("DATABASE_TOKEN:", env.DATABASE_TOKEN);

export default {
	schema: "./src/server/db/schema.ts",
	dialect: "turso",
	dbCredentials: {
		url: env.DATABASE_URL,
		authToken: env.DATABASE_TOKEN,
	},
	tablesFilter: ["*"],
} satisfies Config;

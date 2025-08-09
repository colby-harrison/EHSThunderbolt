import { internalQuery, query } from "./_generated/server";
import { v } from "convex/values";
 
export const isAllowedEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const emails = await ctx.db.query("allowedEmails").collect();
    return emails.some((email) => email.email === args.email);
  },
});

export const internalIsAllowedEmail = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const emails = await ctx.db.query("allowedEmails").collect();
    return emails.some((email) => email.email === args.email);
  },
})
import { Email } from "@convex-dev/auth/providers/Email";
import { Resend as ResendAPI } from "resend";
import { alphabet, generateRandomString } from "oslo/crypto";

export const ResendOTP = Email({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  maxAge: 60 * 15, // 15 minutes
  // This function can be asynchronous
  generateVerificationToken() {
    return generateRandomString(6, alphabet("0-9"));
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    // check email here
    const res = await fetch(
      `${process.env.CONVEX_SITE_URL}/emailCheck?email=${email}`
    );
    const { allowed } = await res.json();
    if (!allowed) {
      throw new Error("Action not allowed")
    }
    // if allowed, continue
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: "Thunderbolt <thunderbolt@email.ehsthunderbolt.org>",
      to: [email],
      subject: `Sign in to EHS Thunderbolt`,
      text: `Your code is ${token}\n\nThis code will expire in 15 minutes.`,
    });

    if (error) {
      throw new Error(JSON.stringify(error));
    }
  },
});

import { Email } from "@convex-dev/auth/providers/Email";
import { Resend as ResendAPI } from "resend";
import { alphabet, generateRandomString } from "oslo/crypto";

export const ResendOTP = Email({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  maxAge: 60 * 15,
  generateVerificationToken() {
    return generateRandomString(6, alphabet("0-9"));
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    // check email
    
    // send email if allowed
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: "",
      to: [email],
      subject: ``,
      text: `Your code is ${token}\n\nThis code will expire in 15 minutes.`,
    });
 
    if (error) {
      throw new Error(JSON.stringify(error));
    }
  },
});

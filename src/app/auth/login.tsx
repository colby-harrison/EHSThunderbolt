import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "convex@/_generated/api";
import { useState } from "react";
import { fetchQuery } from "convex/nextjs";
 
export function SignIn() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");

  return step === "signIn" ? (
    <form
      onSubmit={
        async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const allowed = await fetchQuery(api.allowedemail.isAllowedEmail, {
          email: formData.get("email") as string,
        });
        if (!allowed) return;
        void signIn("resend-otp", formData).then(() =>
          setStep({ email: formData.get("email") as string })
        );
      }}
    >
      <input name="email" placeholder="Email" type="text" />
      <button type="submit">Send code</button>
    </form>
  ) : (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        void signIn("resend-otp", formData);
      }}
    >
      <input name="code" placeholder="Code" type="text" />
      <input name="email" value={step.email} type="hidden" />
      <button type="submit">Continue</button>
      <button type="button" onClick={() => setStep("signIn")}>
        Cancel
      </button>
    </form>
  );
}
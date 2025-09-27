"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "convex@/_generated/api";
import { useEffect, useState, type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as Card from "@/components/ui/card";
import { GlobalDataUpdater } from "@/components/GlobalProvider";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const user = useQuery(api.users.currentUser);
  console.log(user);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Run the allowed email check reactively
  const isAllowed = useQuery(
    api.allowedemail.isAllowedEmail,
    email ? { email } : "skip"
  );

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return step === "signIn" ? (
    <main className='h-dvh w-full flex items-center justify-center'>
      <GlobalDataUpdater data={{ showHeader: false }} />
      <Card.Card>
        <Card.CardHeader>Sign In | Enter Email</Card.CardHeader>
        <Card.CardContent>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const allowed = isAllowed;
              if (!allowed) return;
              void signIn("resend-otp", formData).then(() =>
                setStep({ email: formData.get("email") as string })
              );
            }}
            className='flex flex-col gap-2'
          >
            <Input
              name='email'
              placeholder='Email'
              type='text'
              value={email}
              onChange={onChangeEmail}
            />
            <Button
              type='submit'
              disabled={!isAllowed || !email} // disable if not allowed or empty
            >
              Send code
            </Button>
          </form>
        </Card.CardContent>
      </Card.Card>
    </main>
  ) : (
    <main className='h-dvh w-full flex items-center justify-center'>
      <GlobalDataUpdater data={{ showHeader: false }} />
      <Card.Card>
        <Card.CardHeader>Sign In | Enter Code</Card.CardHeader>
        <Card.CardContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              void signIn("resend-otp", formData).then(() =>
                router.push("/dashboard")
              );
            }}
            className='flex flex-col gap-2'
          >
            <Input name='code' placeholder='Code' type='text' value={code} onChange={(e) => setCode(e.target.value)} />
            <Input name='email' value={email} type='hidden' />
            <div className="flex flex-row gap-2 justify-between">
              <Button type='submit'>Continue</Button>
              <Button type='button' onClick={() => setStep("signIn")}>
                Cancel
              </Button>
            </div>
          </form>
        </Card.CardContent>
      </Card.Card>
    </main>
  );
}

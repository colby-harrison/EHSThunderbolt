import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
} from "@clerk/astro/react";

export default function AuthUserButton() {
  return (
    <div>
      <SignedOut>
        <SignInButton mode='modal' />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

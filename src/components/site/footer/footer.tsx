"use client";
import { Separator } from "@/components/ui/separator";
import { SignInButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export function Footer() {
  const { isSignedIn, signOut } = useAuth();
  return (
    <footer className='w-full bg-sidebar bottom-0 border-t border-sidebar-border text-sidebar-foreground p-2 flex flex-row items-center justify-center'>
      {isSignedIn ? (
        <Link href="#" onClick={() => {signOut()}}>Logout</Link>
      ) : (
        <SignInButton />
      )}
      {
        isSignedIn && (
          <Separator orientation="vertical" />
        )
      }
      {
        isSignedIn && (
          <Link href="/dashboard">Dashboard</Link>
        )
      }
    </footer>
  );
}

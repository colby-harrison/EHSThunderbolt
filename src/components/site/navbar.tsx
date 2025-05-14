import { SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "./mode-toggle";
// import {
//   SignedIn,
//   SignedOut,
//   UserButton,
//   SignInButton,
// } from '@clerk/astro/react';
// End of imports

export function Navbar() {
  return (
    <header className='w-full p-2 sticky top-0 z-50 bg-linear-to-t from-transparent to-90% to-background'>
      <div className='flex h-12 flex-row rounded-lg border border-sidebar-border bg-sidebar text-sidebar-foreground shadow'>
        <div className='flex basis-1/2 flex-row items-center justify-start gap-4 pl-2 md:basis-1/3'>
          <SidebarTrigger />
          <a href='/'>
            <img
              src='/CheyenneEast.png'
              alt='EHS Logo'
              className='h-12 w-auto'
            />
          </a>
        </div>
        <div className='flex basis-1/3 flex-row items-center justify-center gap-4 max-md:hidden' />
        <div className='flex flex-auto basis-1/2 flex-row items-center justify-end gap-2 pr-2 md:basis-1/3'>
          {/* <ThemeToggle /> */}
          {/* Start of Auth buttons */}
          {/* <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
          {/* End of Auth buttons */}
        </div>
      </div>
    </header>
  );
}

// Start of imports
import { ModeToggle as ThemeToggle } from './ModeToggle';
import { SidebarTrigger } from './ui/sidebar';
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from '@clerk/astro/react';
// End of imports

export default function Navbar() {
  return (
    <header className="w-full p-2">
      <div className="flex h-12 flex-row bg-sidebar text-sidebar-foreground rounded-lg border border-sidebar-border shadow">
        <div className="flex basis-1/2 flex-row items-center justify-start gap-4 pl-2 md:basis-1/3">
          <SidebarTrigger />
          <a href="/">
            <img
              src="/CheyenneEast.png"
              alt="EHS Logo"
              className="h-12 w-auto"
            />
          </a>
        </div>
        <div className="flex basis-1/3 flex-row items-center justify-center gap-4 max-md:hidden"></div>
        <div className="flex flex-auto basis-1/2 flex-row items-center justify-end gap-2 pr-2 md:basis-1/3">
          <ThemeToggle />
          {/* Start of Auth buttons */}
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {/* End of Auth buttons */}
        </div>
      </div>
    </header>
  );
}

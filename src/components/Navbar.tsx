import { ModeToggle as ThemeToggle } from "./ModeToggle";
import { SidebarTrigger } from "./ui/sidebar";

export default function Navbar() {
  return (
    <header className="w-full p-2">
      <div className='flex h-12 flex-row bg-sidebar text-sidebar-foreground rounded-lg border border-sidebar-border shadow'>
        <div className='flex basis-1/2 flex-row items-center justify-start gap-4 pl-2 md:basis-1/3'>
          <SidebarTrigger />
          <a href='/'>
            <img
              src='/CheyenneEast.png'
              alt='EHS Logo'
              className='h-10 w-auto max-md:h-12'
            />
          </a>
        </div>
        <div className='flex basis-1/3 flex-row items-center justify-center gap-4 max-md:hidden'></div>
        <div className='flex flex-auto basis-1/2 flex-row items-center justify-end gap-2 pr-2 md:basis-1/3'>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
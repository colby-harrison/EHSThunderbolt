import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  ChevronDown,
  Newspaper,
  NotebookPen,
  Code,
  House,
  UsersRound,
  Sparkle,
  GraduationCap,
  SquareActivity,
  Trophy,
  Camera,
  Video,
  BellElectric,
  BicepsFlexed,
  School,
  ShieldHalf,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import React from "react";

export function AppSidebar() {
  const [sidebar_collapsible_1_open, sidebar_collapsible_1_setOpen] = useSidebarState(1);
  const [sidebar_collapsible_2_open, sidebar_collapsible_2_setOpen] = useSidebarState(2);
  const [sidebar_collapsible_3_open, sidebar_collapsible_3_setOpen] = useSidebarState(3);
  const [sidebar_collapsible_4_open, sidebar_collapsible_4_setOpen] = useSidebarState(4);
  return (
    <Sidebar collapsible='offcanvas' variant='floating'>
      <SidebarHeader />
      <SidebarContent>
        <Collapsible
          className='group/collapsible'
          open={sidebar_collapsible_1_open}
          onOpenChange={sidebar_collapsible_1_setOpen}
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                EHS ThunderBolt
                <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='/blog'>
                        <House />
                        <span>Home</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='/community'>
                        <Sparkle />
                        <span>Community</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='/grads'>
                        <GraduationCap />
                        <span>2025 Grads</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='/studentlife'>
                        <NotebookPen />
                        <span>Student Life</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='/clubsandactivities'>
                        <SquareActivity />
                        <span>Clubs and Activities</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='/sports'>
                        <Trophy />
                        <span>Sports</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='/news'>
                        <Newspaper />
                        <span>News</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <SidebarSeparator />
        <Collapsible
          className='group/collapsible'
          open={sidebar_collapsible_2_open}
          onOpenChange={sidebar_collapsible_2_setOpen}
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Media
                <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='/photos'>
                        <Camera />
                        <span>Photos</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='/videos'>
                        <Video />
                        <span>Videos</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <SidebarSeparator />
        <Collapsible
          className='group/collapsible'
          open={sidebar_collapsible_3_open}
          onOpenChange={sidebar_collapsible_3_setOpen}
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                School Info
                <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='/bellschedule'>
                        <BellElectric />
                        <span>Bell Schedule</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='/flextime'>
                        <BicepsFlexed />
                        <span>Flex Time</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='https://east.laramie1.org'>
                        <School />
                        <span>Offical School Website</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='https://laramie1.org'>
                        <ShieldHalf />
                        <span>LCSD1 Website</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        
        <SidebarSeparator />
        <Collapsible
          className='group/collapsible'
          open={sidebar_collapsible_4_open}
          onOpenChange={sidebar_collapsible_4_setOpen}
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                School Staff
                <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='/thunderboltstaff'>
                        <Code />
                        <span>ThunderBolt Staff</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='/ehsteachers'>
                        <UsersRound />
                        <span>EHS Teachers</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarRail />
    </Sidebar>
  );
}

// track sidebar state
function useSidebarState(collapsibleNumber: number) {
  const [isOpen, setIsOpen] = React.useState(() => {
    const savedOpenState = sessionStorage.getItem(
      `main-sidebar-collapsible-${collapsibleNumber}Open`
    );
    return savedOpenState ? JSON.parse(savedOpenState) : true;
  });

  React.useEffect(() => {
    sessionStorage.setItem(
      `main-sidebar-collapsible-${collapsibleNumber}Open`,
      JSON.stringify(isOpen)
    );
  }, [isOpen, collapsibleNumber]);

  return [isOpen, setIsOpen] as const; // Explicitly return a tuple
}
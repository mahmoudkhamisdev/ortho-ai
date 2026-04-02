import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu as SidebarLayout,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cookies } from "next/headers";
import UserAvatar from "@/components/common/user-avatar";
import SidebarMenu from "./SidebarMenu";
import Link from "next/link";

const LogoSideBar = () => (
  <SidebarLayout>
    <SidebarMenuItem>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <div className="flex size-8 items-center justify-center rounded-lg">
            <Image
              src={`/images/logo.svg` || "/images/placeholder.svg"}
              alt={"Ortho AI"}
              width={32}
              height={32}
              className="rounded object-cover scale-200"
            />
          </div>
          <span className="truncate font-semibold uppercase">{"Ortho AI"}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarLayout>
);

export async function MainSidebar() {
  const cookieStore = await cookies();
  const currentLanguage = cookieStore.get("current-language")?.value;

  return (
    <Sidebar
      variant={"inset"}
      // collapsible={"icon"}
      side={currentLanguage === "ar" ? "right" : "left"}
    >
      <SidebarHeader dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
        <LogoSideBar />
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
          <div className="p-4 space-y-15 mt-10">
            <div className="space-y-2">
              <UserAvatar
                className="size-24"
                image={"/images/team/ME.jfif"}
                name={"Mahmoud Khamis"}
              />
              <div className="">
                <p className="text-lg font-semibold capitalize line-clamp-1">
                  Eng.Mahmoud Khamis
                </p>
                <p className="text-sm font-semibold text-muted-foreground capitalize line-clamp-1">
                  Full Stack Web & Mobile
                </p>
              </div>
            </div>

            <SidebarMenu />
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}

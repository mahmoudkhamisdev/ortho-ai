import { SidebarTrigger } from "@/components/ui/sidebar";
import UserHeader from "./UserHeader/UserHeader";

export default function DashboardHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b flex h-12 px-4 shrink-0 transition-[width,height] ease-linear items-center justify-between gap-4">
      <SidebarTrigger className="-ml-1" />

      <UserHeader />
    </header>
  );
}

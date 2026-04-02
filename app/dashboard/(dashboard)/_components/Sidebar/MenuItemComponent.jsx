"use client";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export const MenuItemComponent = ({ title, url, Icon }) => {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const menuItemRef = useRef(null);

  const handleClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenuItem ref={menuItemRef}>
      <SidebarMenuButton asChild tooltip={title}>
        <Link
          href={url}
          className={cn(
            pathname === url &&
            "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
          onClick={handleClick}
        >
          {Icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

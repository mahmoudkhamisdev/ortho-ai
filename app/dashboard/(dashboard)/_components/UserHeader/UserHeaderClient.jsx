"use client";

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { BadgeCheck, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { ThemeSwitcher } from "@/components/common/theme-switcher";

export default function UserHeaderClient() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleAccountClick = () => {
    router.push("/settings");
  };

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={handleAccountClick}>
          <BadgeCheck className="mr-2 h-4 w-4" />
          Account
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <div className="px-2 py-1.5">
        <div className="text-xs font-medium text-muted-foreground mb-2">
          Preferences
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-sm">Theme</span>
          <ThemeSwitcher className={"!scale-95"} />
        </div>
      </div>

      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={logout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </DropdownMenuItem>
    </>
  );
}

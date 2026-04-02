"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Users2, PlusSquare, Stars, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";

const menuItems = [
  { icon: Home, label: "Home", url: "/dashboard" },
  { icon: Users2, label: "Patients", url: "/dashboard/users" },
  { icon: PlusSquare, label: "New Case", url: "/dashboard/new-case" },
  // { icon: Stars, label: "Image Analysis", url: "/dashboard/1" },
  { icon: Settings, label: "Profile Settings", url: "/dashboard/settings" },
];

export default function SidebarMenu() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <div className="bg-sidebar-accent dark:bg-sidebar-accent/50 border p-6 !m-0 rounded-2xl space-y-8 scale-105 relative">
      {menuItems.map(({ icon: Icon, label, url }, index) => (
        <Link
          key={index}
          href={url}
          prefetch={true}
          onClick={handleClick}
          className={`flex items-center gap-4 relative cursor-pointer transition-colors ${
            pathname === url ? "text-main" : "text-foreground"
          }`}
        >
          <Icon
            className={`size-6 transition-all ${
              pathname === url ? "text-main scale-110" : "opacity-80"
            }`}
          />
          <p
            className={`font-semibold transition-colors ${
              pathname === url ? "text-main" : ""
            }`}
          >
            {label}
          </p>

          {/* Animated vertical separator */}
          {pathname === url && (
            <motion.div
              layoutId="activeSeparator"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`absolute inset-y-0 -start-5 -ms-1 w-0.5 rounded-full bg-main`}
            />
          )}
        </Link>
      ))}
    </div>
  );
}

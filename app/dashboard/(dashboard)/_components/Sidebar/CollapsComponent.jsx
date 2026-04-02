"use client";

import {
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from "@/lib/motion-variants";

export const CollapsComponent = ({ Icon, title, items, currentLanguage }) => {
    const ArrowIcon = currentLanguage === "ar" ? ChevronLeft : ChevronRight;
    const { isMobile, setOpenMobile } = useSidebar();
    const pathname = usePathname();
    const collapsibleRef = useRef(null);

    // Check if any sub-item is active to open the collapsible by default
    const isActive = items.some((item) => pathname.startsWith(item.url));
    const [isOpen, setIsOpen] = useState(isActive);

    const handleClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    // Scroll to the collapsible if it contains the active item
    useEffect(() => {
        if (isActive && collapsibleRef.current) {
            collapsibleRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [pathname, isActive]);

    return (
        <Collapsible
            asChild
            className="group/collapsible"
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <SidebarMenuItem ref={collapsibleRef}>
                {/* Trigger */}
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={title}>
                        {Icon && Icon}
                        <span>{title}</span>
                        <ArrowIcon
                            className={cn(
                                currentLanguage === "ar"
                                    ? "ms-auto group-data-[state=open]/collapsible:-rotate-90"
                                    : "ml-auto group-data-[state=open]/collapsible:rotate-90",
                                "transition-transform duration-200",
                            )}
                        />
                    </SidebarMenuButton>
                </CollapsibleTrigger>

                {/* Content with animation */}
                <CollapsibleContent>
                    <SidebarMenuSub>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={isOpen ? "visible" : "hidden"}
                        >
                            {items.map((item) => (
                                <motion.div key={item.title} variants={itemVariants}>
                                    <SidebarMenuSubItem tooltip={item.title} onClick={handleClick}>
                                        <SidebarMenuSubButton asChild>
                                            <Link
                                                href={item.url}
                                                className={cn(
                                                    pathname === item.url &&
                                                    "bg-sidebar-accent text-sidebar-accent-foreground",
                                                )}
                                            >
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </motion.div>
                            ))}
                        </motion.div>
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
};
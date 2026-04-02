import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/common/user-avatar";
import { cookies } from "next/headers";
import UserHeaderClient from "./UserHeaderClient";
import { getMe } from "@/lib/data/auth";

export default async function UserHeader() {
    const user = await getMe();

    const cookieStore = await cookies();
    const currentLanguage = cookieStore.get("current-language")?.value || "en";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="outline-none">
                    <UserAvatar name={user?.name} image={user?.image} />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align={currentLanguage === "ar" ? "start" : "end"}
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <UserAvatar name={user?.name} image={user?.image} />
                        <div className="grid flex-1 text-start text-sm leading-tight">
                            <span className="truncate font-semibold">{user?.name}</span>
                            <span className="truncate text-xs">{user?.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <UserHeaderClient />

            </DropdownMenuContent>
        </DropdownMenu>
    );
}

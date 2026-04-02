import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UrlImage } from "@/lib/data/utils";

const UserAvatar = ({ image, name, isOnline, className }) => {
  const firstLetter = name?.[0]?.toUpperCase() || "?";

  return (
    <div className="relative inline-block">
      <Avatar className={cn("size-9 rounded-full", className)}>
        <AvatarImage
          // src={image ? `${UrlImage}${image}` : undefined}
          src={image ? `${image}` : undefined}
          alt={name || "User"}
        />
        <AvatarFallback className="bg-gradient-to-r from-main to-[#2A7FBA] text-white text-xs font-semibold">
          {firstLetter}
        </AvatarFallback>
      </Avatar>

      {isOnline && (
        <span className="absolute bottom-0 end-0 size-3 rounded-full bg-green-500 border-2 border-background" />
      )}
    </div>
  );
};

export default UserAvatar;

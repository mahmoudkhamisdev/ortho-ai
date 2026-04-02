import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PrimaryButton({ title, className, ...props }) {
  return (
    <Button
      {...props}
      className={cn(
        "bg-gradient-to-r from-main to-[#2A7FBA] hover:from-[#2A7FBA] hover:to-main text-white px-6 h-12 font-semibold rounded-lg hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      {title}
    </Button>
  );
}

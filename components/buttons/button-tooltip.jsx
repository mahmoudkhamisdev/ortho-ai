import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ButtonTooltip({
  children,
  content,
  tooltip,
  ...props
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children || (
            <Button variant="ghost" size="icon" {...props}>
              {content}
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

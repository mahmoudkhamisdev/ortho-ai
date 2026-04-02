import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SortButton({ column, title }) {
  return (
    <Button
      variant="ghost"
      className="p-0 hover:!bg-transparent  justify-between"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ChevronUp
        className={`h-4 w-4 ${column.getIsSorted() === "asc" && "rotate-180"}`}
      />
    </Button>
  );
}

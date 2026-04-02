import { clsx, type ClassValue } from "clsx";
import { CheckCircle, CircleAlert, Clock3, XCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const statusVariants = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return CheckCircle;
      case "reject":
        return XCircle;
      case "pending":
        return Clock3;
      default:
        return CircleAlert;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-400/20 text-green-500";
      case "reject":
        return "bg-red-400/20 text-red-500";
      case "pending":
        return "bg-amber-400/20 text-amber-500";
      default:
        return "bg-gray-400/20 text-gray-500";
    }
  };

  return {
    getStatusIcon,
    getStatusColor,
  };
};

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type PaymentStatus = "paid" | "unpaid" | "pending";
export type ApprovalStatus = "approved" | "rejected" | "pending";

interface StatusBadgeProps {
  status: PaymentStatus | ApprovalStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "paid":
      case "approved":
        return "bg-success/20 text-success border-success/30";
      case "unpaid":
      case "rejected":
        return "bg-destructive/20 text-destructive border-destructive/30";
      case "pending":
        return "bg-warning/20 text-warning border-warning/30";
      default:
        return "";
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "border font-medium capitalize",
        getStatusStyles(),
        className
      )}
      data-testid={`badge-status-${status}`}
    >
      <span className={cn(
        "mr-1.5 inline-block h-1.5 w-1.5 rounded-full",
        status === "paid" || status === "approved" ? "bg-success" :
        status === "unpaid" || status === "rejected" ? "bg-destructive" :
        "bg-warning"
      )} />
      {status}
    </Badge>
  );
}

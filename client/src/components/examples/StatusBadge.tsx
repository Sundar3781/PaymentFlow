import { StatusBadge } from "../StatusBadge";

export default function StatusBadgeExample() {
  return (
    <div className="flex gap-2 flex-wrap">
      <StatusBadge status="paid" />
      <StatusBadge status="unpaid" />
      <StatusBadge status="pending" />
      <StatusBadge status="approved" />
      <StatusBadge status="rejected" />
    </div>
  );
}

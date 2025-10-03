import { StatCard } from "../StatCard";
import { DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Requests"
        value="156"
        icon={DollarSign}
        trend={{ value: "+12% from last month", isPositive: true }}
      />
      <StatCard
        title="Pending Approvals"
        value="23"
        icon={Clock}
      />
      <StatCard
        title="Total Paid"
        value="$124,500"
        icon={CheckCircle}
        trend={{ value: "+8% from last month", isPositive: true }}
      />
      <StatCard
        title="Total Unpaid"
        value="$45,200"
        icon={XCircle}
        trend={{ value: "-3% from last month", isPositive: true }}
      />
    </div>
  );
}

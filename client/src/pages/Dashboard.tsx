import { useState } from "react";
import { StatCard } from "@/components/StatCard";
import { PaymentRequestTable, PaymentRequest } from "@/components/PaymentRequestTable";
import { CreateRequestDialog } from "@/components/CreateRequestDialog";
import { ApprovalDialog } from "@/components/ApprovalDialog";
import { DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";

export default function Dashboard() {
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(null);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);

  //todo: remove mock functionality
  const mockRequests: PaymentRequest[] = [
    {
      id: "REQ-001",
      amount: 25000,
      description: "Daily wage payment for workers",
      requester: "Accounts Team",
      head: "wages",
      group: "team-a",
      status: "pending",
      date: "2024-01-15"
    },
    {
      id: "REQ-002",
      amount: 15000,
      description: "Diesel fuel for machinery",
      requester: "Accounts Team",
      head: "fuel",
      group: "team-a",
      status: "paid",
      date: "2024-01-14"
    },
    {
      id: "REQ-003",
      amount: 45000,
      description: "Construction materials purchase",
      requester: "Accounts Team",
      head: "materials",
      group: "team-b",
      status: "unpaid",
      date: "2024-01-13"
    },
    {
      id: "REQ-004",
      amount: 8500,
      description: "Office supplies and stationery",
      requester: "Accounts Team",
      head: "petty-cash",
      group: "team-a",
      status: "pending",
      date: "2024-01-12"
    },
    {
      id: "REQ-005",
      amount: 120000,
      description: "Monthly salary disbursement",
      requester: "Accounts Team",
      head: "salaries",
      group: "team-a",
      status: "paid",
      date: "2024-01-11"
    }
  ];

  const handleViewDetails = (request: PaymentRequest) => {
    setSelectedRequest(request);
    setApprovalDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold" data-testid="heading-dashboard">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of payment requests and approvals</p>
        </div>
        <CreateRequestDialog />
      </div>

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
          value="₹8,45,500"
          icon={CheckCircle}
          trend={{ value: "+8% from last month", isPositive: true }}
        />
        <StatCard
          title="Total Unpaid"
          value="₹3,25,200"
          icon={XCircle}
          trend={{ value: "-3% from last month", isPositive: true }}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold" data-testid="heading-recent-requests">Recent Requests</h2>
        <PaymentRequestTable
          requests={mockRequests}
          onViewDetails={handleViewDetails}
          onMarkPaid={(id) => console.log("Mark as paid:", id)}
          onMarkUnpaid={(id) => console.log("Mark as unpaid:", id)}
        />
      </div>

      <ApprovalDialog
        request={selectedRequest}
        open={approvalDialogOpen}
        onOpenChange={setApprovalDialogOpen}
        onApprove={(id, comment) => console.log("Approved:", id, comment)}
        onReject={(id, comment) => console.log("Rejected:", id, comment)}
      />
    </div>
  );
}

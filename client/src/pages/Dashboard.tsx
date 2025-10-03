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
      amount: 5000,
      description: "Office supplies and equipment for Q1 2024",
      requester: "John Smith",
      head: "operations",
      group: "team-a",
      status: "pending",
      date: "2024-01-15"
    },
    {
      id: "REQ-002",
      amount: 12500,
      description: "Marketing campaign budget",
      requester: "Sarah Johnson",
      head: "marketing",
      group: "team-b",
      status: "paid",
      date: "2024-01-14"
    },
    {
      id: "REQ-003",
      amount: 3200,
      description: "Software licenses renewal",
      requester: "Mike Chen",
      head: "it",
      group: "team-c",
      status: "unpaid",
      date: "2024-01-13"
    },
    {
      id: "REQ-004",
      amount: 8750,
      description: "Consultant fees for project management",
      requester: "Emily Davis",
      head: "hr",
      group: "consultants",
      status: "pending",
      date: "2024-01-12"
    },
    {
      id: "REQ-005",
      amount: 2100,
      description: "Cloud infrastructure costs",
      requester: "David Wilson",
      head: "it",
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

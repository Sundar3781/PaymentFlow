import { useState } from "react";
import { PaymentRequestTable, PaymentRequest } from "@/components/PaymentRequestTable";
import { ApprovalDialog } from "@/components/ApprovalDialog";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Approvals() {
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(null);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);

  //todo: remove mock functionality
  const pendingRequests: PaymentRequest[] = [
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
      id: "REQ-007",
      amount: 18000,
      description: "Heavy machinery rental charges",
      requester: "Accounts Team",
      head: "equipment-rental",
      group: "team-c",
      status: "pending",
      date: "2024-01-09"
    }
  ];

  const handleViewDetails = (request: PaymentRequest) => {
    setSelectedRequest(request);
    setApprovalDialogOpen(true);
  };

  const totalPendingAmount = pendingRequests.reduce((sum, req) => sum + req.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" data-testid="heading-approvals">Pending Approvals</h1>
        <p className="text-muted-foreground mt-1">Review and approve payment requests</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-pending-count">{pendingRequests.length}</div>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono" data-testid="text-pending-amount">₹{totalPendingAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Awaiting Action</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <StatusBadge status="pending" />
              <span className="text-sm text-muted-foreground">Requires review</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold" data-testid="heading-pending-list">Requests Requiring Approval</h2>
        <PaymentRequestTable
          requests={pendingRequests}
          onViewDetails={handleViewDetails}
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

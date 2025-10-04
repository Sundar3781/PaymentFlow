import { useState } from "react";
import { StatCard } from "@/components/StatCard";
import { PurchaseRequestTable, PurchaseRequest } from "@/components/PurchaseRequestTable";
import { CreatePurchaseRequestDialog } from "@/components/CreatePurchaseRequestDialog";
import { PurchaseApprovalDialog } from "@/components/PurchaseApprovalDialog";
import { ShoppingCart, Clock, CheckCircle, FileText, Package } from "lucide-react";

export default function PurchaseDashboard() {
  const [selectedRequest, setSelectedRequest] = useState<PurchaseRequest | null>(null);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);

  const mockRequests: PurchaseRequest[] = [
    {
      id: "PR-001",
      itemName: "Construction Steel Rods (12mm)",
      quantity: 500,
      estimatedCost: 125000,
      description: "High-grade steel rods for building foundation work",
      requester: "Ramesh Kumar",
      requesterRole: "field-worker",
      urgency: "high",
      status: "pending-supervisor",
      date: "2024-01-15",
      vendor: "Steel World Ltd"
    },
    {
      id: "PR-002",
      itemName: "Cement Bags (50kg)",
      quantity: 200,
      estimatedCost: 82000,
      description: "Premium grade OPC 43 cement for construction",
      requester: "Suresh Patel",
      requesterRole: "supervisor",
      urgency: "urgent",
      status: "pending-manager",
      date: "2024-01-14",
      supervisorApproval: { approved: true, date: "2024-01-14", comment: "Approved for immediate use" }
    },
    {
      id: "PR-003",
      itemName: "Excavator Rental",
      quantity: 1,
      estimatedCost: 45000,
      description: "Heavy excavator needed for site preparation - 7 days rental",
      requester: "Vijay Singh",
      requesterRole: "manager",
      urgency: "medium",
      status: "approved",
      date: "2024-01-13",
      supervisorApproval: { approved: true, date: "2024-01-13" },
      managerApproval: { approved: true, date: "2024-01-13" },
      managementApproval: { approved: true, date: "2024-01-14", comment: "Approved. Proceed with quotation" }
    },
    {
      id: "PR-004",
      itemName: "Safety Equipment Set",
      quantity: 25,
      estimatedCost: 37500,
      description: "Complete safety gear including helmets, vests, gloves, boots",
      requester: "Amit Sharma",
      requesterRole: "field-worker",
      urgency: "low",
      status: "quotation-pending",
      date: "2024-01-12",
      supervisorApproval: { approved: true, date: "2024-01-12" },
      managerApproval: { approved: true, date: "2024-01-13" },
      managementApproval: { approved: true, date: "2024-01-13" },
      quotationId: "QT-2024-001"
    }
  ];

  const handleViewDetails = (request: PurchaseRequest) => {
    setSelectedRequest(request);
    setApprovalDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold" data-testid="heading-purchase-dashboard">Purchase Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of purchase requests and orders</p>
        </div>
        <CreatePurchaseRequestDialog userRole="supervisor" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Requests"
          value="67"
          icon={ShoppingCart}
          trend={{ value: "+15% from last month", isPositive: true }}
        />
        <StatCard
          title="Pending Approvals"
          value="12"
          icon={Clock}
        />
        <StatCard
          title="Approved"
          value="42"
          icon={CheckCircle}
        />
        <StatCard
          title="Active Quotations"
          value="8"
          icon={FileText}
        />
        <StatCard
          title="POs Issued"
          value="35"
          icon={Package}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold" data-testid="heading-recent-purchase-requests">Recent Purchase Requests</h2>
        <PurchaseRequestTable
          requests={mockRequests}
          onViewDetails={handleViewDetails}
        />
      </div>

      <PurchaseApprovalDialog
        request={selectedRequest}
        open={approvalDialogOpen}
        onOpenChange={setApprovalDialogOpen}
        approvalLevel="supervisor"
        onApprove={(id, comment) => console.log("Approved:", id, comment)}
        onReject={(id, comment) => console.log("Rejected:", id, comment)}
      />
    </div>
  );
}

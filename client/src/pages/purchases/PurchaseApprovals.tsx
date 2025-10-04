import { useState } from "react";
import { PurchaseRequestTable, PurchaseRequest } from "@/components/PurchaseRequestTable";
import { PurchaseApprovalDialog } from "@/components/PurchaseApprovalDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PurchaseApprovals() {
  const [selectedRequest, setSelectedRequest] = useState<PurchaseRequest | null>(null);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [approvalLevel, setApprovalLevel] = useState<"supervisor" | "manager" | "management">("supervisor");

  const pendingSupervisor: PurchaseRequest[] = [
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
      id: "PR-006",
      itemName: "Paint and Finishing Materials",
      quantity: 1,
      estimatedCost: 42000,
      description: "Complete paint package for interior finishing",
      requester: "Dinesh Yadav",
      requesterRole: "field-worker",
      urgency: "medium",
      status: "pending-supervisor",
      date: "2024-01-14"
    }
  ];

  const pendingManager: PurchaseRequest[] = [
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
    }
  ];

  const pendingManagement: PurchaseRequest[] = [
    {
      id: "PR-007",
      itemName: "Heavy Duty Generator",
      quantity: 1,
      estimatedCost: 385000,
      description: "125 KVA generator for backup power supply",
      requester: "Rajesh Mehta",
      requesterRole: "manager",
      urgency: "high",
      status: "pending-management",
      date: "2024-01-13",
      supervisorApproval: { approved: true, date: "2024-01-13" },
      managerApproval: { approved: true, date: "2024-01-14", comment: "Critical requirement approved" }
    }
  ];

  const handleViewDetails = (request: PurchaseRequest, level: "supervisor" | "manager" | "management") => {
    setSelectedRequest(request);
    setApprovalLevel(level);
    setApprovalDialogOpen(true);
  };

  const totalPendingSupervisor = pendingSupervisor.reduce((sum, req) => sum + req.estimatedCost, 0);
  const totalPendingManager = pendingManager.reduce((sum, req) => sum + req.estimatedCost, 0);
  const totalPendingManagement = pendingManagement.reduce((sum, req) => sum + req.estimatedCost, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" data-testid="heading-purchase-approvals">Purchase Approvals</h1>
        <p className="text-muted-foreground mt-1">Review and approve purchase requests at different levels</p>
      </div>

      <Tabs defaultValue="supervisor" className="space-y-4">
        <TabsList>
          <TabsTrigger value="supervisor" data-testid="tab-supervisor-approvals">
            Supervisor ({pendingSupervisor.length})
          </TabsTrigger>
          <TabsTrigger value="manager" data-testid="tab-manager-approvals">
            Manager ({pendingManager.length})
          </TabsTrigger>
          <TabsTrigger value="management" data-testid="tab-management-approvals">
            Management ({pendingManagement.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="supervisor" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="hover-elevate">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-supervisor-pending-count">{pendingSupervisor.length}</div>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono" data-testid="text-supervisor-pending-amount">₹{totalPendingSupervisor.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>
          <PurchaseRequestTable
            requests={pendingSupervisor}
            onViewDetails={(req) => handleViewDetails(req, "supervisor")}
          />
        </TabsContent>

        <TabsContent value="manager" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="hover-elevate">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-manager-pending-count">{pendingManager.length}</div>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono" data-testid="text-manager-pending-amount">₹{totalPendingManager.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>
          <PurchaseRequestTable
            requests={pendingManager}
            onViewDetails={(req) => handleViewDetails(req, "manager")}
          />
        </TabsContent>

        <TabsContent value="management" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="hover-elevate">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-management-pending-count">{pendingManagement.length}</div>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono" data-testid="text-management-pending-amount">₹{totalPendingManagement.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>
          <PurchaseRequestTable
            requests={pendingManagement}
            onViewDetails={(req) => handleViewDetails(req, "management")}
          />
        </TabsContent>
      </Tabs>

      <PurchaseApprovalDialog
        request={selectedRequest}
        open={approvalDialogOpen}
        onOpenChange={setApprovalDialogOpen}
        approvalLevel={approvalLevel}
        onApprove={(id, comment) => console.log("Approved:", id, "at level:", approvalLevel, comment)}
        onReject={(id, comment) => console.log("Rejected:", id, "at level:", approvalLevel, comment)}
      />
    </div>
  );
}

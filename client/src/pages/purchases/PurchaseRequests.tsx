import { useState } from "react";
import { PurchaseRequestTable, PurchaseRequest } from "@/components/PurchaseRequestTable";
import { CreatePurchaseRequestDialog } from "@/components/CreatePurchaseRequestDialog";
import { PurchaseApprovalDialog } from "@/components/PurchaseApprovalDialog";
import { QuotationDialog } from "@/components/QuotationDialog";
import { PODialog } from "@/components/PODialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function PurchaseRequests() {
  const [selectedRequest, setSelectedRequest] = useState<PurchaseRequest | null>(null);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [quotationDialogOpen, setQuotationDialogOpen] = useState(false);
  const [poDialogOpen, setPODialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

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
      status: "quotation-approved",
      date: "2024-01-12",
      supervisorApproval: { approved: true, date: "2024-01-12" },
      managerApproval: { approved: true, date: "2024-01-13" },
      managementApproval: { approved: true, date: "2024-01-13" },
      quotationId: "QT-2024-001",
      actualCost: 35000
    },
    {
      id: "PR-005",
      itemName: "Electrical Wiring Material",
      quantity: 1,
      estimatedCost: 68000,
      description: "Complete electrical wiring package for Phase 1",
      requester: "Prakash Joshi",
      requesterRole: "supervisor",
      urgency: "medium",
      status: "po-issued",
      date: "2024-01-10",
      supervisorApproval: { approved: true, date: "2024-01-10" },
      managerApproval: { approved: true, date: "2024-01-11" },
      managementApproval: { approved: true, date: "2024-01-11" },
      quotationId: "QT-2024-002",
      poNumber: "PO-2024-001",
      actualCost: 65000,
      vendor: "ElectroMart Supplies"
    }
  ];

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = searchQuery === "" || 
      request.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requester.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "" || statusFilter === "all" || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (request: PurchaseRequest) => {
    setSelectedRequest(request);
    setApprovalDialogOpen(true);
  };

  const handleAddQuotation = (request: PurchaseRequest) => {
    setSelectedRequest(request);
    setQuotationDialogOpen(true);
  };

  const handleIssuePO = (request: PurchaseRequest) => {
    setSelectedRequest(request);
    setPODialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold" data-testid="heading-purchase-requests">Purchase Requests</h1>
          <p className="text-muted-foreground mt-1">Manage all purchase requests</p>
        </div>
        <CreatePurchaseRequestDialog userRole="supervisor" />
      </div>

      <div className="flex gap-4 items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by ID, item name, or requester..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-purchase-requests"
            />
          </div>
        </div>
        <div className="w-[240px] space-y-2">
          <Label htmlFor="status-filter">Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status-filter" data-testid="select-purchase-status-filter">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending-supervisor">Pending Supervisor</SelectItem>
              <SelectItem value="pending-manager">Pending Manager</SelectItem>
              <SelectItem value="pending-management">Pending Management</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="quotation-pending">Quotation Pending</SelectItem>
              <SelectItem value="quotation-approved">Quotation Approved</SelectItem>
              <SelectItem value="po-issued">PO Issued</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <PurchaseRequestTable
        requests={filteredRequests}
        onViewDetails={handleViewDetails}
        onAddQuotation={handleAddQuotation}
        onIssuePO={handleIssuePO}
      />

      <PurchaseApprovalDialog
        request={selectedRequest}
        open={approvalDialogOpen}
        onOpenChange={setApprovalDialogOpen}
        approvalLevel="supervisor"
        onApprove={(id, comment) => console.log("Approved:", id, comment)}
        onReject={(id, comment) => console.log("Rejected:", id, comment)}
      />

      <QuotationDialog
        request={selectedRequest}
        open={quotationDialogOpen}
        onOpenChange={setQuotationDialogOpen}
        onSubmit={(data) => console.log("Quotation submitted:", data)}
      />

      <PODialog
        request={selectedRequest}
        quotation={selectedRequest?.actualCost ? {
          vendorName: selectedRequest.vendor || "N/A",
          quotedPrice: selectedRequest.actualCost,
          quotationNumber: selectedRequest.quotationId || "N/A"
        } : null}
        open={poDialogOpen}
        onOpenChange={setPODialogOpen}
        onSubmit={(data) => console.log("PO issued:", data)}
      />
    </div>
  );
}

import { useState } from "react";
import { PaymentRequestTable, PaymentRequest } from "@/components/PaymentRequestTable";
import { CreateRequestDialog } from "@/components/CreateRequestDialog";
import { ApprovalDialog } from "@/components/ApprovalDialog";
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

export default function Requests() {
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(null);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

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
    },
    {
      id: "REQ-006",
      amount: 35000,
      description: "Fertiliser stock for farming operations",
      requester: "Accounts Team",
      head: "fertiliser",
      group: "team-b",
      status: "unpaid",
      date: "2024-01-10"
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
    },
    {
      id: "REQ-008",
      amount: 52000,
      description: "Raw material purchases from vendor",
      requester: "Accounts Team",
      head: "purchases",
      group: "vendors",
      status: "paid",
      date: "2024-01-08"
    }
  ];

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = searchQuery === "" || 
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requester.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "" || statusFilter === "all" || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (request: PaymentRequest) => {
    setSelectedRequest(request);
    setApprovalDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold" data-testid="heading-requests">Payment Requests</h1>
          <p className="text-muted-foreground mt-1">Manage all payment requests</p>
        </div>
        <CreateRequestDialog />
      </div>

      <div className="flex gap-4 items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by ID, description, or requester..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-requests"
            />
          </div>
        </div>
        <div className="w-[200px] space-y-2">
          <Label htmlFor="status-filter">Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status-filter" data-testid="select-status-filter">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <PaymentRequestTable
        requests={filteredRequests}
        onViewDetails={handleViewDetails}
        onMarkPaid={(id) => console.log("Mark as paid:", id)}
        onMarkUnpaid={(id) => console.log("Mark as unpaid:", id)}
      />

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

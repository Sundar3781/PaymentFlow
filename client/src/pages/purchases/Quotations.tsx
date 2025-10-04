import { useState } from "react";
import { QuotationTable, Quotation } from "@/components/QuotationTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function Quotations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const mockQuotations: Quotation[] = [
    {
      id: "1",
      quotationNumber: "QT-2024-001",
      requestId: "PR-004",
      itemName: "Safety Equipment Set",
      quantity: 25,
      vendorName: "SafeWork Industries",
      quotedPrice: 35000,
      deliveryTime: 7,
      termsAndConditions: "Payment: 50% advance, 50% on delivery. Warranty: 1 year",
      status: "approved",
      submittedDate: "2024-01-13"
    },
    {
      id: "2",
      quotationNumber: "QT-2024-002",
      requestId: "PR-005",
      itemName: "Electrical Wiring Material",
      quantity: 1,
      vendorName: "ElectroMart Supplies",
      quotedPrice: 65000,
      deliveryTime: 5,
      termsAndConditions: "Payment: Net 30. Installation support included",
      status: "approved",
      submittedDate: "2024-01-11"
    },
    {
      id: "3",
      quotationNumber: "QT-2024-003",
      requestId: "PR-003",
      itemName: "Excavator Rental",
      quantity: 1,
      vendorName: "Heavy Equipment Rentals Ltd",
      quotedPrice: 42000,
      deliveryTime: 2,
      termsAndConditions: "7 days rental. Fuel extra. Operator included",
      status: "pending",
      submittedDate: "2024-01-14"
    },
    {
      id: "4",
      quotationNumber: "QT-2024-004",
      requestId: "PR-008",
      itemName: "Plumbing Fixtures Package",
      quantity: 1,
      vendorName: "Modern Sanitary Solutions",
      quotedPrice: 78000,
      deliveryTime: 10,
      termsAndConditions: "Payment: 100% advance. Free installation",
      status: "pending",
      submittedDate: "2024-01-15"
    }
  ];

  const filteredQuotations = mockQuotations.filter(quotation => {
    const matchesSearch = searchQuery === "" || 
      quotation.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quotation.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quotation.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "" || statusFilter === "all" || quotation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalQuotations = mockQuotations.length;
  const pendingQuotations = mockQuotations.filter(q => q.status === "pending").length;
  const approvedQuotations = mockQuotations.filter(q => q.status === "approved").length;
  const totalQuotedAmount = mockQuotations.reduce((sum, q) => sum + q.quotedPrice, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" data-testid="heading-quotations">Quotations</h1>
        <p className="text-muted-foreground mt-1">Manage vendor quotations for purchase requests</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Quotations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-quotations">{totalQuotations}</div>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning" data-testid="text-pending-quotations">{pendingQuotations}</div>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success" data-testid="text-approved-quotations">{approvedQuotations}</div>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Quoted Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono" data-testid="text-total-quoted-amount">₹{totalQuotedAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by quotation #, item, or vendor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-quotations"
            />
          </div>
        </div>
        <div className="w-[200px] space-y-2">
          <Label htmlFor="status-filter">Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status-filter" data-testid="select-quotation-status-filter">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <QuotationTable
        quotations={filteredQuotations}
        onViewDetails={(quotation) => console.log("View quotation:", quotation)}
        onApprove={(id) => console.log("Approve quotation:", id)}
        onReject={(id) => console.log("Reject quotation:", id)}
      />
    </div>
  );
}

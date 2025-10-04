import { useState } from "react";
import { POTable, PurchaseOrder } from "@/components/POTable";
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

export default function PurchaseOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const mockPurchaseOrders: PurchaseOrder[] = [
    {
      id: "1",
      poNumber: "PO-2024-001",
      requestId: "PR-005",
      itemName: "Electrical Wiring Material",
      quantity: 1,
      vendorName: "ElectroMart Supplies",
      totalAmount: 65000,
      deliveryAddress: "Site A, Industrial Area, Phase 2, Sector 12",
      deliveryDate: "2024-01-20",
      paymentTerms: "Net 30",
      status: "issued",
      issuedDate: "2024-01-12"
    },
    {
      id: "2",
      poNumber: "PO-2024-002",
      requestId: "PR-009",
      itemName: "Concrete Mix (Grade M25)",
      quantity: 500,
      vendorName: "ReadyMix Concrete Ltd",
      totalAmount: 185000,
      deliveryAddress: "Site B, Construction Zone, Block C",
      deliveryDate: "2024-01-18",
      paymentTerms: "50% Advance",
      status: "received",
      issuedDate: "2024-01-10"
    },
    {
      id: "3",
      poNumber: "PO-2024-003",
      requestId: "PR-010",
      itemName: "Aluminum Window Frames",
      quantity: 45,
      vendorName: "Premium Windows Co",
      totalAmount: 142000,
      deliveryAddress: "Site A, Industrial Area, Phase 2, Sector 12",
      deliveryDate: "2024-01-25",
      paymentTerms: "COD",
      status: "issued",
      issuedDate: "2024-01-13"
    },
    {
      id: "4",
      poNumber: "PO-2024-004",
      requestId: "PR-011",
      itemName: "Tile and Flooring Package",
      quantity: 1,
      vendorName: "Marble & Tiles Emporium",
      totalAmount: 225000,
      deliveryAddress: "Site C, Residential Complex, Wing A",
      deliveryDate: "2024-01-15",
      paymentTerms: "Net 15",
      status: "completed",
      issuedDate: "2024-01-05"
    }
  ];

  const filteredPOs = mockPurchaseOrders.filter(po => {
    const matchesSearch = searchQuery === "" || 
      po.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "" || statusFilter === "all" || po.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPOs = mockPurchaseOrders.length;
  const issuedPOs = mockPurchaseOrders.filter(po => po.status === "issued").length;
  const receivedPOs = mockPurchaseOrders.filter(po => po.status === "received").length;
  const completedPOs = mockPurchaseOrders.filter(po => po.status === "completed").length;
  const totalPOAmount = mockPurchaseOrders.reduce((sum, po) => sum + po.totalAmount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" data-testid="heading-purchase-orders">Purchase Orders</h1>
        <p className="text-muted-foreground mt-1">View and manage issued purchase orders</p>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total POs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-pos">{totalPOs}</div>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400" data-testid="text-issued-pos">{issuedPOs}</div>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400" data-testid="text-received-pos">{receivedPOs}</div>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success" data-testid="text-completed-pos">{completedPOs}</div>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total PO Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono" data-testid="text-total-po-amount">₹{totalPOAmount.toLocaleString()}</div>
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
              placeholder="Search by PO #, item, or vendor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-pos"
            />
          </div>
        </div>
        <div className="w-[200px] space-y-2">
          <Label htmlFor="status-filter">Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status-filter" data-testid="select-po-status-filter">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="issued">Issued</SelectItem>
              <SelectItem value="received">Received</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <POTable
        purchaseOrders={filteredPOs}
        onViewDetails={(po) => console.log("View PO:", po)}
        onDownload={(po) => console.log("Download PO:", po)}
      />
    </div>
  );
}

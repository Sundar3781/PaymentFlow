import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download } from "lucide-react";

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  requestId: string;
  itemName: string;
  quantity: number;
  vendorName: string;
  totalAmount: number;
  deliveryAddress: string;
  deliveryDate: string;
  paymentTerms: string;
  status: "issued" | "received" | "completed" | "cancelled";
  issuedDate: string;
}

interface POTableProps {
  purchaseOrders: PurchaseOrder[];
  onViewDetails?: (po: PurchaseOrder) => void;
  onDownload?: (po: PurchaseOrder) => void;
}

export function POTable({ purchaseOrders, onViewDetails, onDownload }: POTableProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "issued": { label: "Issued", className: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30" },
      "received": { label: "Received", className: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30" },
      "completed": { label: "Completed", className: "bg-success/20 text-success border-success/30" },
      "cancelled": { label: "Cancelled", className: "bg-destructive/20 text-destructive border-destructive/30" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant="outline" className={`border font-medium ${config.className}`} data-testid={`badge-po-status-${status}`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">PO Number</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Total Amount</TableHead>
            <TableHead>Delivery Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchaseOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                No purchase orders found
              </TableCell>
            </TableRow>
          ) : (
            purchaseOrders.map((po) => (
              <TableRow key={po.id} className="hover-elevate" data-testid={`row-po-${po.id}`}>
                <TableCell className="font-mono font-medium" data-testid="text-po-number">{po.poNumber}</TableCell>
                <TableCell className="font-medium" data-testid="text-po-item">{po.itemName}</TableCell>
                <TableCell data-testid="text-po-vendor">{po.vendorName}</TableCell>
                <TableCell className="text-right" data-testid="text-po-qty">{po.quantity}</TableCell>
                <TableCell className="text-right font-mono" data-testid="text-po-amount">₹{po.totalAmount.toLocaleString()}</TableCell>
                <TableCell data-testid="text-po-delivery-date">{po.deliveryDate}</TableCell>
                <TableCell>{getStatusBadge(po.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onViewDetails?.(po)}
                      data-testid={`button-view-po-${po.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onDownload?.(po)}
                      data-testid={`button-download-po-${po.id}`}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

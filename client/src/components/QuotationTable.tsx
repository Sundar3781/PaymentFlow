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
import { Eye, CheckCircle, XCircle } from "lucide-react";

export interface Quotation {
  id: string;
  quotationNumber: string;
  requestId: string;
  itemName: string;
  quantity: number;
  vendorName: string;
  quotedPrice: number;
  deliveryTime: number;
  termsAndConditions?: string;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
}

interface QuotationTableProps {
  quotations: Quotation[];
  onViewDetails?: (quotation: Quotation) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  showActions?: boolean;
}

export function QuotationTable({ quotations, onViewDetails, onApprove, onReject, showActions = true }: QuotationTableProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "pending": { label: "Pending", className: "bg-warning/20 text-warning border-warning/30" },
      "approved": { label: "Approved", className: "bg-success/20 text-success border-success/30" },
      "rejected": { label: "Rejected", className: "bg-destructive/20 text-destructive border-destructive/30" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant="outline" className={`border font-medium ${config.className}`} data-testid={`badge-quotation-status-${status}`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Quotation #</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Quoted Price</TableHead>
            <TableHead className="text-right">Delivery</TableHead>
            <TableHead>Status</TableHead>
            {showActions && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showActions ? 8 : 7} className="text-center text-muted-foreground py-8">
                No quotations found
              </TableCell>
            </TableRow>
          ) : (
            quotations.map((quotation) => (
              <TableRow key={quotation.id} className="hover-elevate" data-testid={`row-quotation-${quotation.id}`}>
                <TableCell className="font-mono font-medium" data-testid="text-quotation-number">{quotation.quotationNumber}</TableCell>
                <TableCell className="font-medium" data-testid="text-quotation-item">{quotation.itemName}</TableCell>
                <TableCell data-testid="text-quotation-vendor">{quotation.vendorName}</TableCell>
                <TableCell className="text-right" data-testid="text-quotation-qty">{quotation.quantity}</TableCell>
                <TableCell className="text-right font-mono" data-testid="text-quotation-price">₹{quotation.quotedPrice.toLocaleString()}</TableCell>
                <TableCell className="text-right" data-testid="text-quotation-delivery">{quotation.deliveryTime} days</TableCell>
                <TableCell>{getStatusBadge(quotation.status)}</TableCell>
                {showActions && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onViewDetails?.(quotation)}
                        data-testid={`button-view-quotation-${quotation.id}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {quotation.status === "pending" && (
                        <>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => onApprove?.(quotation.id)}
                            className="text-success hover:text-success"
                            data-testid={`button-approve-quotation-${quotation.id}`}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => onReject?.(quotation.id)}
                            className="text-destructive hover:text-destructive"
                            data-testid={`button-reject-quotation-${quotation.id}`}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

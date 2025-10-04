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
import { Eye, MoreVertical, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type PurchaseApprovalStatus = 
  | "pending-supervisor" 
  | "pending-manager" 
  | "pending-management" 
  | "approved" 
  | "rejected"
  | "quotation-pending"
  | "quotation-approved"
  | "po-issued";

export interface PurchaseRequest {
  id: string;
  itemName: string;
  quantity: number;
  estimatedCost: number;
  actualCost?: number;
  description: string;
  requester: string;
  requesterRole: "field-worker" | "supervisor" | "manager";
  urgency: "low" | "medium" | "high" | "urgent";
  status: PurchaseApprovalStatus;
  date: string;
  supervisorApproval?: { approved: boolean; date: string; comment?: string };
  managerApproval?: { approved: boolean; date: string; comment?: string };
  managementApproval?: { approved: boolean; date: string; comment?: string };
  quotationId?: string;
  poNumber?: string;
  vendor?: string;
}

interface PurchaseRequestTableProps {
  requests: PurchaseRequest[];
  onViewDetails?: (request: PurchaseRequest) => void;
  onAddQuotation?: (request: PurchaseRequest) => void;
  onIssuePO?: (request: PurchaseRequest) => void;
}

export function PurchaseRequestTable({ requests, onViewDetails, onAddQuotation, onIssuePO }: PurchaseRequestTableProps) {
  const getStatusBadge = (status: PurchaseApprovalStatus) => {
    const statusConfig = {
      "pending-supervisor": { label: "Pending Supervisor", className: "bg-warning/20 text-warning border-warning/30" },
      "pending-manager": { label: "Pending Manager", className: "bg-warning/20 text-warning border-warning/30" },
      "pending-management": { label: "Pending Management", className: "bg-warning/20 text-warning border-warning/30" },
      "approved": { label: "Approved", className: "bg-success/20 text-success border-success/30" },
      "rejected": { label: "Rejected", className: "bg-destructive/20 text-destructive border-destructive/30" },
      "quotation-pending": { label: "Quotation Pending", className: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30" },
      "quotation-approved": { label: "Quotation Approved", className: "bg-success/20 text-success border-success/30" },
      "po-issued": { label: "PO Issued", className: "bg-success/20 text-success border-success/30" },
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={cn("border font-medium", config.className)} data-testid={`badge-status-${status}`}>
        {config.label}
      </Badge>
    );
  };

  const getUrgencyBadge = (urgency: string) => {
    const urgencyConfig = {
      "low": "bg-gray-500/20 text-gray-700 dark:text-gray-300",
      "medium": "bg-blue-500/20 text-blue-600 dark:text-blue-400",
      "high": "bg-orange-500/20 text-orange-600 dark:text-orange-400",
      "urgent": "bg-destructive/20 text-destructive",
    };

    return (
      <Badge variant="outline" className={cn("border-0 font-medium capitalize", urgencyConfig[urgency as keyof typeof urgencyConfig])}>
        {urgency}
      </Badge>
    );
  };

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Est. Cost</TableHead>
            <TableHead>Requester</TableHead>
            <TableHead>Urgency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                No purchase requests found
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id} className="hover-elevate" data-testid={`row-purchase-${request.id}`}>
                <TableCell className="font-mono font-medium" data-testid="text-purchase-id">{request.id}</TableCell>
                <TableCell className="max-w-[250px] truncate font-medium" data-testid="text-item-name">{request.itemName}</TableCell>
                <TableCell className="text-right" data-testid="text-quantity">{request.quantity}</TableCell>
                <TableCell className="text-right font-mono" data-testid="text-estimated-cost">₹{request.estimatedCost.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium" data-testid="text-requester">{request.requester}</span>
                    <span className="text-xs text-muted-foreground capitalize">{request.requesterRole.replace('-', ' ')}</span>
                  </div>
                </TableCell>
                <TableCell>{getUrgencyBadge(request.urgency)}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onViewDetails?.(request)}
                      data-testid={`button-view-purchase-${request.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" data-testid={`button-actions-purchase-${request.id}`}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {request.status === "approved" && !request.quotationId && (
                          <DropdownMenuItem onClick={() => onAddQuotation?.(request)} data-testid="action-add-quotation">
                            <FileText className="mr-2 h-4 w-4" />
                            Add Quotation
                          </DropdownMenuItem>
                        )}
                        {request.status === "quotation-approved" && !request.poNumber && (
                          <DropdownMenuItem onClick={() => onIssuePO?.(request)} data-testid="action-issue-po">
                            <FileText className="mr-2 h-4 w-4" />
                            Issue PO
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { PurchaseRequest } from "./PurchaseRequestTable";

interface PurchaseApprovalDialogProps {
  request: PurchaseRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove?: (id: string, comment: string) => void;
  onReject?: (id: string, comment: string) => void;
  approvalLevel: "supervisor" | "manager" | "management";
}

export function PurchaseApprovalDialog({ 
  request, 
  open, 
  onOpenChange, 
  onApprove, 
  onReject,
  approvalLevel 
}: PurchaseApprovalDialogProps) {
  const [comment, setComment] = useState("");

  const handleApprove = () => {
    if (request) {
      console.log("Approving purchase request:", request.id, "Level:", approvalLevel, comment);
      onApprove?.(request.id, comment);
      setComment("");
      onOpenChange(false);
    }
  };

  const handleReject = () => {
    if (request) {
      console.log("Rejecting purchase request:", request.id, "Level:", approvalLevel, comment);
      onReject?.(request.id, comment);
      setComment("");
      onOpenChange(false);
    }
  };

  if (!request) return null;

  const getApprovalStatus = (approval?: { approved: boolean; date: string; comment?: string }) => {
    if (!approval) return { icon: Clock, label: "Pending", className: "text-warning" };
    if (approval.approved) return { icon: CheckCircle, label: "Approved", className: "text-success" };
    return { icon: XCircle, label: "Rejected", className: "text-destructive" };
  };

  const supervisorStatus = getApprovalStatus(request.supervisorApproval);
  const managerStatus = getApprovalStatus(request.managerApproval);
  const managementStatus = getApprovalStatus(request.managementApproval);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]" data-testid="dialog-purchase-approval">
        <DialogHeader>
          <DialogTitle>Review Purchase Request</DialogTitle>
          <DialogDescription>
            Review the details and approve or reject this purchase request as {approvalLevel}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Item Name</Label>
              <p className="text-lg font-semibold" data-testid="text-purchase-item-name">{request.itemName}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Request ID</Label>
              <p className="text-lg font-mono font-medium" data-testid="text-purchase-request-id">{request.id}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Quantity</Label>
              <p className="text-base font-medium" data-testid="text-purchase-quantity">{request.quantity}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Estimated Cost</Label>
              <p className="text-base font-mono font-medium" data-testid="text-purchase-estimated-cost">₹{request.estimatedCost.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Urgency</Label>
              <Badge variant="outline" className="capitalize mt-1">{request.urgency}</Badge>
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Description</Label>
            <p className="text-sm mt-1" data-testid="text-purchase-description">{request.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Requester</Label>
              <p className="text-sm mt-1" data-testid="text-purchase-requester">{request.requester}</p>
              <p className="text-xs text-muted-foreground capitalize">{request.requesterRole.replace('-', ' ')}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Date</Label>
              <p className="text-sm mt-1" data-testid="text-purchase-date">{request.date}</p>
            </div>
            {request.vendor && (
              <div>
                <Label className="text-xs text-muted-foreground">Preferred Vendor</Label>
                <p className="text-sm mt-1" data-testid="text-purchase-vendor">{request.vendor}</p>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <Label className="text-sm font-semibold mb-3 block">Approval Workflow</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <supervisorStatus.icon className={cn("h-5 w-5", supervisorStatus.className)} />
                <div className="flex-1">
                  <p className="text-sm font-medium">Supervisor Approval</p>
                  {request.supervisorApproval?.comment && (
                    <p className="text-xs text-muted-foreground">{request.supervisorApproval.comment}</p>
                  )}
                </div>
                <span className={cn("text-sm font-medium", supervisorStatus.className)}>{supervisorStatus.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <managerStatus.icon className={cn("h-5 w-5", managerStatus.className)} />
                <div className="flex-1">
                  <p className="text-sm font-medium">Manager Approval</p>
                  {request.managerApproval?.comment && (
                    <p className="text-xs text-muted-foreground">{request.managerApproval.comment}</p>
                  )}
                </div>
                <span className={cn("text-sm font-medium", managerStatus.className)}>{managerStatus.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <managementStatus.icon className={cn("h-5 w-5", managementStatus.className)} />
                <div className="flex-1">
                  <p className="text-sm font-medium">Management Approval</p>
                  {request.managementApproval?.comment && (
                    <p className="text-xs text-muted-foreground">{request.managementApproval.comment}</p>
                  )}
                </div>
                <span className={cn("text-sm font-medium", managementStatus.className)}>{managementStatus.label}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="approval-comment">Comment (Optional)</Label>
            <Textarea
              id="approval-comment"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none"
              rows={3}
              data-testid="input-purchase-approval-comment"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleReject}
            className="bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20"
            data-testid="button-reject-purchase-request"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </Button>
          <Button
            onClick={handleApprove}
            className="bg-success border-success text-success-foreground"
            data-testid="button-approve-purchase-request"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

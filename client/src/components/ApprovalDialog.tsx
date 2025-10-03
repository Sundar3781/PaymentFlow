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
import { StatusBadge } from "./StatusBadge";
import { CheckCircle, XCircle } from "lucide-react";

interface PaymentRequest {
  id: string;
  amount: number;
  description: string;
  requester: string;
  head: string;
  group: string;
  status: string;
  date: string;
}

interface ApprovalDialogProps {
  request: PaymentRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove?: (id: string, comment: string) => void;
  onReject?: (id: string, comment: string) => void;
}

export function ApprovalDialog({ request, open, onOpenChange, onApprove, onReject }: ApprovalDialogProps) {
  const [comment, setComment] = useState("");

  const handleApprove = () => {
    if (request) {
      console.log("Approving request:", request.id, comment);
      onApprove?.(request.id, comment);
      setComment("");
      onOpenChange(false);
    }
  };

  const handleReject = () => {
    if (request) {
      console.log("Rejecting request:", request.id, comment);
      onReject?.(request.id, comment);
      setComment("");
      onOpenChange(false);
    }
  };

  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]" data-testid="dialog-approval">
        <DialogHeader>
          <DialogTitle>Review Payment Request</DialogTitle>
          <DialogDescription>
            Review the details and approve or reject this request.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Amount</Label>
              <p className="text-2xl font-bold font-mono" data-testid="text-request-amount">₹{request.amount.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Status</Label>
              <div className="mt-1">
                <StatusBadge status={request.status as any} />
              </div>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Description</Label>
            <p className="text-sm mt-1" data-testid="text-request-description">{request.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Requester</Label>
              <p className="text-sm mt-1" data-testid="text-request-requester">{request.requester}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Date</Label>
              <p className="text-sm mt-1" data-testid="text-request-date">{request.date}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Head</Label>
              <p className="text-sm mt-1 capitalize" data-testid="text-request-head">{request.head}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Group</Label>
              <p className="text-sm mt-1 capitalize" data-testid="text-request-group">{request.group}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comment (Optional)</Label>
            <Textarea
              id="comment"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none"
              rows={3}
              data-testid="input-approval-comment"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleReject}
            className="bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20"
            data-testid="button-reject-request"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </Button>
          <Button
            onClick={handleApprove}
            className="bg-success border-success text-success-foreground"
            data-testid="button-approve-request"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

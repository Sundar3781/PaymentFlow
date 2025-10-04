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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import { PurchaseRequest } from "./PurchaseRequestTable";

interface PODialogProps {
  request: PurchaseRequest | null;
  quotation?: { vendorName: string; quotedPrice: number; quotationNumber: string } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (poData: any) => void;
}

export function PODialog({ request, quotation, open, onOpenChange, onSubmit }: PODialogProps) {
  const [formData, setFormData] = useState({
    poNumber: "",
    deliveryAddress: "",
    deliveryDate: "",
    paymentTerms: "",
    specialInstructions: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (request) {
      console.log("Issuing PO:", formData, "for request:", request.id);
      onSubmit?.({ ...formData, requestId: request.id });
      setFormData({ poNumber: "", deliveryAddress: "", deliveryDate: "", paymentTerms: "", specialInstructions: "" });
      onOpenChange(false);
    }
  };

  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]" data-testid="dialog-po">
        <DialogHeader>
          <DialogTitle>Issue Purchase Order</DialogTitle>
          <DialogDescription>
            Generate purchase order for {request.itemName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="bg-muted/30 p-4 rounded-md space-y-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Item:</span>
                  <span className="ml-2 font-medium" data-testid="text-po-item">{request.itemName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="ml-2 font-medium" data-testid="text-po-quantity">{request.quantity}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Vendor:</span>
                  <span className="ml-2 font-medium" data-testid="text-po-vendor">{quotation?.vendorName || request.vendor || "N/A"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Price:</span>
                  <span className="ml-2 font-mono font-medium" data-testid="text-po-price">₹{(quotation?.quotedPrice || request.estimatedCost).toLocaleString()}</span>
                </div>
              </div>
              {quotation && (
                <div className="pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">Quotation #:</span>
                  <span className="ml-2 text-xs font-mono font-medium">{quotation.quotationNumber}</span>
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="poNumber">PO Number</Label>
              <Input
                id="poNumber"
                placeholder="PO-2024-001"
                value={formData.poNumber}
                onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
                className="font-mono"
                data-testid="input-po-number"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="deliveryAddress">Delivery Address</Label>
              <Textarea
                id="deliveryAddress"
                placeholder="Enter complete delivery address..."
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                className="resize-none"
                rows={2}
                data-testid="input-delivery-address"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="deliveryDate">Expected Delivery Date</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  data-testid="input-po-delivery-date"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Input
                  id="paymentTerms"
                  placeholder="e.g., Net 30, Advance, COD"
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                  data-testid="input-payment-terms"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
              <Textarea
                id="specialInstructions"
                placeholder="Any special handling or delivery instructions..."
                value={formData.specialInstructions}
                onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                className="resize-none"
                rows={2}
                data-testid="input-special-instructions"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel-po">
              Cancel
            </Button>
            <Button type="submit" data-testid="button-issue-po">
              <FileText className="mr-2 h-4 w-4" />
              Issue Purchase Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

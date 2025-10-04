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
import { FileText, Upload } from "lucide-react";
import { PurchaseRequest } from "./PurchaseRequestTable";

interface QuotationDialogProps {
  request: PurchaseRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (quotationData: any) => void;
}

export function QuotationDialog({ request, open, onOpenChange, onSubmit }: QuotationDialogProps) {
  const [formData, setFormData] = useState({
    vendorName: "",
    quotedPrice: "",
    deliveryTime: "",
    termsAndConditions: "",
    quotationNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (request) {
      console.log("Submitting quotation:", formData, "for request:", request.id);
      onSubmit?.({ ...formData, requestId: request.id });
      setFormData({ vendorName: "", quotedPrice: "", deliveryTime: "", termsAndConditions: "", quotationNumber: "" });
      onOpenChange(false);
    }
  };

  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]" data-testid="dialog-quotation">
        <DialogHeader>
          <DialogTitle>Add Quotation</DialogTitle>
          <DialogDescription>
            Enter quotation details for {request.itemName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="bg-muted/30 p-3 rounded-md">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Item:</span>
                  <span className="ml-2 font-medium" data-testid="text-quotation-item">{request.itemName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="ml-2 font-medium" data-testid="text-quotation-quantity">{request.quantity}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Est. Cost:</span>
                  <span className="ml-2 font-mono font-medium" data-testid="text-quotation-est-cost">₹{request.estimatedCost.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Request ID:</span>
                  <span className="ml-2 font-mono font-medium" data-testid="text-quotation-request-id">{request.id}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="quotationNumber">Quotation Number</Label>
              <Input
                id="quotationNumber"
                placeholder="QT-2024-001"
                value={formData.quotationNumber}
                onChange={(e) => setFormData({ ...formData, quotationNumber: e.target.value })}
                className="font-mono"
                data-testid="input-quotation-number"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="vendorName">Vendor Name</Label>
              <Input
                id="vendorName"
                placeholder="Enter vendor name..."
                value={formData.vendorName}
                onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                data-testid="input-quotation-vendor"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quotedPrice">Quoted Price (₹)</Label>
                <Input
                  id="quotedPrice"
                  type="number"
                  placeholder="0.00"
                  value={formData.quotedPrice}
                  onChange={(e) => setFormData({ ...formData, quotedPrice: e.target.value })}
                  className="font-mono"
                  data-testid="input-quoted-price"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deliveryTime">Delivery Time (Days)</Label>
                <Input
                  id="deliveryTime"
                  type="number"
                  placeholder="0"
                  value={formData.deliveryTime}
                  onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                  data-testid="input-delivery-time"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="termsAndConditions">Terms and Conditions</Label>
              <Textarea
                id="termsAndConditions"
                placeholder="Enter terms and conditions..."
                value={formData.termsAndConditions}
                onChange={(e) => setFormData({ ...formData, termsAndConditions: e.target.value })}
                className="resize-none"
                rows={3}
                data-testid="input-terms-conditions"
              />
            </div>

            <div className="grid gap-2">
              <Label>Quotation Document</Label>
              <div className="border-2 border-dashed rounded-md p-4 text-center hover-elevate cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload quotation document</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or image files</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel-quotation">
              Cancel
            </Button>
            <Button type="submit" data-testid="button-submit-quotation">
              <FileText className="mr-2 h-4 w-4" />
              Submit Quotation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

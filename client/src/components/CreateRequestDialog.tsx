import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface CreateRequestDialogProps {
  onSubmit?: (data: any) => void;
}

export function CreateRequestDialog({ onSubmit }: CreateRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    head: "",
    group: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating payment request:", formData);
    onSubmit?.(formData);
    setOpen(false);
    setFormData({ amount: "", description: "", head: "", group: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-create-request">
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" data-testid="dialog-create-request">
        <DialogHeader>
          <DialogTitle>Create Payment Request</DialogTitle>
          <DialogDescription>
            Fill in the details for your payment request.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="font-mono text-lg"
                data-testid="input-amount"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter payment description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="resize-none"
                rows={3}
                data-testid="input-description"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="head">Head</Label>
              <Select value={formData.head} onValueChange={(value) => setFormData({ ...formData, head: value })}>
                <SelectTrigger id="head" data-testid="select-head">
                  <SelectValue placeholder="Select head" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="group">Group</Label>
              <Select value={formData.group} onValueChange={(value) => setFormData({ ...formData, group: value })}>
                <SelectTrigger id="group" data-testid="select-group">
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team-a">Team A</SelectItem>
                  <SelectItem value="team-b">Team B</SelectItem>
                  <SelectItem value="team-c">Team C</SelectItem>
                  <SelectItem value="vendors">Vendors</SelectItem>
                  <SelectItem value="consultants">Consultants</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button type="submit" data-testid="button-submit-request">Submit Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

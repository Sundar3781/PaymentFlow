import { useState } from "react";
import { ApprovalDialog } from "../ApprovalDialog";
import { Button } from "@/components/ui/button";

export default function ApprovalDialogExample() {
  const [open, setOpen] = useState(false);
  
  const mockRequest = {
    id: "REQ-001",
    amount: 5000,
    description: "Office supplies and equipment for Q1 2024",
    requester: "John Smith",
    head: "operations",
    group: "team-a",
    status: "pending",
    date: "2024-01-15"
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Approval Dialog</Button>
      <ApprovalDialog
        request={mockRequest}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}

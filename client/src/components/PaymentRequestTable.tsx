import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Eye, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface PaymentRequest {
  id: string;
  amount: number;
  description: string;
  requester: string;
  head: string;
  group: string;
  status: "paid" | "unpaid" | "pending";
  date: string;
}

interface PaymentRequestTableProps {
  requests: PaymentRequest[];
  onViewDetails?: (request: PaymentRequest) => void;
  onMarkPaid?: (id: string) => void;
  onMarkUnpaid?: (id: string) => void;
}

export function PaymentRequestTable({ requests, onViewDetails, onMarkPaid, onMarkUnpaid }: PaymentRequestTableProps) {
  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Requester</TableHead>
            <TableHead>Head</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                No payment requests found
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id} className="hover-elevate" data-testid={`row-request-${request.id}`}>
                <TableCell className="font-mono font-medium" data-testid="text-request-id">{request.id}</TableCell>
                <TableCell className="max-w-[300px] truncate" data-testid="text-request-description">{request.description}</TableCell>
                <TableCell className="text-right font-mono" data-testid="text-request-amount">${request.amount.toLocaleString()}</TableCell>
                <TableCell data-testid="text-request-requester">{request.requester}</TableCell>
                <TableCell className="capitalize" data-testid="text-request-head">{request.head}</TableCell>
                <TableCell>
                  <StatusBadge status={request.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onViewDetails?.(request)}
                      data-testid={`button-view-${request.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" data-testid={`button-actions-${request.id}`}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onMarkPaid?.(request.id)} data-testid="action-mark-paid">
                          Mark as Paid
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onMarkUnpaid?.(request.id)} data-testid="action-mark-unpaid">
                          Mark as Unpaid
                        </DropdownMenuItem>
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

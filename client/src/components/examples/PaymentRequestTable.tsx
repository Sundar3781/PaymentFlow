import { PaymentRequestTable } from "../PaymentRequestTable";

export default function PaymentRequestTableExample() {
  const mockRequests = [
    {
      id: "REQ-001",
      amount: 5000,
      description: "Office supplies and equipment for Q1 2024",
      requester: "John Smith",
      head: "operations",
      group: "team-a",
      status: "pending" as const,
      date: "2024-01-15"
    },
    {
      id: "REQ-002",
      amount: 12500,
      description: "Marketing campaign budget",
      requester: "Sarah Johnson",
      head: "marketing",
      group: "team-b",
      status: "paid" as const,
      date: "2024-01-14"
    },
    {
      id: "REQ-003",
      amount: 3200,
      description: "Software licenses renewal",
      requester: "Mike Chen",
      head: "it",
      group: "team-c",
      status: "unpaid" as const,
      date: "2024-01-13"
    }
  ];

  return <PaymentRequestTable requests={mockRequests} />;
}

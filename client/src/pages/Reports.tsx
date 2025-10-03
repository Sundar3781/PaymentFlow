import { ReportFilters } from "@/components/ReportFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";

export default function Reports() {
  //todo: remove mock functionality
  const reportData = [
    {
      category: "Wages",
      totalRequests: 45,
      totalAmount: 450000,
      paid: 320000,
      unpaid: 80000,
      pending: 50000
    },
    {
      category: "Salaries",
      totalRequests: 12,
      totalAmount: 1440000,
      paid: 1200000,
      unpaid: 120000,
      pending: 120000
    },
    {
      category: "Fuel",
      totalRequests: 28,
      totalAmount: 180000,
      paid: 120000,
      unpaid: 35000,
      pending: 25000
    },
    {
      category: "Materials",
      totalRequests: 35,
      totalAmount: 525000,
      paid: 350000,
      unpaid: 125000,
      pending: 50000
    },
    {
      category: "Fertiliser",
      totalRequests: 18,
      totalAmount: 270000,
      paid: 180000,
      unpaid: 60000,
      pending: 30000
    },
    {
      category: "Equipment Rental",
      totalRequests: 22,
      totalAmount: 330000,
      paid: 220000,
      unpaid: 70000,
      pending: 40000
    },
    {
      category: "Purchases",
      totalRequests: 40,
      totalAmount: 600000,
      paid: 400000,
      unpaid: 150000,
      pending: 50000
    },
    {
      category: "Petty Cash",
      totalRequests: 65,
      totalAmount: 195000,
      paid: 130000,
      unpaid: 45000,
      pending: 20000
    },
    {
      category: "Miscellaneous",
      totalRequests: 25,
      totalAmount: 125000,
      paid: 80000,
      unpaid: 30000,
      pending: 15000
    }
  ];

  const totalAmount = reportData.reduce((sum, item) => sum + item.totalAmount, 0);
  const totalPaid = reportData.reduce((sum, item) => sum + item.paid, 0);
  const totalUnpaid = reportData.reduce((sum, item) => sum + item.unpaid, 0);
  const totalPending = reportData.reduce((sum, item) => sum + item.pending, 0);

  const handleExport = () => {
    console.log("Exporting report to CSV...");
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Category,Total Requests,Total Amount,Paid,Unpaid,Pending\n"
      + reportData.map(row => 
          `${row.category},${row.totalRequests},${row.totalAmount},${row.paid},${row.unpaid},${row.pending}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payment_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" data-testid="heading-reports">Reports</h1>
        <p className="text-muted-foreground mt-1">Generate comprehensive payment reports by head and group</p>
      </div>

      <ReportFilters onExport={handleExport} />

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono" data-testid="text-total-amount">₹{totalAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-success" data-testid="text-total-paid">₹{totalPaid.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Unpaid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-destructive" data-testid="text-total-unpaid">₹{totalUnpaid.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-warning" data-testid="text-total-pending">₹{totalPending.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold" data-testid="heading-report-breakdown">Report Breakdown by Head</h2>
        <div className="rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Total Requests</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead className="text-right">Paid</TableHead>
                <TableHead className="text-right">Unpaid</TableHead>
                <TableHead className="text-right">Pending</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((row) => (
                <TableRow key={row.category} className="hover-elevate" data-testid={`row-report-${row.category.toLowerCase()}`}>
                  <TableCell className="font-medium">{row.category}</TableCell>
                  <TableCell className="text-right">{row.totalRequests}</TableCell>
                  <TableCell className="text-right font-mono">₹{row.totalAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono text-success">₹{row.paid.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono text-destructive">₹{row.unpaid.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono text-warning">₹{row.pending.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              <TableRow className="font-semibold bg-muted/30">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">{reportData.reduce((sum, row) => sum + row.totalRequests, 0)}</TableCell>
                <TableCell className="text-right font-mono">₹{totalAmount.toLocaleString()}</TableCell>
                <TableCell className="text-right font-mono text-success">₹{totalPaid.toLocaleString()}</TableCell>
                <TableCell className="text-right font-mono text-destructive">₹{totalUnpaid.toLocaleString()}</TableCell>
                <TableCell className="text-right font-mono text-warning">₹{totalPending.toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

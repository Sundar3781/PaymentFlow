import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "@/pages/Dashboard";
import Requests from "@/pages/Requests";
import Approvals from "@/pages/Approvals";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import PurchaseDashboard from "@/pages/purchases/PurchaseDashboard";
import PurchaseRequests from "@/pages/purchases/PurchaseRequests";
import PurchaseApprovals from "@/pages/purchases/PurchaseApprovals";
import Quotations from "@/pages/purchases/Quotations";
import PurchaseOrders from "@/pages/purchases/PurchaseOrders";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/requests" component={Requests} />
      <Route path="/approvals" component={Approvals} />
      <Route path="/reports" component={Reports} />
      <Route path="/settings" component={Settings} />
      <Route path="/purchases" component={PurchaseDashboard} />
      <Route path="/purchases/requests" component={PurchaseRequests} />
      <Route path="/purchases/approvals" component={PurchaseApprovals} />
      <Route path="/purchases/quotations" component={Quotations} />
      <Route path="/purchases/orders" component={PurchaseOrders} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center gap-2 border-b border-border px-6 py-3">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <div className="flex-1" />
              </header>
              <main className="flex-1 overflow-auto">
                <div className="container mx-auto p-6 max-w-7xl">
                  <Router />
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

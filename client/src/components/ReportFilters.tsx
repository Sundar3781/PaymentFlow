import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Download, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

interface ReportFiltersProps {
  onFilterChange?: (filters: any) => void;
  onExport?: () => void;
}

export function ReportFilters({ onFilterChange, onExport }: ReportFiltersProps) {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [groupBy, setGroupBy] = useState("");
  const [head, setHead] = useState("");
  const [group, setGroup] = useState("");

  const handleApplyFilters = () => {
    const filters = { dateFrom, dateTo, groupBy, head, group };
    console.log("Applying filters:", filters);
    onFilterChange?.(filters);
  };

  const handleReset = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setGroupBy("");
    setHead("");
    setGroup("");
    onFilterChange?.({});
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-2">
          <Label>From Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateFrom && "text-muted-foreground"
                )}
                data-testid="button-date-from"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFrom ? format(dateFrom, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFrom}
                onSelect={setDateFrom}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>To Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateTo && "text-muted-foreground"
                )}
                data-testid="button-date-to"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateTo ? format(dateTo, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateTo}
                onSelect={setDateTo}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>Group By</Label>
          <Select value={groupBy} onValueChange={setGroupBy}>
            <SelectTrigger data-testid="select-group-by">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="head">Head</SelectItem>
              <SelectItem value="group">Group</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Head</Label>
          <Select value={head} onValueChange={setHead}>
            <SelectTrigger data-testid="select-filter-head">
              <SelectValue placeholder="All Heads" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Heads</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Group</Label>
          <Select value={group} onValueChange={setGroup}>
            <SelectTrigger data-testid="select-filter-group">
              <SelectValue placeholder="All Groups" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              <SelectItem value="team-a">Team A</SelectItem>
              <SelectItem value="team-b">Team B</SelectItem>
              <SelectItem value="team-c">Team C</SelectItem>
              <SelectItem value="vendors">Vendors</SelectItem>
              <SelectItem value="consultants">Consultants</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleApplyFilters} data-testid="button-apply-filters">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={handleReset} data-testid="button-reset-filters">
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button variant="outline" onClick={onExport} className="ml-auto" data-testid="button-export-csv">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>
    </div>
  );
}

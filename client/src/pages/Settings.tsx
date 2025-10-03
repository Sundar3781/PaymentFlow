import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" data-testid="heading-settings">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your application preferences</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the application looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <div>
                  <Label htmlFor="dark-mode" className="text-sm font-medium">Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">Toggle between light and dark theme</p>
                </div>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
                data-testid="switch-dark-mode"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="text-sm font-medium">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive email updates for new requests</p>
              </div>
              <Switch id="email-notifications" data-testid="switch-email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="approval-alerts" className="text-sm font-medium">Approval Alerts</Label>
                <p className="text-xs text-muted-foreground">Get notified when approval is needed</p>
              </div>
              <Switch id="approval-alerts" defaultChecked data-testid="switch-approval-alerts" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Admin User" data-testid="input-profile-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="admin@company.com" data-testid="input-profile-email" />
            </div>
            <Button data-testid="button-save-profile">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" data-testid="button-clear-data">Clear All Data</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

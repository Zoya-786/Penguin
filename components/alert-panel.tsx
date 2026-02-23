"use client";

import { useAlerts } from "@/hooks/use-alerts";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AlertPanel() {
  const { alerts } = useAlerts();

  return (
    <div className="flex flex-col h-full border-l bg-card">
      <div className="p-4 border-b">
        <h2 className="font-semibold">System Alerts</h2>
      </div>
      <ScrollArea className="flex-1">
        {alerts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">
            All systems nominal.
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 border-b transition-colors ${
                alert.severity === "Critical" ? "bg-destructive/10" : ""
              }`}
            >
              <div className="flex gap-3">
                {alert.severity === "Critical" ? (
                  <AlertCircle className="h-5 w-5 text-destructive" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-blue-500" />
                )}
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );
}
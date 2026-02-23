"use client";

import { useTanks } from "@/hooks/use-tanks";
import { TankCard } from "@/components/tank-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const { tanks, loading, error } = useTanks();

  if (loading) {
    return (
      <div className="p-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[280px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            Unable to connect to the habitat live-feed. Please check your internet connection.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Habitat Monitor</h1>
          <p className="text-muted-foreground text-sm">Real-time status of all penguin enclosures</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-green-500 animate-pulse">
          <RefreshCw className="h-3 w-3" />
          Live Connection Active
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tanks.length === 0 ? (
          <p className="col-span-full text-center py-10 text-muted-foreground">
            No tanks found. Add one in your Firebase console to get started.
          </p>
        ) : (
          tanks.map((tank) => (
            <TankCard key={tank.id} tank={tank} />
          ))
        )}
      </div>
    </div>
  );
}
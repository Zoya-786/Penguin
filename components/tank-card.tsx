"use client";

import { TankData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { Droplets, Activity, Waves } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TankCardProps {
  tank: TankData;
}

export function TankCard({ tank }: TankCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{tank.name}</CardTitle>
        <StatusBadge status={tank.status} />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tank Level Display */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Water Level</span>
            <span className="font-medium">{tank.tankLevel}%</span>
          </div>
          <Progress value={tank.tankLevel} className="h-2" />
        </div>

        {/* Real-time Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Activity className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">pH Level</p>
              <p className="text-sm font-semibold">{tank.ph.toFixed(1)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Waves className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">TDS</p>
              <p className="text-sm font-semibold">{tank.tds} ppm</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
              <Droplets className="h-4 w-4 text-cyan-600" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">Turbidity</p>
              <p className="text-sm font-semibold">{tank.turbidity} NTU</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
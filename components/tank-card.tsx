"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Thermometer, Activity, Waves, Gauge } from "lucide-react";

export function TankCard({ tank }: { tank: any }) {
  return (
    <Card className="bg-[#0a0a0a] border-white/10 overflow-hidden border-t-2 border-t-primary">
      <CardHeader className="bg-white/[0.02] py-3">
        <CardTitle className="text-sm font-mono text-primary uppercase tracking-widest flex justify-between">
          {tank.location?.replace('_', ' ')}
          <span className="animate-pulse text-[10px] text-emerald-500">● LIVE</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {/* Main Grid for 4 Primary Sensors */}
        <div className="grid grid-cols-2 gap-4">
          <Metric icon={<Droplets size={14}/>} label="pH" value={tank.ph} unit="" />
          <Metric icon={<Activity size={14}/>} label="TDS" value={tank.tds} unit="ppm" />
          <Metric icon={<Waves size={14}/>} label="Turb" value={tank.turbidity} unit="ntu" />
          <Metric icon={<Thermometer size={14}/>} label="Temp" value={tank.temperature} unit="°C" />
        </div>

        {/* Tank Level Progress Bar */}
        <div className="pt-2 border-t border-white/5">
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
            <span className="flex items-center gap-1"><Gauge size={10}/> CAPACITY</span>
            <span>{tank.tankLevel}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000" 
              style={{ width: `${tank.tankLevel}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Metric({ icon, label, value, unit }: any) {
  return (
    <div className="bg-white/[0.03] p-2 rounded border border-white/5">
      <div className="flex items-center gap-1 text-[9px] text-muted-foreground uppercase font-mono mb-1">
        {icon} {label}
      </div>
      <div className="text-lg font-black text-white leading-none">
        {value} <span className="text-[10px] font-normal text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}
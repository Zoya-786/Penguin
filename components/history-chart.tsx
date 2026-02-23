"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// This is the "Named Export" your dashboard is looking for
export function HistoryChart({ data }: { data: any[] }) {
  // Handle case where no data has arrived from Firebase yet
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] w-full bg-white/[0.02] border border-white/10 rounded-xl flex items-center justify-center">
        <p className="text-white/20 font-mono text-xs animate-pulse">
          WAITING_FOR_SIMULATOR_STREAMING...
        </p>
      </div>
    );
  }

  return (
    <div className="h-[350px] w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">
          Temporal Analysis // Shushobhita_Node
        </h3>
        <span className="text-[9px] text-white/30 font-mono uppercase">
          Unit: Real-time (5s Interval)
        </span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#444" 
            fontSize={10} 
            tickMargin={10}
            axisLine={false}
          />
          <YAxis 
            stroke="#444" 
            fontSize={10} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#050505",
              border: "1px solid #10b981",
              borderRadius: "8px",
              fontSize: "12px",
              fontFamily: "monospace",
            }}
            itemStyle={{ color: "#10b981" }}
            cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          {/* pH Line (Emerald) */}
          <Line
            type="monotone"
            dataKey="ph"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 2, fill: "#10b981" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            name="pH Level"
            animationDuration={500}
          />
          {/* Temperature Line (Blue) */}
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Temp °C"
          />
          {/* Tank Level (Amber) */}
          <Line
            type="monotone"
            dataKey="tankLevel"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={false}
            name="Fill %"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
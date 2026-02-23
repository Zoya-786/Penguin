"use client"

import { cn } from "@/lib/utils"
import type { Status } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MetricCardProps {
  label: string
  value: number
  unit: string
  safeMin: number
  safeMax: number
  status: Status
  trend?: "up" | "down" | "stable"
  showGauge?: boolean
}

export function MetricCard({
  label,
  value,
  unit,
  safeMin,
  safeMax,
  status,
  trend = "stable",
  showGauge = false,
}: MetricCardProps) {
  const percentage = Math.min(
    100,
    Math.max(0, ((value - safeMin) / (safeMax - safeMin)) * 100)
  )

  const gaugeAngle = (percentage / 100) * 270 - 135

  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-lg rounded-2xl",
        status === "Critical" && "animate-pulse-glow border-critical"
      )}
    >
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">{value}</span>
              <span className="text-sm text-muted-foreground">{unit}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {trend === "up" && (
              <TrendingUp className={cn("h-4 w-4", status === "Critical" ? "text-critical" : "text-safe")} />
            )}
            {trend === "down" && (
              <TrendingDown className={cn("h-4 w-4", status === "Critical" ? "text-critical" : "text-muted-foreground")} />
            )}
            {trend === "stable" && <Minus className="h-4 w-4 text-muted-foreground" />}
          </div>
        </div>

        {showGauge ? (
          <div className="mt-4 flex justify-center">
            <svg width="100" height="70" viewBox="0 0 100 70">
              <path
                d="M 10 65 A 40 40 0 1 1 90 65"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-muted/50"
                strokeLinecap="round"
              />
              <path
                d="M 10 65 A 40 40 0 1 1 90 65"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className={cn(
                  status === "Safe" && "text-safe",
                  status === "Warning" && "text-warning",
                  status === "Critical" && "text-critical"
                )}
                strokeLinecap="round"
                strokeDasharray={`${(percentage / 100) * 220} 220`}
              />
              <line
                x1="50"
                y1="65"
                x2={50 + 30 * Math.cos((gaugeAngle * Math.PI) / 180)}
                y2={65 + 30 * Math.sin((gaugeAngle * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="2"
                className="text-foreground"
                strokeLinecap="round"
              />
              <circle cx="50" cy="65" r="3" fill="currentColor" className="text-foreground" />
            </svg>
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{safeMin}{unit}</span>
              <span>{safeMax}{unit}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  status === "Safe" && "bg-safe",
                  status === "Warning" && "bg-warning",
                  status === "Critical" && "bg-critical"
                )}
                style={{ width: `${Math.min(100, percentage)}%` }}
              />
            </div>
          </div>
        )}

        <p className="mt-2 text-xs text-muted-foreground">
          Safe range: {safeMin} - {safeMax} {unit}
        </p>
      </CardContent>
    </Card>
  )
}

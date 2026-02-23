"use client"

import { cn } from "@/lib/utils"
import type { Status } from "@/lib/types"

export function StatusBadge({
  status,
  className,
}: {
  status: Status
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all duration-300",
        status === "Safe" && "bg-safe text-safe-foreground",
        status === "Warning" && "bg-warning text-warning-foreground",
        status === "Critical" && "bg-critical text-critical-foreground animate-pulse",
        className
      )}
    >
      <span
        className={cn(
          "mr-1.5 h-1.5 w-1.5 rounded-full",
          status === "Safe" && "bg-safe-foreground",
          status === "Warning" && "bg-warning-foreground",
          status === "Critical" && "bg-critical-foreground"
        )}
      />
      {status}
    </span>
  )
}

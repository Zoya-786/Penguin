import { NextRequest, NextResponse } from "next/server"
import { getHistory } from "@/lib/db"
import type { TimeRange } from "@/lib/types"

const validRanges = new Set<TimeRange>(["24h", "7d", "30d"])

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = (searchParams.get("range") ?? "24h") as TimeRange

    if (!validRanges.has(range)) {
      return NextResponse.json(
        { data: null, error: "Invalid range. Use 24h, 7d, or 30d." },
        { status: 400 }
      )
    }

    const data = await getHistory(range)
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json(
      { data: null, error: "Failed to fetch history" },
      { status: 500 }
    )
  }
}

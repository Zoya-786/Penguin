import { NextRequest, NextResponse } from "next/server"
import { getSettings, updateSettings } from "@/lib/db"
import type { SettingsData } from "@/lib/types"

export async function GET() {
  try {
    const settings = await getSettings()
    return NextResponse.json({ data: settings })
  } catch {
    return NextResponse.json(
      { data: null, error: "Failed to fetch settings" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as SettingsData
    const updated = await updateSettings(body)
    return NextResponse.json({ data: updated })
  } catch {
    return NextResponse.json(
      { data: null, error: "Failed to update settings" },
      { status: 500 }
    )
  }
}

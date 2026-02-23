export type Status = "Safe" | "Warning" | "Critical"

export interface SensorReading {
  ph: number
  turbidity: number
  tds: number
  temperature: number
  tankLevel: number
  status: Status
}

export interface TankData {
  id: string
  name: string
  type: "overhead" | "underground" | "tap" | "drum"
  ph: number
  turbidity: number
  tds: number
  status: Status
  tankLevel: number
}

export interface Alert {
  id: string
  message: string
  severity: Status
  timestamp: string
  smsSent: boolean
  acknowledged: boolean
  source: string
}

export interface HistoricalDataPoint {
  time: string
  ph: number
  turbidity: number
  tds: number
}

export const currentReading: SensorReading = {
  ph: 7.2,
  turbidity: 3,
  tds: 350,
  temperature: 26,
  tankLevel: 78,
  status: "Safe",
}

export const tanks: TankData[] = [
  {
    id: "overhead",
    name: "Overhead Tank",
    type: "overhead",
    ph: 7.2,
    turbidity: 3,
    tds: 350,
    status: "Safe",
    tankLevel: 78,
  },
  {
    id: "underground",
    name: "Underground Tank",
    type: "underground",
    ph: 6.8,
    turbidity: 5.2,
    tds: 480,
    status: "Warning",
    tankLevel: 62,
  },
  {
    id: "kitchen",
    name: "Kitchen Tap",
    type: "tap",
    ph: 7.4,
    turbidity: 1.5,
    tds: 290,
    status: "Safe",
    tankLevel: 100,
  },
  {
    id: "drum",
    name: "Storage Drum",
    type: "drum",
    ph: 5.8,
    turbidity: 8.1,
    tds: 620,
    status: "Critical",
    tankLevel: 45,
  },
]

export const alerts: Alert[] = [
  {
    id: "1",
    message: "Storage Drum pH level critically low (5.8)",
    severity: "Critical",
    timestamp: "2026-02-23T10:30:00",
    smsSent: true,
    acknowledged: false,
    source: "Storage Drum",
  },
  {
    id: "2",
    message: "Underground Tank TDS exceeds safe limit (480 ppm)",
    severity: "Warning",
    timestamp: "2026-02-23T10:15:00",
    smsSent: true,
    acknowledged: false,
    source: "Underground Tank",
  },
  {
    id: "3",
    message: "Storage Drum turbidity high (8.1 NTU)",
    severity: "Critical",
    timestamp: "2026-02-23T10:05:00",
    smsSent: true,
    acknowledged: true,
    source: "Storage Drum",
  },
  {
    id: "4",
    message: "Underground Tank turbidity elevated (5.2 NTU)",
    severity: "Warning",
    timestamp: "2026-02-23T09:45:00",
    smsSent: false,
    acknowledged: true,
    source: "Underground Tank",
  },
  {
    id: "5",
    message: "System routine check completed - All sensors online",
    severity: "Safe",
    timestamp: "2026-02-23T09:00:00",
    smsSent: false,
    acknowledged: true,
    source: "System",
  },
]

function generateHistorical(hours: number): HistoricalDataPoint[] {
  const data: HistoricalDataPoint[] = []
  const now = new Date()
  const pointCount = hours <= 24 ? 24 : hours <= 168 ? 7 * 12 : 30 * 6

  for (let i = pointCount; i >= 0; i--) {
    const time = new Date(now.getTime() - (i * hours * 3600000) / pointCount)
    data.push({
      time:
        hours <= 24
          ? time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : time.toLocaleDateString([], { month: "short", day: "numeric" }),
      ph: +(6.5 + Math.random() * 1.5).toFixed(1),
      turbidity: +(1 + Math.random() * 7).toFixed(1),
      tds: +(200 + Math.random() * 400).toFixed(0),
    })
  }
  return data
}

export const historicalData = {
  "24h": generateHistorical(24),
  "7d": generateHistorical(168),
  "30d": generateHistorical(720),
}

export const safeRanges = {
  ph: { min: 6.5, max: 8.5, unit: "" },
  turbidity: { min: 0, max: 5, unit: "NTU" },
  tds: { min: 0, max: 500, unit: "ppm" },
  temperature: { min: 10, max: 35, unit: "°C" },
  tankLevel: { min: 20, max: 100, unit: "%" },
}

export type Status = "Safe" | "Warning" | "Critical"

export type TimeRange = "24h" | "7d" | "30d"

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

export interface SafeRanges {
  ph: { min: number; max: number; unit: string }
  turbidity: { min: number; max: number; unit: string }
  tds: { min: number; max: number; unit: string }
  temperature: { min: number; max: number; unit: string }
  tankLevel: { min: number; max: number; unit: string }
}

export interface SettingsData {
  safeRanges: {
    phMin: number
    phMax: number
    tdsLimit: number
    turbidityThreshold: number
  }
  smsEnabled: boolean
  phoneNumber: string
  offlineMode: boolean
}

export interface ApiResponse<T> {
  data: T
  error?: string
}

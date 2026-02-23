import useSWR from "swr"
import type { SensorReading, SafeRanges, ApiResponse } from "@/lib/types"

interface SensorsPayload {
  reading: SensorReading
  safeRanges: SafeRanges
}

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((json: ApiResponse<SensorsPayload>) => {
      if (json.error) throw new Error(json.error)
      return json.data
    })

export function useSensors(pollIntervalMs = 3000) {
  const { data, error, isLoading } = useSWR<SensorsPayload>(
    "/api/sensors",
    fetcher,
    {
      refreshInterval: pollIntervalMs,
      dedupingInterval: 1000,
    }
  )

  return {
    reading: data?.reading ?? null,
    safeRanges: data?.safeRanges ?? null,
    isLoading,
    error: error as Error | undefined,
  }
}

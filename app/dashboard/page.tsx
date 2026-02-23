"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import { MetricCard } from "@/components/metric-card"
import { TankCard } from "@/components/tank-card"
import { AlertPanel } from "@/components/alert-panel"
import {
  currentReading as initialReading,
  tanks as initialTanks,
  alerts,
  safeRanges,
  type SensorReading,
  type TankData,
  type Status,
} from "@/lib/sensor-data"
import { Wifi, WifiOff, Clock, Shield, User, RefreshCw, ShieldCheck } from "lucide-react"

// Realtime Database Imports
import { rtdb } from "@/lib/db"
import { ref, onValue } from "firebase/database"

function getStatus(reading: any): Status {
  if (
    reading.ph < safeRanges.ph.min ||
    reading.ph > safeRanges.ph.max ||
    reading.turbidity > safeRanges.turbidity.max ||
    reading.tds > safeRanges.tds.max
  ) {
    return "Critical"
  }
  if (
    reading.ph < safeRanges.ph.min + 0.5 ||
    reading.ph > safeRanges.ph.max - 0.5 ||
    reading.turbidity > safeRanges.turbidity.max * 0.8 ||
    reading.tds > safeRanges.tds.max * 0.8
  ) {
    return "Warning"
  }
  return "Safe"
}

export default function DashboardPage() {
  const [reading, setReading] = useState<SensorReading>(initialReading)
  const [tanks, setTanks] = useState<TankData[]>(initialTanks)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // 1. Reference the 'water' node your ESP32 writes to
    const waterRef = ref(rtdb, "water")

    // 2. Real-time listener
    const unsubscribe = onValue(waterRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setIsOnline(true)
        setLastUpdated(new Date())

        // Get the first available tank node (e.g., Overhead_Tank)
        const nodeKeys = Object.keys(data)
        const primaryNode = data[nodeKeys[0]]
        
        const newReading: SensorReading = {
          ph: Number(primaryNode.ph || 7),
          turbidity: Number(primaryNode.turbidity || 0),
          tds: Number(primaryNode.tds || 0),
          temperature: Number(primaryNode.temperature || 25),
          tankLevel: Number(primaryNode.tankLevel || 0),
          status: "Safe"
        }
        newReading.status = getStatus(newReading)

        // Toast on Critical switch
        if (newReading.status === "Critical" && reading.status !== "Critical") {
          toast.error("Critical quality detected on hardware!")
        }

        setReading(newReading)

        // Map all hardware nodes to the Tank Cards
        const updatedTanks = nodeKeys.map((key) => ({
          id: key,
          name: key.replace("_", " "),
          ph: Number(data[key].ph),
          turbidity: Number(data[key].turbidity),
          tds: Number(data[key].tds),
          temperature: Number(data[key].temperature),
          tankLevel: Number(data[key].tankLevel),
          status: getStatus(data[key])
        }))
        setTanks(updatedTanks as TankData[])
      }
    }, (error) => {
      console.error(error)
      setIsOnline(false)
    })

    return () => unsubscribe()
  }, [reading.status])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Light Scheme Double Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                <User size={24} className="text-emerald-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">Shushobhita</h1>
                <p className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">Hardware_Link: Active</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
              <RefreshCw className="h-3 w-3 animate-spin" style={{ animationDuration: '4s' }} />
              Live Feed Connected
            </div>
          </div>
          
          <div className="h-px bg-slate-100 w-full" />
          
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-800 uppercase">Habitat Monitor</h2>
            <p className="text-slate-500 text-sm">Real-time status of connected penguin enclosures</p>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-8 py-8">
        {/* System Summary Row */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card className="rounded-2xl bg-white border-slate-200">
            <CardContent className="flex items-center gap-3 pt-6">
              <Shield className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">System Status</p>
                <StatusBadge status={reading.status} className="mt-1" />
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl bg-white border-slate-200">
            <CardContent className="flex items-center gap-3 pt-6">
              <Clock className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">Last Synced</p>
                <p className="text-sm font-medium">{lastUpdated ? lastUpdated.toLocaleTimeString() : "--:--:--"}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl bg-white border-slate-200">
            <CardContent className="flex items-center gap-3 pt-6">
              {isOnline ? <Wifi className="h-5 w-5 text-emerald-500" /> : <WifiOff className="h-5 w-5 text-red-500" />}
              <div>
                <p className="text-sm text-slate-500">Network</p>
                <p className="text-sm font-medium">{isOnline ? "Online" : "Offline"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Water Metrics */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-800">Water Quality Metrics</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <MetricCard label="pH Level" value={reading.ph} unit="" safeMin={safeRanges.ph.min} safeMax={safeRanges.ph.max} status={reading.status} trend="stable" showGauge />
            <MetricCard label="Turbidity" value={reading.turbidity} unit="NTU" safeMin={0} safeMax={5} status={reading.status} trend="stable" />
            <MetricCard label="TDS" value={reading.tds} unit="ppm" safeMin={0} safeMax={500} status={reading.status} trend="stable" />
            <MetricCard label="Temperature" value={reading.temperature} unit="°C" safeMin={20} safeMax={30} status="Safe" trend="stable" />
            <MetricCard label="Tank Level" value={reading.tankLevel} unit="%" safeMin={20} safeMax={100} status={reading.tankLevel < 20 ? "Critical" : "Safe"} trend="stable" />
          </div>
        </section>

        {/* Individual Enclosure Cards */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-800">Hardware Nodes</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tanks.map((tank) => (
              <TankCard key={tank.id} tank={tank} />
            ))}
          </div>
        </section>

        {/* Global Alerts */}
        <AlertPanel initialAlerts={alerts} />
      </main>
    </div>
  )
}
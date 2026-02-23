"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings as SettingsIcon, Save, Sliders, MessageSquare, WifiOff } from "lucide-react"

export default function SettingsPage() {
  const [phMin, setPhMin] = useState("6.5")
  const [phMax, setPhMax] = useState("8.5")
  const [tdsLimit, setTdsLimit] = useState("500")
  const [turbidityThreshold, setTurbidityThreshold] = useState("5")
  const [smsEnabled, setSmsEnabled] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState("+91 98765 43210")
  const [offlineMode, setOfflineMode] = useState(false)

  function handleSave() {
    toast.success("Settings saved successfully!", {
      description: "Your monitoring thresholds have been updated.",
    })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-foreground">
          <SettingsIcon className="h-7 w-7 text-primary" />
          Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Configure safe ranges, alerts, and connectivity options
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Safe Ranges */}
        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sliders className="h-5 w-5 text-primary" />
              <CardTitle>Safe Ranges</CardTitle>
            </div>
            <CardDescription>
              Set the thresholds for water quality parameters. Readings outside
              these ranges will trigger alerts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="ph-min">pH Minimum</Label>
                <Input
                  id="ph-min"
                  type="number"
                  step="0.1"
                  value={phMin}
                  onChange={(e) => setPhMin(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="ph-max">pH Maximum</Label>
                <Input
                  id="ph-max"
                  type="number"
                  step="0.1"
                  value={phMax}
                  onChange={(e) => setPhMax(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="tds-limit">TDS Limit (ppm)</Label>
                <Input
                  id="tds-limit"
                  type="number"
                  value={tdsLimit}
                  onChange={(e) => setTdsLimit(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="turbidity-threshold">
                  Turbidity Threshold (NTU)
                </Label>
                <Input
                  id="turbidity-threshold"
                  type="number"
                  step="0.1"
                  value={turbidityThreshold}
                  onChange={(e) => setTurbidityThreshold(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SMS Alerts */}
        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <CardTitle>SMS Alerts</CardTitle>
            </div>
            <CardDescription>
              Configure SMS notifications for critical water quality events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Enable SMS Alerts
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Receive text messages when water quality drops below safe
                    levels
                  </p>
                </div>
                <Switch
                  checked={smsEnabled}
                  onCheckedChange={setSmsEnabled}
                  aria-label="Toggle SMS alerts"
                />
              </div>
              {smsEnabled && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Offline Mode */}
        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <WifiOff className="h-5 w-5 text-primary" />
              <CardTitle>Connectivity</CardTitle>
            </div>
            <CardDescription>
              Configure how the system behaves in areas with limited internet access.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Offline Mode
                </p>
                <p className="text-xs text-muted-foreground">
                  Store readings locally and sync when connection is restored
                </p>
              </div>
              <Switch
                checked={offlineMode}
                onCheckedChange={setOfflineMode}
                aria-label="Toggle offline mode"
              />
            </div>
          </CardContent>
        </Card>

        <Button
          size="lg"
          className="w-full rounded-xl"
          onClick={handleSave}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}

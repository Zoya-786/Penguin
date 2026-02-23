import { Droplets } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Droplets className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">AquaGuard</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Smart Household Tank & Tap Water Quality Monitoring System
          </p>
          <p className="text-xs text-muted-foreground">
            Built for safe water, everywhere.
          </p>
        </div>
      </div>
    </footer>
  )
}

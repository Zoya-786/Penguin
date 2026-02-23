import { Card, CardContent } from "@/components/ui/card"
import { Activity, Radio, MessageSquare, WifiOff } from "lucide-react"

const features = [
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description:
      "Track pH, turbidity, TDS, temperature, and tank levels with live sensor data updated every second.",
  },
  {
    icon: Radio,
    title: "Multi-Source Detection",
    description:
      "Monitor overhead tanks, underground tanks, kitchen taps, and storage containers simultaneously.",
  },
  {
    icon: MessageSquare,
    title: "SMS Alerts",
    description:
      "Receive instant SMS notifications when water quality drops below safe thresholds, no internet needed.",
  },
  {
    icon: WifiOff,
    title: "Rural Offline Support",
    description:
      "Works in areas with limited connectivity. Stores data locally and syncs when connection is restored.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Everything you need for safe water
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground leading-relaxed">
            Our sensor system continuously monitors all your water sources and keeps
            you informed about quality and safety.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { Cpu, BarChart3, Bell } from "lucide-react"

const steps = [
  {
    icon: Cpu,
    step: "01",
    title: "Sensors Collect Data",
    description:
      "IoT sensors placed in your tanks and taps measure pH, turbidity, TDS, and temperature continuously.",
  },
  {
    icon: BarChart3,
    step: "02",
    title: "Data is Analyzed",
    description:
      "Our system processes sensor readings in real time and compares them against safe water quality standards.",
  },
  {
    icon: Bell,
    step: "03",
    title: "Alerts are Sent",
    description:
      "If contamination is detected, instant alerts are pushed to your dashboard and via SMS to your phone.",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-muted/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground leading-relaxed">
            Three simple steps to ensure your household water is always safe.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.step} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="h-8 w-8" />
                </div>
                <span className="mt-4 block text-sm font-bold text-primary">
                  Step {step.step}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

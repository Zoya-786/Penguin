import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="relative">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <Footer />
    </div>
  )
}

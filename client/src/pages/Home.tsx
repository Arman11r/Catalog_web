import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import FeatureShowcase from "@/components/FeatureShowcase"
import PricingCalculator from "@/components/PricingCalculator"
import ContactForm from "@/components/ContactForm"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeatureShowcase />
      <PricingCalculator />
      <ContactForm />
      
      {/* Footer */}
      <footer className="bg-card py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <h3 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Pacifico, cursive' }}>
                CafeCanvas
              </h3>
            </div>
            <div className="text-center md:text-right">
              <p className="text-muted-foreground text-sm">
                Transform your restaurant with our digital solutions
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                © 2024 CafeCanvas. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
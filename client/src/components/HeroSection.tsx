import { Button } from "@/components/ui/button"
import heroImage from "@assets/generated_images/Restaurant_digital_ordering_hero_51ef34cf.png"

export default function HeroSection() {
  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-24">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6" data-testid="text-hero-title">
            Transform Your 
            <span className="text-primary block" style={{ fontFamily: 'Pacifico, cursive' }}>
              Restaurant Experience
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto" data-testid="text-hero-description">
            Complete digital ordering solution with QR menus, payment integration, 
            and powerful analytics. Everything you need to modernize your restaurant.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 h-auto"
              onClick={scrollToFeatures}
              data-testid="button-explore-features"
            >
              Explore Features
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 h-auto bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              onClick={scrollToContact}
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white/80">
            <div className="text-center" data-testid="stat-price">
              <div className="text-3xl font-bold text-white">Custom Build</div>
              <div className="text-sm">For You</div>
            </div>
            <div className="text-center" data-testid="stat-features">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-sm">Add-on Features</div>
            </div>
            <div className="text-center" data-testid="stat-support">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm">Support Included</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
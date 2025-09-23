import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Smartphone, QrCode, CreditCard, BarChart3, Shield } from "lucide-react"

interface BaseFeature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface AddOnFeature {
  title: string;
  price: number;
  description: string;
}

const baseFeatures: BaseFeature[] = [
  {
    icon: Smartphone,
    title: "Custom Website (Responsive Design)",
    description: "Beautiful, mobile-first website that works perfectly on all devices"
  },
  {
    icon: QrCode,
    title: "Digital Menu with QR Codes",
    description: "Interactive menus with images, categories, and table-wise QR code scanning"
  },
  {
    icon: CreditCard,
    title: "Cart & Order Placement",
    description: "Seamless ordering experience with secure payment gateway integration"
  },
  {
    icon: BarChart3,
    title: "Admin Dashboard",
    description: "Complete order management system with real-time analytics"
  },
  {
    icon: Shield,
    title: "Secure Payment Gateway",
    description: "Industry-standard security with multiple payment options"
  }
];

const addOnFeatures: AddOnFeature[] = [
  { title: "Live Order Status Update", price: 3000, description: "Real-time order tracking for customers" },
  { title: "Customer Reviews & Ratings", price: 2500, description: "Build trust with customer feedback system" },
  { title: "Suggestion/Feedback Form", price: 1500, description: "Collect valuable customer insights" },
  { title: "Loyalty Points / Discount Coupons", price: 4000, description: "Reward repeat customers and boost retention" },
  { title: "WhatsApp/SMS Notifications", price: 3500, description: "Keep customers informed via their preferred channel" },
  { title: "Chatbot Helper", price: 5000, description: "24/7 automated customer support" },
  { title: "Schedule Your Table Appointment", price: 3000, description: "Online reservation management system" },
  { title: "Advanced Sales Report & Analytics", price: 4500, description: "Detailed business insights and reporting" },
  { title: "Multi-Language Menu Support", price: 2000, description: "Serve customers in their preferred language" },
  { title: "Customer Profile & Order History", price: 3500, description: "Personalized customer experience" },
  { title: "Social Media Integration", price: 2000, description: "Connect with customers on social platforms" },
  { title: "SEO Optimized Website", price: 3500, description: "Improve your online visibility and reach" },
  { title: "GST/Tax Invoice Generator", price: 3000, description: "Automated billing and tax compliance" },
  { title: "Expense & Profit Calculator", price: 4000, description: "Track costs and profitability" },
  { title: "Add-on Items & Upselling", price: 2500, description: "Increase average order value" },
  { title: "AR Dish Preview", price: 20000, description: "Cutting-edge augmented reality menu visualization" }
];

export default function FeatureShowcase() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Base Package */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-base-package-title">
            Base Package
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-5xl font-bold text-primary">₹40,000</span>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              Complete Solution
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to get started with digital ordering
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {baseFeatures.map((feature, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-base-feature-${index}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CheckCircle className="h-5 w-5 text-chart-3" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-On Features */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-addon-features-title">
            Add-On Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Customize your solution with powerful add-on features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addOnFeatures.map((feature, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-addon-feature-${index}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex-1">{feature.title}</CardTitle>
                  <Badge variant="outline" className="ml-2">
                    ₹{feature.price.toLocaleString('en-IN')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
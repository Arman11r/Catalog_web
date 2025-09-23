import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calculator, Download } from "lucide-react"

interface AddOnFeature {
  id: string;
  title: string;
  price: number;
  description: string;
}

const addOnFeatures: AddOnFeature[] = [
  { id: "live-status", title: "Live Order Status Update", price: 3000, description: "Real-time order tracking" },
  { id: "reviews", title: "Customer Reviews & Ratings", price: 2500, description: "Customer feedback system" },
  { id: "feedback", title: "Suggestion/Feedback Form", price: 1500, description: "Collect customer insights" },
  { id: "loyalty", title: "Loyalty Points / Discount Coupons", price: 4000, description: "Reward system" },
  { id: "notifications", title: "WhatsApp/SMS Notifications", price: 3500, description: "Customer notifications" },
  { id: "chatbot", title: "Chatbot Helper", price: 5000, description: "24/7 automated support" },
  { id: "appointments", title: "Schedule Your Table Appointment", price: 3000, description: "Reservation system" },
  { id: "analytics", title: "Advanced Sales Report & Analytics", price: 4500, description: "Business insights" },
  { id: "multilang", title: "Multi-Language Menu Support", price: 2000, description: "Multiple languages" },
  { id: "profiles", title: "Customer Profile & Order History", price: 3500, description: "Customer management" },
  { id: "social", title: "Social Media Integration", price: 2000, description: "Social connectivity" },
  { id: "seo", title: "SEO Optimized Website", price: 3500, description: "Online visibility" },
  { id: "invoicing", title: "GST/Tax Invoice Generator", price: 3000, description: "Automated billing" },
  { id: "profit", title: "Expense & Profit Calculator", price: 4000, description: "Financial tracking" },
  { id: "upselling", title: "Add-on Items & Upselling", price: 2500, description: "Increase order value" },
  { id: "ar", title: "AR Dish Preview", price: 20000, description: "Augmented reality visualization" }
];

const BASE_PRICE = 40000;

export default function PricingCalculator() {
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());

  const totalPrice = useMemo(() => {
    const addOnTotal = addOnFeatures
      .filter(feature => selectedFeatures.has(feature.id))
      .reduce((sum, feature) => sum + feature.price, 0);
    return BASE_PRICE + addOnTotal;
  }, [selectedFeatures]);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => {
      const newSet = new Set(prev);
      if (newSet.has(featureId)) {
        newSet.delete(featureId);
        console.log(`Removed feature: ${featureId}`);
      } else {
        newSet.add(featureId);
        console.log(`Added feature: ${featureId}`);
      }
      return newSet;
    });
  };

  const generatePDF = async () => {
    try {
      console.log('PDF generation triggered with selected features:', Array.from(selectedFeatures));
      
      const selectedFeaturesArray = Array.from(selectedFeatures);
      
      // First create a proposal
      const proposalResponse = await fetch('/api/proposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedFeatures: selectedFeaturesArray
        })
      });

      if (!proposalResponse.ok) {
        throw new Error('Failed to create proposal');
      }

      const proposalData = await proposalResponse.json();

      // Then generate PDF
      const pdfResponse = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          proposalId: proposalData.proposalId,
          selectedFeatures: selectedFeaturesArray
        })
      });

      if (!pdfResponse.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Download the PDF
      const blob = await pdfResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'MunchBox_Feature_Selection.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-pricing-title">
            Configure Your Package
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the add-on features you need and see real-time pricing
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feature Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Add-On Features
                </CardTitle>
                <CardDescription>
                  Select the features you want to add to your base package
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {addOnFeatures.map((feature) => (
                    <div 
                      key={feature.id} 
                      className="flex items-start space-x-3 p-4 rounded-lg border hover-elevate cursor-pointer"
                      onClick={() => toggleFeature(feature.id)}
                      data-testid={`feature-option-${feature.id}`}
                    >
                      <Checkbox
                        id={feature.id}
                        checked={selectedFeatures.has(feature.id)}
                        onChange={() => toggleFeature(feature.id)}
                        data-testid={`checkbox-${feature.id}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <label 
                              htmlFor={feature.id} 
                              className="text-sm font-medium cursor-pointer"
                            >
                              {feature.title}
                            </label>
                            <p className="text-xs text-muted-foreground mt-1">
                              {feature.description}
                            </p>
                          </div>
                          <Badge variant="secondary" className="ml-2 flex-shrink-0">
                            ₹{feature.price.toLocaleString('en-IN')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Price Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-sm">Base Package</span>
                  <span className="font-medium">₹{BASE_PRICE.toLocaleString('en-IN')}</span>
                </div>

                {selectedFeatures.size > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Selected Add-ons:</div>
                    {addOnFeatures
                      .filter(feature => selectedFeatures.has(feature.id))
                      .map(feature => (
                        <div key={feature.id} className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">{feature.title}</span>
                          <span>₹{feature.price.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary" data-testid="text-total-price">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={generatePDF}
                  data-testid="button-generate-pdf"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate Proposal PDF
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  Includes installation, training, and 1-year support
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
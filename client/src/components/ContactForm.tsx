import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MessageSquare, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    restaurant: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return
    setSubmitting(true)
    
    try {
      // Submit via Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '33a0456d-abb9-4dd2-95f4-e5534cb8595b',
          subject: 'New Inquiry - CafeCanvas',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          restaurant: formData.restaurant,
          message: formData.message,
          source: 'CafeCanvas Website',
          botcheck: ''
        })
      });

      const result = await response.json();

      if (result?.success) {
        toast({
          title: "Thanks for reaching out!",
          description: "Your message was sent. We'll get back to you within 24 hours.",
        })
        setFormData({ name: '', email: '', phone: '', restaurant: '', message: '' });
      } else {
        toast({
          title: 'Submission failed',
          description: result?.message || 'Please try again in a moment.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Network error',
        description: 'Failed to submit. Check your connection and try again.',
        variant: 'destructive'
      })
    } finally {
      setSubmitting(false)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-muted/30 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-contact-title">
            Get Your Custom Quote
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your restaurant? Contact us for a personalized proposal
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send Us Your Requirements</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Priya Sharma"
                      autoComplete="name"
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@company.com"
                      autoComplete="email"
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      data-testid="input-phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurant">Restaurant Name</Label>
                    <Input
                      id="restaurant"
                      name="restaurant"
                      value={formData.restaurant}
                      onChange={handleChange}
                      placeholder="e.g. Spice Garden"
                      autoComplete="organization"
                      data-testid="input-restaurant"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your restaurant and specific requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    data-testid="input-message"
                  />
                </div>

                {/* Honeypot field for bots */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <Button type="submit" className="w-full" data-testid="button-send-inquiry" disabled={submitting}>
                  {submitting ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...</>
                  ) : (
                    <><MessageSquare className="h-4 w-4 mr-2" /> Send Inquiry</>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">We respect your privacy. No spam, ever.</p>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Get in touch with our team directly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Rachit Agrawal</div>
                    <a href="tel:+918791804428" className="text-muted-foreground hover:underline">+91 87918 04428</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Arman Ahmed</div>
                    <a href="tel:+919548784462" className="text-muted-foreground hover:underline">+91 95487 84462</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Email Support</div>
                    <div className="text-muted-foreground">Available 24/7</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">1</Badge>
                  <div>
                    <div className="font-medium">Consultation Call</div>
                    <div className="text-sm text-muted-foreground">
                      We'll schedule a 30-minute call to understand your needs
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">2</Badge>
                  <div>
                    <div className="font-medium">Custom Proposal</div>
                    <div className="text-sm text-muted-foreground">
                      Receive a detailed proposal with features and pricing
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">3</Badge>
                  <div>
                    <div className="font-medium">Implementation</div>
                    <div className="text-sm text-muted-foreground">
                      We'll build and deploy your solution within 2-3 weeks
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
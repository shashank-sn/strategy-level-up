import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, Target, FileText, Palette, Globe, Zap, Users, Mail } from "lucide-react";
import { Link } from "react-router-dom";
const Pricing = () => {
  return <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="mb-6">
            <Button variant="ghost" asChild className="p-2">
              <Link to="/brand-audit">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Results
              </Link>
            </Button>
          </div>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Choose Your Brand Journey</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock the full power of AI-driven brand strategy building
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Main Product */}
          <Card className="border-2 border-primary/20 relative overflow-hidden">
            
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl mb-2">Complete Brand Strategy</CardTitle>
              <CardDescription className="text-lg">
                Everything you need to build a comprehensive brand strategy
              </CardDescription>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-4xl font-bold text-primary">$499</span>
                <span className="text-muted-foreground">USD</span>
              </div>
              <p className="text-sm text-muted-foreground">One-time payment • One brand</p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Features */}
              <div className="grid md:grid-cols-2 gap-4">
                {[{
                icon: Target,
                text: "Complete all 10 interactive modules"
              }, {
                icon: FileText,
                text: "One-page brand strategy summary"
              }, {
                icon: Check,
                text: "Comprehensive action plan"
              }, {
                icon: Palette,
                text: "Brand kit hosting included"
              }, {
                icon: Globe,
                text: "Custom subdomain for your brand"
              }, {
                icon: Zap,
                text: "50 AI credits included"
              }].map((feature, index) => <div key={index} className="flex items-center gap-3">
                    <feature.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature.text}</span>
                  </div>)}
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">What are AI Credits?</h4>
                <p className="text-sm text-muted-foreground">
                  1 AI Credit = 1 AI-powered action (like "Optimize with AI", "Show Examples", or content synthesis). 
                  50 credits are designed to complete all modules with several optimizations and refinements.
                </p>
              </div>

              <Button size="lg" className="w-full" asChild>
                <Link to="/progress">Start Your Brand Journey - $499</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Additional Credits */}
          

          {/* Agency Section */}
          <Card className="bg-gradient-to-r from-secondary/20 to-secondary/10 border-secondary">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">For Agencies & Consultants</h3>
                </div>
                
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Working with multiple brands? Get a 25% discount on each brand strategy 
                  plus custom onboarding and bulk credit options.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contact for Agency Pricing
                  </Button>
                  <Button variant="ghost">
                    Learn More About Bulk Options
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Personalized support • Volume discounts • Custom credit packages
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="text-center space-y-4 pt-8">
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Secure Payment
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Instant Access
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                30-Day Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Pricing;
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Download, 
  Share2, 
  FileText, 
  Target, 
  Users, 
  MessageSquare, 
  Zap, 
  CheckCircle,
  Calendar,
  Palette,
  Globe,
  Upload
} from "lucide-react";

interface BrandBlueprintProps {
  brandData?: any; // In real implementation, this would be typed based on all module data
}

export const BrandBlueprint = ({ brandData }: BrandBlueprintProps) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("summary");

  // Simulate blueprint generation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsGenerating(false);
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  // Mock data - in real implementation, this would come from completed modules
  const mockBrandData = {
    companyName: "TechFlow Solutions",
    purpose: "Empowering small businesses to thrive in the digital age",
    vision: "A world where every small business has access to enterprise-level technology",
    mission: "To provide intuitive, affordable tech solutions that grow with your business",
    targetAudience: "Small business owners (25-45) seeking digital transformation",
    positioning: "For small business owners who need reliable tech solutions, TechFlow is the platform that grows with your business because of our scalable architecture and personal support.",
    personality: ["Reliable", "Innovative", "Supportive"],
    differentiators: {
      product: 8,
      distribution: 6,
      marketing: 7,
      pricing: 9
    },
    promise: "Technology that works as hard as you do",
    reasonsToBelieve: [
      "99.9% uptime guarantee",
      "24/7 customer support",
      "Scalable pricing model",
      "Integration with 100+ business tools"
    ],
    pillars: [
      {
        name: "Customer Success",
        purpose: "Ensure every customer achieves their business goals",
        action: "Launch customer success program with quarterly check-ins"
      },
      {
        name: "Product Innovation",
        purpose: "Stay ahead with cutting-edge features",
        action: "Implement monthly feature releases based on user feedback"
      },
      {
        name: "Market Expansion",
        purpose: "Reach new business segments",
        action: "Develop partnerships with 3 industry associations"
      }
    ],
    quickWins: [
      "Update website messaging",
      "Launch content marketing series",
      "Implement customer onboarding sequence"
    ],
    voiceTone: ["Professional", "Empathetic", "Direct"]
  };

  const downloadDocument = (type: 'summary' | 'guidelines' | 'both') => {
    console.log(`Downloading ${type} document(s)`);
    // In real implementation, this would generate and download the actual documents
  };

  const shareStrategy = () => {
    const shareUrl = `${mockBrandData.companyName.toLowerCase().replace(/\s+/g, '')}.yourbrandstrategist.com`;
    navigator.clipboard.writeText(shareUrl);
    console.log(`Copied share URL: ${shareUrl}`);
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Target className="w-10 h-10 text-primary animate-pulse" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Generating Your Brand Blueprint</h2>
            <p className="text-muted-foreground">
              Synthesizing your strategy into actionable documents...
            </p>
          </div>
          
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">{progress}% Complete</p>
          </div>
          
          <div className="text-left text-sm text-muted-foreground space-y-1">
            <div className={`flex items-center gap-2 ${progress >= 20 ? 'text-primary' : ''}`}>
              <CheckCircle className={`w-4 h-4 ${progress >= 20 ? 'text-green-500' : 'text-muted-foreground'}`} />
              Processing strategic pillars
            </div>
            <div className={`flex items-center gap-2 ${progress >= 40 ? 'text-primary' : ''}`}>
              <CheckCircle className={`w-4 h-4 ${progress >= 40 ? 'text-green-500' : 'text-muted-foreground'}`} />
              Analyzing positioning & differentiation
            </div>
            <div className={`flex items-center gap-2 ${progress >= 60 ? 'text-primary' : ''}`}>
              <CheckCircle className={`w-4 h-4 ${progress >= 60 ? 'text-green-500' : 'text-muted-foreground'}`} />
              Creating action plan framework
            </div>
            <div className={`flex items-center gap-2 ${progress >= 80 ? 'text-primary' : ''}`}>
              <CheckCircle className={`w-4 h-4 ${progress >= 80 ? 'text-green-500' : 'text-muted-foreground'}`} />
              Generating brand guidelines
            </div>
            <div className={`flex items-center gap-2 ${progress >= 100 ? 'text-primary' : ''}`}>
              <CheckCircle className={`w-4 h-4 ${progress >= 100 ? 'text-green-500' : 'text-muted-foreground'}`} />
              Finalizing blueprint
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">🎉 Your Brand Blueprint is Ready!</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Congratulations! Your comprehensive brand strategy has been synthesized into actionable documents. 
            Your brand is now ready for consistent, strategic implementation.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button onClick={() => downloadDocument('summary')} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download One-Page Summary
          </Button>
          <Button onClick={() => downloadDocument('guidelines')} variant="outline" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Download Full Guidelines
          </Button>
          <Button onClick={shareStrategy} variant="outline" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Strategy
          </Button>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">One-Page Summary</TabsTrigger>
            <TabsTrigger value="guidelines">Brand Guidelines</TabsTrigger>
            <TabsTrigger value="action-plan">Action Plan</TabsTrigger>
            <TabsTrigger value="brand-kit">Brand Kit</TabsTrigger>
          </TabsList>

          {/* One-Page Summary */}
          <TabsContent value="summary" className="space-y-6">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-primary/10">
                <CardTitle className="text-2xl">{mockBrandData.companyName}</CardTitle>
                <p className="text-muted-foreground">Brand Strategy Summary</p>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {/* Purpose & Vision */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      Purpose
                    </h3>
                    <p className="text-sm">{mockBrandData.purpose}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Vision</h3>
                    <p className="text-sm">{mockBrandData.vision}</p>
                  </div>
                </div>

                <Separator />

                {/* Target Audience & Positioning */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Target Audience
                    </h3>
                    <p className="text-sm">{mockBrandData.targetAudience}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Positioning Statement</h3>
                    <p className="text-sm italic bg-muted/50 p-3 rounded">"{mockBrandData.positioning}"</p>
                  </div>
                </div>

                <Separator />

                {/* Brand Personality & Voice */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      Personality Traits
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {mockBrandData.personality.map((trait, index) => (
                        <Badge key={index} variant="secondary">{trait}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Voice & Tone</h3>
                    <div className="flex flex-wrap gap-2">
                      {mockBrandData.voiceTone.map((tone, index) => (
                        <Badge key={index} variant="outline">{tone}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Brand Promise & Differentiators */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      Brand Promise
                    </h3>
                    <p className="text-sm font-medium text-primary">"{mockBrandData.promise}"</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Reasons to Believe</h3>
                    <ul className="text-sm space-y-1">
                      {mockBrandData.reasonsToBelieve.map((reason, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Separator />

                {/* Strategic Pillars */}
                <div>
                  <h3 className="font-semibold mb-4">Strategic Pillars</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {mockBrandData.pillars.map((pillar, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h4 className="font-medium text-sm mb-1">{pillar.name}</h4>
                        <p className="text-xs text-muted-foreground">{pillar.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Brand Guidelines */}
          <TabsContent value="guidelines" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Messaging Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Messages</h4>
                    <ul className="text-sm space-y-1">
                      <li>• {mockBrandData.promise}</li>
                      <li>• Technology that scales with your business</li>
                      <li>• Professional support, personal touch</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Language to Use</h4>
                    <div className="text-sm space-y-1">
                      <p>• Empowering, supportive, reliable</p>
                      <p>• Solution-focused, growth-oriented</p>
                      <p>• Clear, jargon-free explanations</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Language to Avoid</h4>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p>• Complex technical jargon</p>
                      <p>• Overly corporate language</p>
                      <p>• Negative or limiting terms</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Differentiation Matrix
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(mockBrandData.differentiators).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(value as number) * 10}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-primary">{value}/10</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Action Plan */}
          <TabsContent value="action-plan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  90-Day Sprint Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Quick Wins */}
                  <div>
                    <h3 className="font-semibold mb-4">Immediate Actions (Next 2 weeks)</h3>
                    <div className="space-y-2">
                      {mockBrandData.quickWins.map((action, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{action}</span>
                          </div>
                          <Badge variant="secondary">Quick Win</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pillar Actions */}
                  <div>
                    <h3 className="font-semibold mb-4">Strategic Pillar Actions (30-90 days)</h3>
                    <div className="space-y-3">
                      {mockBrandData.pillars.map((pillar, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{pillar.name}</h4>
                            <Badge variant="outline">Strategic</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{pillar.purpose}</p>
                          <p className="text-sm"><strong>Action:</strong> {pillar.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Brand Kit */}
          <TabsContent value="brand-kit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Brand Asset Hub
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Upload Your Brand Assets</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a centralized hub for logos, colors, fonts, and guidelines
                  </p>
                  <Button className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Assets
                  </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-3">Recommended Assets</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        Logo files (SVG, PNG, JPG)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        Brand color palette
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        Typography specimens
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        Photography style guide
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        Icon library
                      </li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      Your Brand Hub
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Access your complete brand strategy and assets at:
                    </p>
                    <div className="bg-background p-2 rounded border text-sm font-mono">
                      {mockBrandData.companyName.toLowerCase().replace(/\s+/g, '')}.yourbrandstrategist.com
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
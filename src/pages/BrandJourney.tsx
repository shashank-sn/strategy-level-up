import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Search, 
  Lightbulb, 
  Target, 
  BookOpen, 
  Heart, 
  Users, 
  TrendingUp, 
  Minus, 
  MapPin, 
  Palette, 
  CheckSquare,
  Check,
  Lock
} from "lucide-react";

const BrandJourney = () => {
  const modules = [
    {
      id: 1,
      title: "Brand Setup",
      description: "Initial setup for your company.",
      icon: Settings,
      completed: true,
      available: true
    },
    {
      id: 2,
      title: "Brand Audit",
      description: "Assess your current brand perception.",
      icon: Search,
      completed: true,
      available: true
    },
    {
      id: 3,
      title: "Brand Foundation – Purpose, Vision & Mission",
      description: "Why these statements are the North Star of your brand.",
      icon: Lightbulb,
      completed: false,
      available: true
    },
    {
      id: 4,
      title: "Business Goals & Measurement",
      description: "Connecting your grand vision to actionable, measurable goals.",
      icon: Target,
      completed: false,
      available: false
    },
    {
      id: 5,
      title: "The Founder's Story & Brand Challenge",
      description: "The power of narrative and identifying your brand's biggest hurdles.",
      icon: BookOpen,
      completed: false,
      available: false
    },
    {
      id: 6,
      title: "Brand Personality & Values",
      description: "Defining the human essence of your brand.",
      icon: Heart,
      completed: false,
      available: false
    },
    {
      id: 7,
      title: "Audience Deep Dive – Persona & Empathy",
      description: "Understanding who you serve at a profound level.",
      icon: Users,
      completed: false,
      available: false
    },
    {
      id: 8,
      title: "Competitor Analysis & Market Trends",
      description: "Knowing your landscape and staying ahead.",
      icon: TrendingUp,
      completed: false,
      available: false
    },
    {
      id: 9,
      title: "Gap Analysis & Differentiators",
      description: "Identifying where you stand and how you'll stand out.",
      icon: Minus,
      completed: false,
      available: false
    },
    {
      id: 10,
      title: "Positioning & Brand Promise",
      description: "Crafting your unique spot in the market and what you guarantee.",
      icon: MapPin,
      completed: false,
      available: false
    },
    {
      id: 11,
      title: "Concept & Living the Brand",
      description: "Translating strategy into tangible expression.",
      icon: Palette,
      completed: false,
      available: false
    },
    {
      id: 12,
      title: "Strategic Pillars & Action Prioritization",
      description: "This section will cover the transition from strategy to execution by defining your focus areas.",
      icon: CheckSquare,
      completed: false,
      available: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Your Brand Journey</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete each module to build a comprehensive brand strategy
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>2 of 12 completed</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(2 / 12) * 100}%` }}
              />
            </div>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const IconComponent = module.icon;
              
              return (
                <Card 
                  key={module.id}
                  className={`relative transition-all duration-300 ${
                    module.completed 
                      ? 'border-green-500/50 bg-green-50/50 dark:bg-green-950/20' 
                      : module.available
                      ? 'border-primary/50 hover:border-primary cursor-pointer'
                      : 'opacity-60 border-muted'
                  }`}
                >
                  {module.completed && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-green-500 text-white">
                        <Check className="w-3 h-3 mr-1" />
                        Complete
                      </Badge>
                    </div>
                  )}
                  
                  {!module.completed && !module.available && (
                    <div className="absolute -top-2 -right-2">
                      <Badge variant="secondary" className="bg-muted">
                        <Lock className="w-3 h-3 mr-1" />
                        Locked
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      module.completed 
                        ? 'bg-green-500 text-white' 
                        : module.available
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <CardTitle className={`text-lg leading-tight ${
                      module.completed || module.available ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {module.title}
                    </CardTitle>
                    
                    <CardDescription className={`text-sm ${
                      module.completed || module.available ? 'text-muted-foreground' : 'text-muted-foreground/60'
                    }`}>
                      {module.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <Button 
                      variant={module.completed ? "secondary" : module.available ? "default" : "outline"}
                      className="w-full"
                      disabled={!module.available}
                    >
                      {module.completed ? "View Results" : "Start"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom Info */}
          <div className="mt-12 text-center">
            <div className="bg-secondary/50 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold mb-2">Complete Your Journey</h3>
              <p className="text-sm text-muted-foreground">
                Each module builds upon the previous one. Complete them in order to create 
                a comprehensive brand strategy tailored to your business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandJourney;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProgress } from "@/contexts/ProgressContext";
import { useNavigate } from "react-router-dom";
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
  Lock,
  BarChart3
} from "lucide-react";

const BrandJourney = () => {
  const { progress, isModuleUnlocked, getModuleProgress } = useProgress();
  const navigate = useNavigate();
  const modules = [
    {
      id: 'foundation',
      title: "Brand Foundation – Purpose, Vision & Mission",
      description: "Why these statements are the North Star of your brand.",
      icon: Lightbulb,
      route: "/brand-journey/foundation"
    },
    {
      id: 'business-goals',
      title: "Business Goals & Measurement",
      description: "Connecting your grand vision to actionable, measurable goals.",
      icon: Target,
      route: "/brand-journey/business-goals"
    },
    {
      id: 'founder-story',
      title: "The Founder's Story & Brand Challenge",
      description: "The power of narrative and identifying your brand's biggest hurdles.",
      icon: BookOpen,
      route: "/brand-journey/founder-story"
    },
    {
      id: 'personality',
      title: "Brand Personality & Values",
      description: "Defining the human essence of your brand.",
      icon: Heart,
      route: "/brand-journey/personality"
    },
    {
      id: 'audience',
      title: "Audience Deep Dive – Persona & Empathy",
      description: "Understanding who you serve at a profound level.",
      icon: Users,
      route: "/brand-journey/audience"
    },
    {
      id: 'competitive-analysis',
      title: "Competitor Analysis & Market Trends",
      description: "Knowing your landscape and staying ahead.",
      icon: TrendingUp,
      route: "/brand-journey/competitive-analysis"
    },
    {
      id: 'gap-analysis',
      title: "Gap Analysis & Differentiators",
      description: "Identifying where you stand and how you'll stand out.",
      icon: Minus,
      route: "/brand-journey/gap-analysis"
    },
    {
      id: 'positioning',
      title: "Positioning & Brand Promise",
      description: "Crafting your unique spot in the market and what you guarantee.",
      icon: MapPin,
      route: "/brand-journey/positioning"
    },
    {
      id: 'brand-concept',
      title: "Concept & Living the Brand",
      description: "Translating strategy into tangible expression.",
      icon: Palette,
      route: "/brand-journey/brand-concept"
    },
    {
      id: 'strategic-pillars',
      title: "Strategic Pillars & Action Prioritization",
      description: "This section will cover the transition from strategy to execution by defining your focus areas.",
      icon: CheckSquare,
      route: "/brand-journey/strategic-pillars"
    }
  ];

  const getModuleStatus = (moduleId: string) => {
    const moduleProgress = getModuleProgress(moduleId);
    const isUnlocked = isModuleUnlocked(moduleId);
    
    return {
      completed: moduleProgress?.completed || false,
      score: moduleProgress?.score || 0,
      available: isUnlocked,
      progress: moduleProgress
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Your Brand Journey</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Complete each module to build a comprehensive brand strategy
            </p>
            
            {/* Quick Actions */}
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/progress')}
                className="flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                View Progress Dashboard
              </Button>
              
              {progress.overallProgress === 100 && (
                <Button 
                  onClick={() => navigate('/brand-blueprint')}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  View Brand Blueprint
                </Button>
              )}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Overall Progress</span>
              <span>{Math.round(progress.overallProgress)}% • {progress.modules.filter(m => m.completed).length} of {modules.length} completed</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${progress.overallProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Total Score: {progress.overallScore}/1000</span>
              <span>Brand Health: {Math.round(progress.brandHealthScore)}%</span>
            </div>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const IconComponent = module.icon;
              const { completed, score, available } = getModuleStatus(module.id);
              
              return (
                <Card 
                  key={module.id}
                  className={`relative transition-all duration-300 group ${
                    completed 
                      ? 'border-green-500/50 bg-green-50/50 dark:bg-green-950/20' 
                      : available
                      ? 'border-primary/50 hover:border-primary hover:shadow-lg cursor-pointer'
                      : 'opacity-60 border-muted'
                  }`}
                >
                  {/* Status Badges */}
                  {completed && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-green-500 text-white">
                        <Check className="w-3 h-3 mr-1" />
                        {score}/100
                      </Badge>
                    </div>
                  )}
                  
                  {!completed && !available && (
                    <div className="absolute -top-2 -right-2">
                      <Badge variant="secondary" className="bg-muted">
                        <Lock className="w-3 h-3 mr-1" />
                        Locked
                      </Badge>
                    </div>
                  )}

                  {!completed && available && score > 0 && (
                    <div className="absolute -top-2 -right-2">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                        {score}/100
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all ${
                      completed 
                        ? 'bg-green-500 text-white' 
                        : available
                        ? 'bg-primary text-primary-foreground group-hover:scale-110'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <CardTitle className={`text-lg leading-tight ${
                      completed || available ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {module.title}
                    </CardTitle>
                    
                    <CardDescription className={`text-sm ${
                      completed || available ? 'text-muted-foreground' : 'text-muted-foreground/60'
                    }`}>
                      {module.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <Button 
                      variant={completed ? "secondary" : available ? "default" : "outline"}
                      className="w-full"
                      disabled={!available}
                      onClick={() => {
                        if (available) {
                          navigate(module.route);
                        }
                      }}
                    >
                      {completed ? `Edit (${score}/100)` : score > 0 ? "Continue" : "Start"}
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
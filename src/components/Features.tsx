import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Users, 
  Brain, 
  Trophy, 
  BarChart3, 
  FileText,
  Gamepad2,
  Sparkles,
  CheckCircle
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Brand Purpose & Positioning",
    description: "Define your brand's core purpose, mission, and unique market position with AI-guided exercises.",
    level: "Level 1-2",
    badge: "Foundation"
  },
  {
    icon: Users,
    title: "Audience Research & Personas",
    description: "Deep-dive into customer insights and create detailed buyer personas using data-driven analysis.",
    level: "Level 3-4",
    badge: "Research"
  },
  {
    icon: Brain,
    title: "Brand Personality & Voice",
    description: "Develop a distinctive brand personality and tone of voice that resonates with your audience.",
    level: "Level 5-6",
    badge: "Identity"
  },
  {
    icon: BarChart3,
    title: "Competitive Analysis",
    description: "Analyze your competition and identify opportunities for differentiation in the market.",
    level: "Level 7-8",
    badge: "Strategy"
  },
  {
    icon: FileText,
    title: "Brand Guidelines & Assets",
    description: "Create comprehensive brand guidelines and essential visual identity elements.",
    level: "Level 9-10",
    badge: "Implementation"
  },
  {
    icon: Trophy,
    title: "Strategy Summary & Action Plan",
    description: "Get a complete brand strategy document with actionable next steps for success.",
    level: "Completion",
    badge: "Success"
  }
];

const gamificationFeatures = [
  {
    icon: Gamepad2,
    title: "Interactive Lessons",
    description: "Engage with binary choices, multiple choice questions, sliders, and detailed text inputs."
  },
  {
    icon: Trophy,
    title: "Level Progression",
    description: "Achieve 75%+ scores to unlock new modules and advance through your brand journey."
  },
  {
    icon: CheckCircle,
    title: "Progress Tracking",
    description: "Visual progress indicators and achievement badges keep you motivated."
  },
  {
    icon: Sparkles,
    title: "AI Optimization",
    description: "Get intelligent suggestions and industry-specific examples tailored to your brand."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            <Target className="w-3 h-3 mr-1" />
            Platform Features
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Your Brand Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete 10 interactive modules designed to build a comprehensive brand strategy. 
            Each level unlocks new insights and brings you closer to brand clarity.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {feature.level}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <Badge variant="secondary" className="w-fit text-xs mb-2">
                    {feature.badge}
                  </Badge>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gamification Features */}
        <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-sm border max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Gamepad2 className="w-3 h-3 mr-1" />
              Gamified Learning
            </Badge>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Learn Through Play
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform makes brand strategy development engaging and interactive. 
              Progress through levels, earn achievements, and build expertise step by step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gamificationFeatures.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mx-auto">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
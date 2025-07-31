import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Star, Users, Target, Zap, TrendingUp, Award, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit mx-auto">
              <Star className="w-3 h-3 mr-1 text-primary" />
              Gamified Brand Building
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              Build Your
              <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent"> Brand Strategy </span>
              Like a Game
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Unlock your brand's potential with our AI-powered, gamified platform. 
              Complete 10 interactive modules, score 75%+ to level up, and build a 
              comprehensive brand strategy that drives real results.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/brand-audit">
                <Play className="w-5 h-5 mr-2" />
                Start Free Brand Audit
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Lightbulb className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">10K+ Brands Built</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">95% Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">AI-Powered</span>
            </div>
          </div>

          {/* Visual icons grid */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-8 pt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Strategy</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Audience</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Brand</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Growth</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">AI</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center animate-pulse">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Level Up</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
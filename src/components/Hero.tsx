import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Star, Users, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/20" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Star className="w-3 h-3 mr-1 text-primary" />
                Gamified Brand Building
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Build Your
                <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent"> Brand Strategy </span>
                Like a Game
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Unlock your brand's potential with our AI-powered, gamified platform. 
                Complete 10 interactive modules, score 75%+ to level up, and build a 
                comprehensive brand strategy that drives real results.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/login">
                  <Play className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-600">10K+ Brands Built</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-600">95% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-600">AI-Powered</span>
              </div>
            </div>
          </div>

          {/* Right content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="AI Brand Strategist Platform"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-white p-3 rounded-xl shadow-lg animate-pulse">
              <Target className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm font-medium">Level 1 Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
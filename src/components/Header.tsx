import { Button } from "@/components/ui/button";
import { Trophy, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900">AI Brand Strategist</h1>
            <p className="text-xs text-muted-foreground">Build Your Brand Journey</p>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/features" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
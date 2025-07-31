import { Button } from "@/components/ui/button";
import { Trophy, Target } from "lucide-react";
import { Link } from "react-router-dom";
const Header = () => {
  return <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Target className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-foreground">AI Brand Strategist</h1>
            
          </div>
        </Link>
        
        

        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>;
};
export default Header;
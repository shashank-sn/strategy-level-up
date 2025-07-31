import { Target } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="border-t bg-background py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © 2024 AI Brand Strategist. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
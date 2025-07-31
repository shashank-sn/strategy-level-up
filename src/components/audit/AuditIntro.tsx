import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, TrendingUp, Users } from "lucide-react";

interface AuditIntroProps {
  onNext: () => void;
}

const AuditIntro = ({ onNext }: AuditIntroProps) => {
  return (
    <div className="space-y-8">
      <Card className="border-2 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-2">
            Unlock Your Brand's Potential
          </CardTitle>
          <CardDescription className="text-lg">
            Start with a Free Brand Health Check!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            Take our quick 10-15 question assessment to discover your brand's current strength 
            and get personalized insights to boost your brand strategy.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-secondary/50">
              <Clock className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Quick & Easy</h3>
              <p className="text-sm text-muted-foreground">Takes only 5-10 minutes</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-secondary/50">
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Instant Results</h3>
              <p className="text-sm text-muted-foreground">Get your score immediately</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-secondary/50">
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Expert Insights</h3>
              <p className="text-sm text-muted-foreground">AI-powered recommendations</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-center">What You'll Discover:</h4>
            <div className="space-y-2">
              {[
                "Your current brand maturity level",
                "Strengths and improvement opportunities", 
                "Actionable next steps for growth",
                "How you compare to industry standards"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-4">
            <Button onClick={onNext} size="lg" className="px-8">
              Start Your Free Brand Audit
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              No credit card required • 100% Free
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditIntro;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, TrendingUp, Target, Lightbulb, CheckCircle, ArrowRight } from "lucide-react";
import { UserDetails, AuditAnswers } from "@/pages/BrandAudit";

interface AuditResultsProps {
  userDetails: UserDetails;
  answers: AuditAnswers;
  onPrevious: () => void;
}

const calculateScore = (answers: AuditAnswers): number => {
  const totalQuestions = 10;
  const maxScore = totalQuestions * 4; // Each question worth 4 points max
  
  const totalPoints = Object.values(answers).reduce((sum, answer) => sum + parseInt(answer), 0);
  return Math.round((totalPoints / maxScore) * 100);
};

const getScoreCategory = (score: number) => {
  if (score >= 80) return { level: "Excellent", color: "text-green-600", bg: "bg-green-50" };
  if (score >= 60) return { level: "Good", color: "text-blue-600", bg: "bg-blue-50" };
  if (score >= 40) return { level: "Fair", color: "text-yellow-600", bg: "bg-yellow-50" };
  return { level: "Needs Work", color: "text-red-600", bg: "bg-red-50" };
};

const getRecommendations = (score: number) => {
  if (score >= 80) {
    return [
      "Continue monitoring and maintaining your strong brand foundation",
      "Consider advanced brand strategy optimization",
      "Focus on innovation and staying ahead of trends"
    ];
  }
  if (score >= 60) {
    return [
      "Strengthen your brand guidelines and consistency",
      "Develop clearer differentiation strategies", 
      "Improve customer feedback systems"
    ];
  }
  if (score >= 40) {
    return [
      "Define your core brand values and mission",
      "Create comprehensive brand guidelines",
      "Conduct thorough competitor analysis"
    ];
  }
  return [
    "Start with basic brand foundation work",
    "Define your target audience clearly",
    "Create a simple but consistent visual identity"
  ];
};

const AuditResults = ({ userDetails, answers, onPrevious }: AuditResultsProps) => {
  const score = calculateScore(answers);
  const scoreCategory = getScoreCategory(score);
  const recommendations = getRecommendations(score);

  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">
            Your Brand Health Score
          </CardTitle>
          <div className="flex justify-center items-center gap-4">
            <div className="text-5xl font-bold text-primary">{score}</div>
            <div className="text-lg text-muted-foreground">/100</div>
          </div>
          <Badge variant="secondary" className={`${scoreCategory.color} ${scoreCategory.bg} border-0`}>
            {scoreCategory.level}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Brand Health Progress</span>
              <span>{score}%</span>
            </div>
            <Progress value={score} className="h-3" />
          </div>

          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertTitle>Congratulations, {userDetails.name}!</AlertTitle>
            <AlertDescription>
              {score >= 80 
                ? "Your brand foundation is excellent! You're ahead of most businesses in your space."
                : score >= 60 
                ? "You have a solid brand foundation with room for strategic improvements."
                : score >= 40
                ? "Your brand has potential but needs focused development in key areas."
                : "This is a great starting point! Every strong brand began with an honest assessment."
              }
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Your Next Steps
          </CardTitle>
          <CardDescription>
            Personalized recommendations to boost your brand health
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{rec}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Ready to Boost Your Brand Health?</h3>
            <p className="text-muted-foreground">
              Our AI Brand Strategist will guide you step-by-step through a comprehensive 
              10-module journey to build a robust brand strategy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="px-8">
                Start Full Brand Journey
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Download Your Report
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Sign up with Google to save your progress and access the full platform
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Questions
        </Button>
        <Button variant="ghost" asChild>
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default AuditResults;
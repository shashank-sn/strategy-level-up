import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, CheckCircle, Star } from "lucide-react";

interface ModuleSummaryProps {
  moduleTitle: string;
  answers: Record<string, any>;
  score: number;
  onComplete: () => void;
  onBack: () => void;
}

export const ModuleSummary = ({ moduleTitle, answers, score, onComplete, onBack }: ModuleSummaryProps) => {
  const renderAnswerSummary = () => {
    if (!answers || Object.keys(answers).length === 0) {
      return <p className="text-muted-foreground">No answers recorded</p>;
    }

    return (
      <div className="space-y-4">
        {Object.entries(answers).map(([key, value]) => {
          let displayValue = "";
          let label = "";

          // Format the key for display
          if (key.startsWith("competitor-")) {
            const compNum = key.split("-")[1];
            label = `Competitor ${compNum}`;
            if (typeof value === 'object' && value !== null && 'name' in value) {
              const comp = value as { name: string; description: string };
              displayValue = `${comp.name}: ${comp.description}`;
            } else {
              displayValue = String(value);
            }
          } else if (key === "market-trends") {
            label = "Market Trends";
            displayValue = Array.isArray(value) ? value.join(", ") : String(value);
          } else if (key === "strategic-insights") {
            label = "Strategic Insights";
            displayValue = String(value);
          } else if (key === "competitor-checklist") {
            label = "Competitor Analysis";
            if (typeof value === 'object' && value !== null) {
              const checklist = value as Record<string, Record<string, string>>;
              displayValue = Object.entries(checklist)
                .map(([competitor, attrs]) => 
                  `${competitor}: ${Object.entries(attrs)
                    .map(([attr, rating]) => `${attr} (${rating})`)
                    .join(", ")}`
                ).join("; ");
            } else {
              displayValue = String(value);
            }
          } else {
            label = key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
            displayValue = String(value);
          }

          return (
            <div key={key} className="border-l-4 border-primary pl-4">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                {label}
              </h4>
              <p className="mt-1 text-sm leading-relaxed">
                {displayValue.length > 200 ? `${displayValue.substring(0, 200)}...` : displayValue}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  // Calculate completion percentage
  const totalAnswers = Object.keys(answers).length;
  const answeredQuestions = Object.keys(answers).filter(key => 
    answers[key] !== undefined && answers[key] !== '' && answers[key] !== null
  ).length;
  const completionRate = totalAnswers > 0 ? Math.round((answeredQuestions / totalAnswers) * 100) : 0;

  const keyTakeaways = [
    "You've identified your main competitors and their key attributes",
    "Market trends analysis helps position your brand strategically", 
    "Competitive strengths and weaknesses reveal opportunities for differentiation",
    "These insights will guide your brand positioning and messaging strategy"
  ];

  return (
    <div className="space-y-6">
      {/* Completion Card */}
      <Card className="border-primary/20">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Strategy Complete!</CardTitle>
          <p className="text-center text-muted-foreground mb-4">
            You've successfully completed your {moduleTitle.toLowerCase()} analysis
          </p>
          <Badge variant="default" className="text-lg px-4 py-2">
            {completionRate}% Complete
          </Badge>
        </CardHeader>
      </Card>

      {/* Your Strategy Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Your Competitive Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderAnswerSummary()}
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {keyTakeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{takeaway}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Analysis
        </Button>
        <Button onClick={onComplete} size="lg" className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Continue Journey
        </Button>
      </div>
    </div>
  );
};
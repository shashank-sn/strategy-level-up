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

export const ModuleSummary = ({ moduleTitle, answers, onComplete, onBack }: ModuleSummaryProps) => {
  // Calculate completion percentage
  const totalAnswers = Object.keys(answers).length;
  const answeredQuestions = Object.keys(answers).filter(key => 
    answers[key] !== undefined && answers[key] !== '' && answers[key] !== null
  ).length;
  const completionRate = totalAnswers > 0 ? Math.round((answeredQuestions / totalAnswers) * 100) : 0;

  const generateStrategySummary = (answers: Record<string, any>): string => {
    const { purpose, vision, mission } = answers;
    
    let summary = "Your brand foundation strategy is now taking shape. ";
    
    if (purpose) {
      summary += `Your brand exists because ${purpose.toLowerCase()}. `;
    }
    
    if (vision) {
      summary += `You're working toward a future where ${vision.toLowerCase()}. `;
    }
    
    if (mission) {
      summary += `To achieve this vision, your approach will be to ${mission.toLowerCase()}. `;
    }
    
    summary += "These foundational elements will guide every brand decision you make moving forward, ensuring consistency and authenticity in how you present yourself to the world.";
    
    return summary;
  };

  const keyTakeaways = [
    "Your brand foundation provides the strategic direction for all future decisions",
    "Clear purpose, vision, and mission statements guide authentic brand building", 
    "These core elements will be referenced throughout your brand development journey"
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
            You've successfully built your {moduleTitle.toLowerCase()} strategy
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
            Your Brand Foundation Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {generateStrategySummary(answers)}
            </p>
          </div>
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
          Back to Journey
        </Button>
        <Button onClick={onComplete} size="lg" className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Continue Journey
        </Button>
      </div>
    </div>
  );
};
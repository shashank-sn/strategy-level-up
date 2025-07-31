import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, CheckCircle, Star } from "lucide-react";
import { ModuleData } from "./ModuleWrapper";

interface ModuleSummaryProps {
  moduleData: ModuleData;
  answers: Record<string, any>;
  onComplete: (score: number) => void;
  onPrevious: () => void;
}

export const ModuleSummary = ({ moduleData, answers, onComplete, onPrevious }: ModuleSummaryProps) => {
  // Calculate score based on completion
  const totalQuestions = moduleData.questions.length;
  const answeredQuestions = Object.keys(answers).filter(key => 
    answers[key] !== undefined && answers[key] !== ''
  ).length;
  const score = Math.round((answeredQuestions / totalQuestions) * 100);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 70) return 'secondary';
    return 'destructive';
  };

  const keyTakeaways = [
    "Understanding your brand foundation is crucial for long-term success",
    "Clear purpose, vision, and mission guide all brand decisions",
    "Authenticity in brand messaging builds trust with your audience"
  ];

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <Card className="border-primary/20">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className={`w-10 h-10 ${getScoreColor(score)}`} />
          </div>
          <CardTitle className="text-2xl">Module Complete!</CardTitle>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-lg">Your Score:</span>
            <Badge variant={getScoreBadgeVariant(score)} className="text-lg px-3 py-1">
              {score}%
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Key Takeaways */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {keyTakeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">{answeredQuestions}</div>
              <div className="text-sm text-muted-foreground">Questions Answered</div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">{totalQuestions}</div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Questions
        </Button>

        <Button onClick={() => onComplete(score)} size="lg" className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Complete Module
        </Button>
      </div>
    </div>
  );
};
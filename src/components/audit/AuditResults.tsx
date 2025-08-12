
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, TrendingUp, Target, Lightbulb, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { UserDetails, AuditAnswers } from "@/pages/BrandAudit";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AuditResultsProps {
  userDetails: UserDetails;
  answers: AuditAnswers;
  onPrevious: () => void;
  draftAuditId?: string;
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

const getStrengthsAndWeaknesses = (answers: AuditAnswers) => {
  const questionMap = {
    mission: "Mission Statement",
    target_audience: "Target Audience Knowledge",
    brand_voice: "Brand Voice & Tone",
    visual_identity: "Visual Brand Identity",
    differentiation: "Competitive Differentiation",
    consistency: "Brand Consistency",
    values: "Brand Values",
    customer_perception: "Customer Feedback",
    brand_strategy: "Brand Strategy Documentation",
    competitive_analysis: "Competitive Analysis"
  };

  const scores = Object.entries(answers).map(([key, value]) => ({
    area: questionMap[key as keyof typeof questionMap],
    score: parseInt(value)
  }));

  // Sort by score for strengths (highest) and weaknesses (lowest)
  const sortedByStrength = [...scores].sort((a, b) => b.score - a.score);
  const sortedByWeakness = [...scores].sort((a, b) => a.score - b.score);

  const strengths = sortedByStrength.slice(0, 3).map(item => item.area);
  const weaknesses = sortedByWeakness.slice(0, 3).map(item => item.area);

  return { strengths, weaknesses };
};

const AuditResults = ({ userDetails, answers, onPrevious, draftAuditId }: AuditResultsProps) => {
  const score = calculateScore(answers);
  const scoreCategory = getScoreCategory(score);
  const { user } = useAuth();
  const savedRef = useRef(false);
  const { toast } = useToast();

useEffect(() => {
    if (!user || savedRef.current) return;
    savedRef.current = true;
    (async () => {
      try {
        console.log("[AuditResults] Finalizing audit for user", user.id, { score });
        if (draftAuditId) {
          const { error } = await supabase.from('brand_audits').update({
            status: 'completed',
            title: 'Brand Health Check',
            total_score: score,
            max_possible_score: 100,
            completion_percentage: 100,
            completed_at: new Date().toISOString(),
            answers: answers,
            user_details: userDetails
          }).eq('id', draftAuditId);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('brand_audits').insert({
            user_id: user.id,
            status: 'completed',
            title: 'Brand Health Check',
            total_score: score,
            max_possible_score: 100,
            completion_percentage: 100,
            completed_at: new Date().toISOString(),
            answers: answers,
            user_details: userDetails
          });
          if (error) throw error;
        }
        toast({
          title: "Audit results saved",
          description: "Your Brand Health Check has been saved to your account.",
        });
      } catch (e) {
        console.error("[AuditResults] Failed to save audit:", e);
        toast({
          title: "Could not save your results",
          description: "Please refresh and try again.",
        });
      }
    })();
  }, [user, score, userDetails, answers, toast, draftAuditId]);

  const { strengths, weaknesses } = getStrengthsAndWeaknesses(answers);

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

      {/* Strengths and Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              Your Brand Strengths
            </CardTitle>
            <CardDescription>
              Areas where your brand is performing well
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-green-800 font-medium">{strength}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <Target className="h-5 w-5" />
              Areas for Improvement
            </CardTitle>
            <CardDescription>
              Focus areas to strengthen your brand
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weaknesses.map((weakness, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-100">
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-red-800 font-medium">{weakness}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

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
              <Button size="lg" className="px-8" asChild>
                <Link to="/pricing">
                  Start Full Brand Journey
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
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

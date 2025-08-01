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
  // Extract competitor data
  const competitors = [
    answers["competitor-1"],
    answers["competitor-2"], 
    answers["competitor-3"]
  ].filter(Boolean);

  const marketTrends = answers["market-trends"] || [];
  const strategicInsights = answers["strategic-insights"] || "";
  const competitorChecklist = answers["competitor-checklist"] || {};

  // Analyze competitor strengths
  const analyzeCompetitorStrengths = () => {
    const analysis = competitors.map(competitor => {
      if (!competitor?.name) return null;
      
      const competitorData = competitorChecklist[competitor.name] || {};
      const strengths = Object.entries(competitorData)
        .filter(([_, rating]) => rating === 'strength')
        .map(([attribute, _]) => attribute);
      
      const weaknesses = Object.entries(competitorData)
        .filter(([_, rating]) => rating === 'weakness')
        .map(([attribute, _]) => attribute);

      return {
        name: competitor.name,
        description: competitor.description,
        strengths,
        weaknesses,
        primaryPlay: strengths.length > 0 ? strengths[0] : 'Not identified'
      };
    }).filter(Boolean);

    return analysis;
  };

  // Identify market opportunities
  const identifyOpportunities = () => {
    const allWeaknesses = competitors.flatMap(competitor => {
      if (!competitor?.name) return [];
      const competitorData = competitorChecklist[competitor.name] || {};
      return Object.entries(competitorData)
        .filter(([_, rating]) => rating === 'weakness')
        .map(([attribute, _]) => attribute);
    });

    // Count weakness frequency to find common gaps
    const weaknessCount = allWeaknesses.reduce((acc, weakness) => {
      acc[weakness] = (acc[weakness] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Return attributes where multiple competitors are weak
    return Object.entries(weaknessCount)
      .filter(([_, count]) => count >= 2)
      .map(([attribute, _]) => attribute);
  };

  const competitorAnalysis = analyzeCompetitorStrengths();
  const marketOpportunities = identifyOpportunities();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-primary/20">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Competitive Analysis Complete!</CardTitle>
          <p className="text-muted-foreground">
            Here's your competitive landscape analysis and strategic opportunities
          </p>
        </CardHeader>
      </Card>

      {/* Competitor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Competitor Biggest Plays
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {competitorAnalysis.map((competitor, index) => (
              <div key={index} className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-lg">{competitor.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{competitor.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-sm text-green-700 mb-2">Primary Strengths</h5>
                    {competitor.strengths.length > 0 ? (
                      <ul className="space-y-1">
                        {competitor.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No clear strengths identified</p>
                    )}
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm text-red-700 mb-2">Key Weaknesses</h5>
                    {competitor.weaknesses.length > 0 ? (
                      <ul className="space-y-1">
                        {competitor.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No clear weaknesses identified</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm">
                    <strong>Biggest Play:</strong> {competitor.primaryPlay === 'Not identified' ? 
                      'Focus area not clearly defined in analysis' : 
                      `Competing primarily on ${competitor.primaryPlay.toLowerCase()}`
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Trends Impact */}
      {marketTrends.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Key Market Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {marketTrends.map((trend: string, index: number) => (
                <div key={index} className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
                  <p className="font-medium text-sm">{trend}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              These trends are reshaping your industry and creating new opportunities for differentiation.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Strategic Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Strategic Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          {marketOpportunities.length > 0 ? (
            <div>
              <h4 className="font-medium mb-3">Market Gaps to Exploit:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {marketOpportunities.map((opportunity, index) => (
                  <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-medium text-green-800">{opportunity}</p>
                    <p className="text-sm text-green-600">
                      Multiple competitors show weakness here - opportunity for differentiation
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Complete the competitor analysis to identify strategic opportunities.
            </p>
          )}
          
          {strategicInsights && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Your Strategic Insights:</h4>
              <p className="text-sm leading-relaxed">{strategicInsights}</p>
            </div>
          )}
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
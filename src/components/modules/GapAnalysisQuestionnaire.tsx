import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Target, TrendingUp, Zap, Award, CheckCircle } from "lucide-react";

interface GapAnalysisData {
  brand_gap: string;
  opportunity_gap: string;
  product_differentiation: number;
  place_differentiation: number;
  promotion_differentiation: number;
  price_differentiation: number;
  unique_selling_proposition: string;
  priority_gaps: {
    brand_gap: { impact: number; feasibility: number };
    market_gap: { impact: number; feasibility: number };
    opportunity_gap: { impact: number; feasibility: number };
  };
}

interface GapAnalysisQuestionnaireProps {
  onComplete: (data: GapAnalysisData) => void;
  onBack: () => void;
}

export const GapAnalysisQuestionnaire = ({ onComplete, onBack }: GapAnalysisQuestionnaireProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<GapAnalysisData>({
    brand_gap: "",
    opportunity_gap: "",
    product_differentiation: 5,
    place_differentiation: 5,
    promotion_differentiation: 5,
    price_differentiation: 5,
    unique_selling_proposition: "",
    priority_gaps: {
      brand_gap: { impact: 5, feasibility: 5 },
      market_gap: { impact: 5, feasibility: 5 },
      opportunity_gap: { impact: 5, feasibility: 5 }
    }
  });

  const steps = [
    "Brand Gap Analysis",
    "Opportunity Identification", 
    "Differentiation Assessment",
    "USP Development",
    "Gap Prioritization",
    "Summary & Review"
  ];

  const updateData = (field: keyof GapAnalysisData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updatePriorityGap = (gapType: keyof typeof data.priority_gaps, dimension: 'impact' | 'feasibility', value: number) => {
    setData(prev => ({
      ...prev,
      priority_gaps: {
        ...prev.priority_gaps,
        [gapType]: {
          ...prev.priority_gaps[gapType],
          [dimension]: value
        }
      }
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return data.brand_gap.trim() !== "";
      case 1: return data.opportunity_gap.trim() !== "";
      case 2: return true; // Sliders always have values
      case 3: return data.unique_selling_proposition.trim() !== "";
      case 4: return true; // Priority matrix always has values
      case 5: return true; // Summary page - always can proceed
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(data);
    }
  };

  const opportunityOptions = [
    { value: "underserved_segment", label: "Underserved customer segment" },
    { value: "unaddressed_problem", label: "Unaddressed customer problem/pain point" },
    { value: "ineffective_communication", label: "Ineffective competitor communication/messaging" },
    { value: "competitor_weakness", label: "Competitor weaknesses in a key feature/service" },
    { value: "new_trend", label: "New market trend or technology we can leverage" }
  ];

  // Analysis functions for summary
  const getCompetitiveAdvantage = () => {
    const scores = [
      { area: "Product", score: data.product_differentiation },
      { area: "Distribution", score: data.place_differentiation },
      { area: "Marketing", score: data.promotion_differentiation },
      { area: "Pricing", score: data.price_differentiation }
    ];
    const strongest = scores.reduce((a, b) => a.score > b.score ? a : b);
    const weakest = scores.reduce((a, b) => a.score < b.score ? a : b);
    const average = scores.reduce((sum, s) => sum + s.score, 0) / 4;
    
    return { strongest, weakest, average, scores };
  };

  const getPriorityRecommendation = () => {
    const gaps = [
      { type: "Brand Gap", ...data.priority_gaps.brand_gap },
      { type: "Market Gap", ...data.priority_gaps.market_gap },
      { type: "Opportunity Gap", ...data.priority_gaps.opportunity_gap }
    ];
    
    const highPriority = gaps.filter(g => g.impact >= 7 && g.feasibility >= 6);
    const quickWins = gaps.filter(g => g.feasibility >= 8);
    const bigBets = gaps.filter(g => g.impact >= 8 && g.feasibility <= 5);
    
    return { highPriority, quickWins, bigBets };
  };

  const getStrategicInsights = () => {
    const { strongest, weakest, average } = getCompetitiveAdvantage();
    const { highPriority, quickWins, bigBets } = getPriorityRecommendation();
    
    let focus = "balanced approach";
    if (average >= 7) focus = "leveraging strong differentiation";
    else if (average <= 4) focus = "building foundational differentiators";
    else focus = "selective improvement";
    
    return { focus, strongest, weakest, highPriority, quickWins, bigBets };
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Brand Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Understanding Brand Gaps</h4>
                <p className="text-sm text-muted-foreground">
                  A brand gap is the difference between how customers currently perceive your brand 
                  and how you want them to perceive it. Identifying these gaps helps focus your 
                  branding efforts.
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Brand Perception Gap Analysis
                </label>
                <p className="text-sm text-muted-foreground mb-3">
                  How do you want your ideal customers to perceive your brand? Based on your research/audit, 
                  how do you think they currently perceive it? What are the key differences or 'gaps'?
                </p>
                <Textarea
                  value={data.brand_gap}
                  onChange={(e) => updateData("brand_gap", e.target.value)}
                  placeholder="Example: Desired - 'Innovative, user-friendly, affordable'; Current - 'Complicated, expensive, only for experts'. Gap - Need to simplify messaging and demonstrate value..."
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Opportunity Gap Identification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Finding Market Opportunities</h4>
                <p className="text-sm text-muted-foreground">
                  Opportunity gaps represent areas where the market is underserved or where 
                  competitors are falling short. These represent your best chances for growth.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">
                  Based on your competitor analysis and customer insights, where do you see the biggest 
                  'opportunity gap' in the market?
                </label>
                <RadioGroup
                  value={data.opportunity_gap}
                  onValueChange={(value) => updateData("opportunity_gap", value)}
                  className="space-y-3"
                >
                  {opportunityOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                4Ps Differentiation Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">The 4Ps Framework</h4>
                <p className="text-sm text-muted-foreground">
                  Assess how strongly you differentiate from competitors across the classic 4Ps: 
                  Product, Place (distribution), Promotion (marketing), and Price.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { key: "product_differentiation", label: "Product/Service Features", description: "Unique features, quality, design, functionality" },
                  { key: "place_differentiation", label: "Place/Distribution Channels", description: "Where and how customers access your offering" },
                  { key: "promotion_differentiation", label: "Promotion/Marketing Approach", description: "How you communicate and reach customers" },
                  { key: "price_differentiation", label: "Price Point/Value Proposition", description: "Pricing strategy and perceived value" }
                ].map(({ key, label, description }) => (
                  <div key={key}>
                    <label className="text-sm font-medium mb-2 block">{label}</label>
                    <p className="text-xs text-muted-foreground mb-3">{description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Not Differentiated</span>
                        <span className="font-medium text-primary">{data[key as keyof GapAnalysisData] as number}/10</span>
                        <span>Highly Differentiated</span>
                      </div>
                      <Slider
                        value={[data[key as keyof GapAnalysisData] as number]}
                        onValueChange={([value]) => updateData(key as keyof GapAnalysisData, value)}
                        min={1}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Unique Selling Proposition (USP)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Crafting Your USP</h4>
                <p className="text-sm text-muted-foreground">
                  Your USP is the ONE compelling reason why a customer should choose your brand 
                  over any other option. It should be clear, specific, and memorable.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Great USP Examples:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Domino's: "30 minutes or it's free"</li>
                    <li>• Zappos: "Best customer service in online retail"</li>
                    <li>• FedEx: "When it absolutely, positively has to be there overnight"</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">USP Formula:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• What you do (product/service)</li>
                    <li>• Who you serve (target audience)</li>
                    <li>• How you're different (unique benefit)</li>
                    <li>• Why it matters (customer value)</li>
                  </ul>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Your Unique Selling Proposition
                </label>
                <p className="text-sm text-muted-foreground mb-3">
                  Synthesize your differentiators into a concise statement: What is the ONE compelling 
                  reason why a customer should choose your brand over any other option?
                </p>
                <Textarea
                  value={data.unique_selling_proposition}
                  onChange={(e) => updateData("unique_selling_proposition", e.target.value)}
                  placeholder="Example: 'The only project management tool that automatically adapts to your team's workflow, reducing setup time by 90% and increasing productivity from day one.'"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Gap Prioritization Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Prioritizing Your Gaps</h4>
                <p className="text-sm text-muted-foreground">
                  Rate each gap type on Impact (how much it could help your business) and 
                  Feasibility (how easily you can address it) to prioritize your efforts.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { key: "brand_gap", label: "Brand Gap", description: "Perception differences you identified" },
                  { key: "market_gap", label: "Market Gap", description: "Your unique space in the market" },
                  { key: "opportunity_gap", label: "Opportunity Gap", description: "The market opportunity you selected" }
                ].map(({ key, label, description }) => (
                  <div key={key} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">{label}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{description}</p>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Impact (1 = Low, 10 = High)
                        </label>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Low Impact</span>
                            <span className="font-medium text-primary">
                              {data.priority_gaps[key as keyof typeof data.priority_gaps].impact}
                            </span>
                            <span>High Impact</span>
                          </div>
                          <Slider
                            value={[data.priority_gaps[key as keyof typeof data.priority_gaps].impact]}
                            onValueChange={([value]) => updatePriorityGap(key as keyof typeof data.priority_gaps, 'impact', value)}
                            min={1}
                            max={10}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Feasibility (1 = Hard, 10 = Easy)
                        </label>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Hard to Address</span>
                            <span className="font-medium text-primary">
                              {data.priority_gaps[key as keyof typeof data.priority_gaps].feasibility}
                            </span>
                            <span>Easy to Address</span>
                          </div>
                          <Slider
                            value={[data.priority_gaps[key as keyof typeof data.priority_gaps].feasibility]}
                            onValueChange={([value]) => updatePriorityGap(key as keyof typeof data.priority_gaps, 'feasibility', value)}
                            min={1}
                            max={10}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        const insights = getStrategicInsights();
        const advantage = getCompetitiveAdvantage();
        const priorities = getPriorityRecommendation();
        
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Strategic Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Executive Summary */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Executive Summary</h3>
                <p className="text-sm leading-relaxed">
                  Your competitive differentiation score averages <strong>{advantage.average.toFixed(1)}/10</strong>, indicating a {" "}
                  <strong>{insights.focus}</strong> strategy is recommended. Your strongest differentiator is {" "}
                  <strong>{advantage.strongest.area}</strong> ({advantage.strongest.score}/10), while {" "}
                  <strong>{advantage.weakest.area}</strong> needs attention ({advantage.weakest.score}/10).
                  {priorities.quickWins.length > 0 && ` You have ${priorities.quickWins.length} quick win(s) identified.`}
                </p>
              </div>

              {/* Strategic Recommendations */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-green-500" />
                    Quick Wins
                  </h4>
                  {priorities.quickWins.length > 0 ? (
                    <ul className="space-y-2">
                      {priorities.quickWins.map((gap, index) => (
                        <li key={index} className="text-sm">
                          <span className="font-medium">{gap.type}:</span> High feasibility ({gap.feasibility}/10)
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">Focus on building foundational strengths first.</p>
                  )}
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    High Priority Gaps
                  </h4>
                  {priorities.highPriority.length > 0 ? (
                    <ul className="space-y-2">
                      {priorities.highPriority.map((gap, index) => (
                        <li key={index} className="text-sm">
                          <span className="font-medium">{gap.type}:</span> High impact & feasible
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No gaps meet high-priority criteria currently.</p>
                  )}
                </div>
              </div>

              {/* USP Analysis */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  Your Unique Position
                </h4>
                <div className="bg-muted/30 p-3 rounded italic mb-3">
                  "{data.unique_selling_proposition}"
                </div>
                <p className="text-sm text-muted-foreground">
                  This USP leverages your <strong>{advantage.strongest.area.toLowerCase()}</strong> strength and addresses the {" "}
                  <strong>{opportunityOptions.find(opt => opt.value === data.opportunity_gap)?.label.toLowerCase()}</strong> {" "}
                  market opportunity you identified.
                </p>
              </div>

              {/* Competitive Positioning */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-4">Competitive Positioning Matrix</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">DIFFERENTIATION STRENGTHS</p>
                    {advantage.scores
                      .filter(s => s.score >= 7)
                      .map((area, index) => (
                        <div key={index} className="flex justify-between text-sm mb-1">
                          <span>{area.area}</span>
                          <span className="text-green-600 font-medium">{area.score}/10</span>
                        </div>
                      ))}
                    {advantage.scores.filter(s => s.score >= 7).length === 0 && (
                      <p className="text-sm text-muted-foreground">Focus on building core differentiators</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">IMPROVEMENT AREAS</p>
                    {advantage.scores
                      .filter(s => s.score <= 5)
                      .map((area, index) => (
                        <div key={index} className="flex justify-between text-sm mb-1">
                          <span>{area.area}</span>
                          <span className="text-orange-600 font-medium">{area.score}/10</span>
                        </div>
                      ))}
                    {advantage.scores.filter(s => s.score <= 5).length === 0 && (
                      <p className="text-sm text-muted-foreground">Strong across all areas</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Plan */}
              <div className="bg-primary/5 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Recommended Action Plan</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Immediate (Next 30 days):</p>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Refine messaging around your USP and strongest differentiator ({advantage.strongest.area})</li>
                      {priorities.quickWins.slice(0, 1).map((gap, index) => (
                        <li key={index}>• Address {gap.type.toLowerCase()} (quick win opportunity)</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Short-term (Next 90 days):</p>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Strengthen {advantage.weakest.area.toLowerCase()} capabilities</li>
                      <li>• Implement brand perception improvements to close identified gaps</li>
                      {priorities.highPriority.slice(0, 1).map((gap, index) => (
                        <li key={index}>• Develop strategy for {gap.type.toLowerCase()}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Gap Analysis & Differentiators</h2>
        <p className="text-muted-foreground">
          Identify where you stand and how you stand out in the market
        </p>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mb-6">
        {steps.map((step, index) => (
          <Button
            key={index}
            variant={currentStep === index ? "default" : currentStep > index ? "secondary" : "outline"}
            size="sm"
            className="flex items-center gap-2 text-xs"
            onClick={() => setCurrentStep(index)}
            disabled={index > currentStep}
          >
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-background/20">
              {index + 1}
            </span>
            <span className="hidden sm:inline">{step}</span>
            {index < currentStep && (
              <span className="w-2 h-2 bg-green-500 rounded-full ml-1" />
            )}
          </Button>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{steps[currentStep]}</h3>
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </CardContent>
      </Card>

      {renderStepContent()}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={currentStep === 0 ? onBack : () => setCurrentStep(prev => prev - 1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {currentStep === 0 ? 'Back to Journey' : 'Previous'}
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="flex items-center gap-2"
        >
          {currentStep === steps.length - 1 ? 'Complete Analysis' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
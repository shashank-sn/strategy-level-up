import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Target, MessageSquare, Shield, Compass, Map, CheckCircle } from "lucide-react";

interface PositioningData {
  positioning_statement: string;
  brand_promise: string;
  reasons_to_believe: string;
  innovative_vs_reliable: number;
  affordable_vs_premium: number;
  personalized_vs_mass: number;
  positioning_map: {
    axis_x: string;
    axis_y: string;
    current_position: { x: number; y: number };
    desired_position: { x: number; y: number };
    competitors: Array<{ name: string; x: number; y: number }>;
  };
}

interface PositioningQuestionnaireProps {
  onComplete: (data: PositioningData) => void;
  onBack: () => void;
}

export const PositioningQuestionnaire = ({ onComplete, onBack }: PositioningQuestionnaireProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<PositioningData>({
    positioning_statement: "",
    brand_promise: "",
    reasons_to_believe: "",
    innovative_vs_reliable: 5,
    affordable_vs_premium: 5,
    personalized_vs_mass: 5,
    positioning_map: {
      axis_x: "Price",
      axis_y: "Quality",
      current_position: { x: 5, y: 5 },
      desired_position: { x: 5, y: 5 },
      competitors: []
    }
  });

  const steps = [
    "Positioning Statement",
    "Brand Promise",
    "Reasons to Believe",
    "Positioning Attributes",
    "Positioning Map",
    "Strategic Summary"
  ];

  const updateData = (field: keyof PositioningData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updatePositioningMap = (field: keyof typeof data.positioning_map, value: any) => {
    setData(prev => ({
      ...prev,
      positioning_map: {
        ...prev.positioning_map,
        [field]: value
      }
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return data.positioning_statement.trim() !== "";
      case 1: return data.brand_promise.trim() !== "";
      case 2: return data.reasons_to_believe.trim() !== "";
      case 3: return true; // Sliders always have values
      case 4: return true; // Positioning map always has values
      case 5: return true; // Summary page
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

  // Analysis functions for summary
  const getPositioningAnalysis = () => {
    const attributes = [
      { name: "Innovation vs Reliability", score: data.innovative_vs_reliable, low: "Innovative", high: "Reliable" },
      { name: "Price vs Premium", score: data.affordable_vs_premium, low: "Affordable", high: "Premium" },
      { name: "Personalization vs Mass Market", score: data.personalized_vs_mass, low: "Personalized", high: "Mass Market" }
    ];

    const dominantAttributes = attributes.filter(attr => attr.score <= 3 || attr.score >= 8);
    const balancedAttributes = attributes.filter(attr => attr.score > 3 && attr.score < 8);

    return { dominantAttributes, balancedAttributes, attributes };
  };

  const getPositioningStrategy = () => {
    const analysis = getPositioningAnalysis();
    
    let strategy = "Balanced positioning";
    let focus = "maintaining equilibrium across key attributes";
    
    if (analysis.dominantAttributes.length >= 2) {
      strategy = "Clear differentiation";
      focus = "strong positioning on specific attributes";
    } else if (analysis.dominantAttributes.length === 1) {
      strategy = "Focused positioning";
      focus = "leadership in one key area";
    }

    return { strategy, focus, analysis };
  };

  const addCompetitor = () => {
    const newCompetitor = { name: `Competitor ${data.positioning_map.competitors.length + 1}`, x: 5, y: 5 };
    updatePositioningMap("competitors", [...data.positioning_map.competitors, newCompetitor]);
  };

  const updateCompetitor = (index: number, field: string, value: any) => {
    const updatedCompetitors = data.positioning_map.competitors.map((comp, i) => 
      i === index ? { ...comp, [field]: value } : comp
    );
    updatePositioningMap("competitors", updatedCompetitors);
  };

  const removeCompetitor = (index: number) => {
    const updatedCompetitors = data.positioning_map.competitors.filter((_, i) => i !== index);
    updatePositioningMap("competitors", updatedCompetitors);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Brand Positioning Statement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Internal Positioning Framework</h4>
                <p className="text-sm text-muted-foreground">
                  Your positioning statement is an internal document that defines your brand's unique 
                  place in the market. It guides all strategic decisions and communications.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Positioning Template:</h4>
                  <div className="text-sm text-muted-foreground space-y-1 bg-muted/30 p-3 rounded">
                    <p>"For <strong>[Target Audience]</strong>,</p>
                    <p>who <strong>[Customer Need/Problem]</strong>,</p>
                    <p><strong>[Your Brand Name]</strong> is the <strong>[Product/Service Category]</strong></p>
                    <p>that <strong>[Key Benefit/Differentiation]</strong></p>
                    <p>because <strong>[Reason to Believe]</strong>."</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Example (Starbucks):</h4>
                  <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
                    <p>"For busy, on-the-go professionals who need a moment of comfort and familiarity, 
                    Starbucks is the premium coffee shop that offers consistent quality and a personalized 
                    experience because of its carefully sourced beans and inviting atmosphere."</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Your Brand Positioning Statement
                </label>
                <p className="text-sm text-muted-foreground mb-3">
                  Complete your internal positioning statement using the template above. This will serve 
                  as the foundation for all your brand communications.
                </p>
                <Textarea
                  value={data.positioning_statement}
                  onChange={(e) => updateData("positioning_statement", e.target.value)}
                  placeholder="For [your target audience], who [specific need/problem], [Your Brand] is the [category] that [unique benefit] because [proof/reason]..."
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
                <MessageSquare className="w-5 h-5 text-primary" />
                Brand Promise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">The Core Promise</h4>
                <p className="text-sm text-muted-foreground">
                  Your brand promise is the fundamental commitment you make to customers. It's what 
                  they can consistently expect and the transformation you deliver.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Great Brand Promises:</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li><strong>Amazon:</strong> "Lowest prices, biggest selection, fastest delivery"</li>
                    <li><strong>FedEx:</strong> "Peace of mind - your package arrives on time, every time"</li>
                    <li><strong>Disney:</strong> "Magical experiences that create lifelong memories"</li>
                    <li><strong>Volvo:</strong> "Safety and protection for what matters most"</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Promise Elements:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Clear and specific outcome</li>
                    <li>• Emotionally resonant benefit</li>
                    <li>• Consistently deliverable</li>
                    <li>• Differentiates from competitors</li>
                    <li>• Addresses core customer need</li>
                  </ul>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Your Brand Promise
                </label>
                <p className="text-sm text-muted-foreground mb-3">
                  What is the core, overarching promise your brand makes to customers? What can they 
                  consistently expect, and what ultimate success or transformation will they achieve?
                </p>
                <Textarea
                  value={data.brand_promise}
                  onChange={(e) => updateData("brand_promise", e.target.value)}
                  placeholder="Example: 'We promise to deliver innovative solutions that save you time and reduce stress, so you can focus on what matters most to you.'"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Reasons to Believe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Credibility & Proof Points</h4>
                <p className="text-sm text-muted-foreground">
                  Reasons to believe are concrete proof points that validate your brand promise. 
                  They make your claims credible and trustworthy.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Fast Delivery Promise:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Proprietary logistics network</li>
                    <li>• 50+ nationwide fulfillment centers</li>
                    <li>• Same-day shipping options</li>
                    <li>• 99.5% on-time delivery rate</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">High Quality Promise:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Hand-selected premium materials</li>
                    <li>• Expert craftsmanship standards</li>
                    <li>• Lifetime warranty coverage</li>
                    <li>• Industry certifications</li>
                  </ul>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Your Reasons to Believe (3-5 proof points)
                </label>
                <p className="text-sm text-muted-foreground mb-3">
                  List concrete proof points that validate your brand promise. Include features, 
                  qualifications, processes, or guarantees that make your promise credible.
                </p>
                <Textarea
                  value={data.reasons_to_believe}
                  onChange={(e) => updateData("reasons_to_believe", e.target.value)}
                  placeholder="List your proof points:
• [Specific feature or capability]
• [Process or methodology]
• [Credential or certification]
• [Guarantee or track record]
• [Unique resource or advantage]"
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-primary" />
                Positioning Attributes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Strategic Positioning Intent</h4>
                <p className="text-sm text-muted-foreground">
                  Define how strongly you want to be perceived on key brand attributes. This guides 
                  your positioning strategy relative to competitors.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-4 block">
                    Innovation (1) vs. Reliability (10)
                  </label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Cutting-edge Innovation</span>
                      <span className="font-medium text-primary">{data.innovative_vs_reliable}</span>
                      <span>Proven Reliability</span>
                    </div>
                    <Slider
                      value={[data.innovative_vs_reliable]}
                      onValueChange={([value]) => updateData("innovative_vs_reliable", value)}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-4 block">
                    Affordable (1) vs. Premium (10)
                  </label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Accessible Pricing</span>
                      <span className="font-medium text-primary">{data.affordable_vs_premium}</span>
                      <span>Premium Positioning</span>
                    </div>
                    <Slider
                      value={[data.affordable_vs_premium]}
                      onValueChange={([value]) => updateData("affordable_vs_premium", value)}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-4 block">
                    Personalized (1) vs. Mass Market (10)
                  </label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Highly Personalized</span>
                      <span className="font-medium text-primary">{data.personalized_vs_mass}</span>
                      <span>Mass Market Appeal</span>
                    </div>
                    <Slider
                      value={[data.personalized_vs_mass]}
                      onValueChange={([value]) => updateData("personalized_vs_mass", value)}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5 text-primary" />
                Positioning Map Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Visual Competitive Positioning</h4>
                <p className="text-sm text-muted-foreground">
                  Create a positioning map to visualize where you stand relative to competitors 
                  on key attributes.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">X-Axis (Horizontal)</label>
                  <Input
                    value={data.positioning_map.axis_x}
                    onChange={(e) => updatePositioningMap("axis_x", e.target.value)}
                    placeholder="e.g., Price, Innovation, Ease of Use"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Y-Axis (Vertical)</label>
                  <Input
                    value={data.positioning_map.axis_y}
                    onChange={(e) => updatePositioningMap("axis_y", e.target.value)}
                    placeholder="e.g., Quality, Features, Service"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-3">Your Current Position</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        {data.positioning_map.axis_x} (1-10)
                      </label>
                      <Slider
                        value={[data.positioning_map.current_position.x]}
                        onValueChange={([value]) => updatePositioningMap("current_position", { ...data.positioning_map.current_position, x: value })}
                        min={1}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        {data.positioning_map.axis_y} (1-10)
                      </label>
                      <Slider
                        value={[data.positioning_map.current_position.y]}
                        onValueChange={([value]) => updatePositioningMap("current_position", { ...data.positioning_map.current_position, y: value })}
                        min={1}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Your Desired Position</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        {data.positioning_map.axis_x} (1-10)
                      </label>
                      <Slider
                        value={[data.positioning_map.desired_position.x]}
                        onValueChange={([value]) => updatePositioningMap("desired_position", { ...data.positioning_map.desired_position, x: value })}
                        min={1}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        {data.positioning_map.axis_y} (1-10)
                      </label>
                      <Slider
                        value={[data.positioning_map.desired_position.y]}
                        onValueChange={([value]) => updatePositioningMap("desired_position", { ...data.positioning_map.desired_position, y: value })}
                        min={1}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Competitors (Optional)</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addCompetitor}
                    disabled={data.positioning_map.competitors.length >= 5}
                  >
                    Add Competitor
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {data.positioning_map.competitors.map((competitor, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="grid gap-3 md:grid-cols-4">
                        <Input
                          value={competitor.name}
                          onChange={(e) => updateCompetitor(index, "name", e.target.value)}
                          placeholder="Competitor name"
                        />
                        <div>
                          <label className="text-xs text-muted-foreground">{data.positioning_map.axis_x}</label>
                          <Slider
                            value={[competitor.x]}
                            onValueChange={([value]) => updateCompetitor(index, "x", value)}
                            min={1}
                            max={10}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">{data.positioning_map.axis_y}</label>
                          <Slider
                            value={[competitor.y]}
                            onValueChange={([value]) => updateCompetitor(index, "y", value)}
                            min={1}
                            max={10}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeCompetitor(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        const positioningStrategy = getPositioningStrategy();
        const analysis = getPositioningAnalysis();
        
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Strategic Positioning Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Executive Summary */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Positioning Strategy</h3>
                <p className="text-sm leading-relaxed">
                  Your brand follows a <strong>{positioningStrategy.strategy.toLowerCase()}</strong> approach, 
                  with {positioningStrategy.focus}. 
                  {analysis.dominantAttributes.length > 0 && (
                    <span> You show strong positioning toward {analysis.dominantAttributes.map((attr, i) => (
                      <strong key={i}>
                        {attr.score <= 3 ? attr.low : attr.high}
                        {i < analysis.dominantAttributes.length - 1 ? ', ' : ''}
                      </strong>
                    ))}.</span>
                  )}
                </p>
              </div>

              {/* Brand Promise & Position */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Core Brand Promise
                  </h4>
                  <div className="bg-muted/30 p-3 rounded italic text-sm">
                    "{data.brand_promise}"
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Positioning Statement
                  </h4>
                  <div className="bg-muted/30 p-3 rounded text-sm">
                    {data.positioning_statement}
                  </div>
                </div>
              </div>

              {/* Positioning Attributes */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-4">Strategic Positioning Profile</h4>
                <div className="space-y-3">
                  {analysis.attributes.map((attr, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{attr.name}:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {attr.score <= 3 ? attr.low : attr.score >= 8 ? attr.high : 'Balanced'}
                        </span>
                        <span className="text-sm font-medium text-primary">
                          {attr.score}/10
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitive Positioning */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Map className="w-4 h-4 text-primary" />
                  Competitive Positioning Map
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium mb-2">Current vs Desired Position:</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>{data.positioning_map.axis_x}:</span>
                        <span>{data.positioning_map.current_position.x} → {data.positioning_map.desired_position.x}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{data.positioning_map.axis_y}:</span>
                        <span>{data.positioning_map.current_position.y} → {data.positioning_map.desired_position.y}</span>
                      </div>
                    </div>
                  </div>
                  {data.positioning_map.competitors.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Competitive Landscape:</p>
                      <div className="space-y-1 text-sm">
                        {data.positioning_map.competitors.slice(0, 3).map((comp, i) => (
                          <div key={i} className="flex justify-between text-muted-foreground">
                            <span>{comp.name}:</span>
                            <span>({comp.x}, {comp.y})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Credibility */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Credibility Foundation
                </h4>
                <div className="bg-muted/30 p-3 rounded text-sm whitespace-pre-line">
                  {data.reasons_to_believe}
                </div>
              </div>

              {/* Strategic Recommendations */}
              <div className="bg-primary/5 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Strategic Recommendations</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Positioning Focus:</p>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      {analysis.dominantAttributes.length > 0 ? (
                        analysis.dominantAttributes.map((attr, i) => (
                          <li key={i}>• Leverage strong {attr.score <= 3 ? attr.low : attr.high} positioning</li>
                        ))
                      ) : (
                        <li>• Consider developing stronger differentiation on key attributes</li>
                      )}
                      <li>• Ensure all communications reinforce your positioning statement</li>
                      <li>• Continuously validate promise delivery through customer feedback</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Implementation Priority:</p>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Align all touchpoints with your brand promise</li>
                      <li>• Strengthen reasons to believe through concrete proof points</li>
                      <li>• Monitor competitive movements in your positioning space</li>
                      <li>• Test positioning effectiveness with target audience</li>
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
        <h2 className="text-2xl font-bold mb-2">Positioning & Brand Promise</h2>
        <p className="text-muted-foreground">
          Define your unique market position and the promise you make to customers
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
          {currentStep === steps.length - 1 ? 'Complete Positioning' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
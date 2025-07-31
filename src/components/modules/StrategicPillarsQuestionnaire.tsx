import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Target, Calendar, Users, Play, Pause, RotateCcw, Grid3x3, CheckCircle } from "lucide-react";

interface StrategicPillar {
  name: string;
  purpose: string;
  priority_action: string;
  action_owner: string;
  action_deadline: string;
}

interface ActionItem {
  id: string;
  name: string;
  impact: number;
  effort: number;
  category: string;
}

interface StrategicPillarsData {
  strategic_pillars: StrategicPillar[];
  start_doing: string;
  stop_doing: string;
  continue_doing: string;
  action_items: ActionItem[];
  additional_actions: string[];
}

interface StrategicPillarsQuestionnaireProps {
  onComplete: (data: StrategicPillarsData) => void;
  onBack: () => void;
}

export const StrategicPillarsQuestionnaire = ({ onComplete, onBack }: StrategicPillarsQuestionnaireProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [newAction, setNewAction] = useState(""); // Move this to top level
  const [data, setData] = useState<StrategicPillarsData>({
    strategic_pillars: [
      { name: "", purpose: "", priority_action: "", action_owner: "", action_deadline: "" },
      { name: "", purpose: "", priority_action: "", action_owner: "", action_deadline: "" },
      { name: "", purpose: "", priority_action: "", action_owner: "", action_deadline: "" }
    ],
    start_doing: "",
    stop_doing: "",
    continue_doing: "",
    action_items: [
      { id: "homepage", name: "Redesign homepage", impact: 7, effort: 6, category: "Digital" },
      { id: "social", name: "Launch new social media campaign", impact: 6, effort: 4, category: "Marketing" },
      { id: "email", name: "Refine email onboarding sequence", impact: 8, effort: 3, category: "Digital" },
      { id: "workshop", name: "Host customer workshop", impact: 7, effort: 5, category: "Engagement" },
      { id: "sales-training", name: "Train sales team on new messaging", impact: 9, effort: 4, category: "Internal" },
      { id: "product-desc", name: "Update product descriptions", impact: 6, effort: 2, category: "Content" }
    ],
    additional_actions: []
  });

  const steps = [
    "Strategic Pillars",
    "Priority Actions",
    "Start/Stop/Continue",
    "Impact/Effort Matrix",
    "Additional Actions",
    "Strategic Blueprint"
  ];

  const updateData = (field: keyof StrategicPillarsData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updatePillar = (index: number, field: keyof StrategicPillar, value: string) => {
    setData(prev => ({
      ...prev,
      strategic_pillars: prev.strategic_pillars.map((pillar, i) => 
        i === index ? { ...pillar, [field]: value } : pillar
      )
    }));
  };

  const addPillar = () => {
    if (data.strategic_pillars.length < 5) {
      setData(prev => ({
        ...prev,
        strategic_pillars: [...prev.strategic_pillars, { name: "", purpose: "", priority_action: "", action_owner: "", action_deadline: "" }]
      }));
    }
  };

  const removePillar = (index: number) => {
    if (data.strategic_pillars.length > 3) {
      setData(prev => ({
        ...prev,
        strategic_pillars: prev.strategic_pillars.filter((_, i) => i !== index)
      }));
    }
  };

  const updateActionItem = (id: string, field: 'impact' | 'effort', value: number) => {
    setData(prev => ({
      ...prev,
      action_items: prev.action_items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addCustomAction = (actionName: string) => {
    if (actionName.trim()) {
      const newAction: ActionItem = {
        id: `custom-${Date.now()}`,
        name: actionName.trim(),
        impact: 5,
        effort: 5,
        category: "Custom"
      };
      setData(prev => ({
        ...prev,
        action_items: [...prev.action_items, newAction]
      }));
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return data.strategic_pillars.filter(p => p.name.trim() !== "" && p.purpose.trim() !== "").length >= 3;
      case 1: return data.strategic_pillars.filter(p => p.priority_action.trim() !== "").length >= 3;
      case 2: return data.start_doing.trim() !== "" && data.stop_doing.trim() !== "" && data.continue_doing.trim() !== "";
      case 3: return true; // Matrix always has values
      case 4: return true; // Additional actions are optional
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
  const getStrategicFocus = () => {
    const completedPillars = data.strategic_pillars.filter(p => p.name.trim() !== "" && p.purpose.trim() !== "");
    const pillarsWithActions = data.strategic_pillars.filter(p => p.priority_action.trim() !== "");
    
    const focusAreas = completedPillars.map(p => p.name).join(", ");
    const actionableRate = (pillarsWithActions.length / completedPillars.length) * 100;
    
    let strategicMaturity = "Developing";
    if (completedPillars.length >= 4 && actionableRate >= 80) strategicMaturity = "Advanced";
    else if (completedPillars.length >= 3 && actionableRate >= 60) strategicMaturity = "Intermediate";
    
    return { completedPillars, pillarsWithActions, focusAreas, actionableRate, strategicMaturity };
  };

  const getActionPrioritization = () => {
    const quickWins = data.action_items.filter(item => item.impact >= 7 && item.effort <= 4);
    const bigBets = data.action_items.filter(item => item.impact >= 7 && item.effort >= 6);
    const fillIns = data.action_items.filter(item => item.impact <= 5 && item.effort <= 4);
    const thanklessWork = data.action_items.filter(item => item.impact <= 5 && item.effort >= 6);
    
    const averageImpact = data.action_items.reduce((sum, item) => sum + item.impact, 0) / data.action_items.length;
    const averageEffort = data.action_items.reduce((sum, item) => sum + item.effort, 0) / data.action_items.length;
    
    return { quickWins, bigBets, fillIns, thanklessWork, averageImpact, averageEffort };
  };

  const getImplementationReadiness = () => {
    const strategicFocus = getStrategicFocus();
    const actionPriority = getActionPrioritization();
    
    const hasOwnership = data.strategic_pillars.filter(p => p.action_owner.trim() !== "").length;
    const hasDeadlines = data.strategic_pillars.filter(p => p.action_deadline.trim() !== "").length;
    const hasTransformation = data.start_doing.length > 20 && data.stop_doing.length > 20;
    
    let readinessScore = 0;
    if (strategicFocus.actionableRate >= 80) readinessScore += 30;
    if (actionPriority.quickWins.length >= 2) readinessScore += 25;
    if (hasOwnership >= strategicFocus.completedPillars.length * 0.6) readinessScore += 20;
    if (hasDeadlines >= strategicFocus.completedPillars.length * 0.6) readinessScore += 15;
    if (hasTransformation) readinessScore += 10;
    
    let readinessLevel = "Requires Development";
    if (readinessScore >= 80) readinessLevel = "Implementation Ready";
    else if (readinessScore >= 60) readinessLevel = "Nearly Ready";
    else if (readinessScore >= 40) readinessLevel = "Developing Readiness";
    
    return { 
      readinessScore, 
      readinessLevel, 
      hasOwnership, 
      hasDeadlines, 
      hasTransformation,
      strategicFocus,
      actionPriority
    };
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Strategic Pillars Definition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Your Brand's Foundation</h4>
                <p className="text-sm text-muted-foreground">
                  Strategic pillars are the 3-5 main focus areas that will guide your brand's efforts. 
                  They translate your strategy into actionable themes for execution.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Example Pillars:</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li><strong>Brand Awareness:</strong> Increase organic search traffic and thought leadership</li>
                    <li><strong>Customer Experience:</strong> Improve satisfaction scores and retention</li>
                    <li><strong>Product Innovation:</strong> Develop features that solve core customer problems</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Pillar Guidelines:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Clear and specific focus area</li>
                    <li>• Measurable outcomes</li>
                    <li>• Aligned with brand strategy</li>
                    <li>• Sustainable over 12+ months</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                {data.strategic_pillars.map((pillar, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium">Strategic Pillar {index + 1}</h4>
                      {data.strategic_pillars.length > 3 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removePillar(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Pillar Name</label>
                        <Input
                          value={pillar.name}
                          onChange={(e) => updatePillar(index, "name", e.target.value)}
                          placeholder="e.g., Brand Awareness, Customer Experience"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Purpose & Objective</label>
                        <Textarea
                          value={pillar.purpose}
                          onChange={(e) => updatePillar(index, "purpose", e.target.value)}
                          placeholder="e.g., Increase organic search traffic by 40% and establish thought leadership in our industry"
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                {data.strategic_pillars.length < 5 && (
                  <Button
                    variant="outline"
                    onClick={addPillar}
                    className="w-full"
                  >
                    Add Another Pillar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Priority Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">From Strategy to Action</h4>
                <p className="text-sm text-muted-foreground">
                  For each strategic pillar, define the single most important action you'll take 
                  in the next 90 days to make progress.
                </p>
              </div>

              <div className="space-y-4">
                {data.strategic_pillars.filter(p => p.name.trim() !== "").map((pillar, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3 text-primary">{pillar.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{pillar.purpose}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Priority Action (Next 90 Days)
                        </label>
                        <Input
                          value={pillar.priority_action}
                          onChange={(e) => updatePillar(index, "priority_action", e.target.value)}
                          placeholder="e.g., Launch weekly blog series and guest post on 3 industry publications"
                        />
                      </div>
                      
                      <div className="grid gap-3 md:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium mb-1 block">
                            Action Owner (Optional)
                          </label>
                          <Input
                            value={pillar.action_owner}
                            onChange={(e) => updatePillar(index, "action_owner", e.target.value)}
                            placeholder="e.g., Marketing Team, John Doe"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">
                            Target Deadline (Optional)
                          </label>
                          <Input
                            value={pillar.action_deadline}
                            onChange={(e) => updatePillar(index, "action_deadline", e.target.value)}
                            placeholder="e.g., March 31, 2024"
                            type="text"
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

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-primary" />
                Start/Stop/Continue Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Brand Transformation Framework</h4>
                <p className="text-sm text-muted-foreground">
                  Identify what changes your brand needs to make to align with your new strategy. 
                  This creates clear transformation guidelines.
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Play className="w-4 h-4 text-green-500" />
                    START Doing
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    What is one new thing your brand will start doing to align with your strategy?
                  </p>
                  <Textarea
                    value={data.start_doing}
                    onChange={(e) => updateData("start_doing", e.target.value)}
                    placeholder="Example: Consistent weekly content marketing that demonstrates our expertise and builds thought leadership in our industry"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Pause className="w-4 h-4 text-red-500" />
                    STOP Doing
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    What is one thing your brand will stop doing that doesn't align with your new strategy?
                  </p>
                  <Textarea
                    value={data.stop_doing}
                    onChange={(e) => updateData("stop_doing", e.target.value)}
                    placeholder="Example: Random, unthemed social media posts that don't reflect our brand voice or provide value to our audience"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-blue-500" />
                    CONTINUE Doing
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    What is one thing your brand currently does well that supports your strategy?
                  </p>
                  <Textarea
                    value={data.continue_doing}
                    onChange={(e) => updateData("continue_doing", e.target.value)}
                    placeholder="Example: Our high-quality customer support that already embodies our brand values of empathy and reliability"
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Grid3x3 className="w-5 h-5 text-primary" />
                Impact/Effort Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Prioritization Framework</h4>
                <p className="text-sm text-muted-foreground">
                  Rate potential brand actions on Impact (benefit to your business) and Effort 
                  (resources required) to prioritize your roadmap.
                </p>
              </div>

              <div className="space-y-4">
                {data.action_items.map((item, index) => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Impact (1 = Low, 10 = High)
                        </label>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Low Impact</span>
                            <span className="font-medium text-primary">{item.impact}</span>
                            <span>High Impact</span>
                          </div>
                          <Slider
                            value={[item.impact]}
                            onValueChange={([value]) => updateActionItem(item.id, "impact", value)}
                            min={1}
                            max={10}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Effort (1 = Low, 10 = High)
                        </label>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Low Effort</span>
                            <span className="font-medium text-primary">{item.effort}</span>
                            <span>High Effort</span>
                          </div>
                          <Slider
                            value={[item.effort]}
                            onValueChange={([value]) => updateActionItem(item.id, "effort", value)}
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

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Additional Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Customize Your Action List</h4>
                <p className="text-sm text-muted-foreground">
                  Add any specific actions relevant to your brand that weren't covered in the 
                  standard list. These will be included in your prioritization analysis.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                    placeholder="e.g., Develop brand partnership strategy"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addCustomAction(newAction);
                        setNewAction("");
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      addCustomAction(newAction);
                      setNewAction("");
                    }}
                    disabled={!newAction.trim()}
                  >
                    Add Action
                  </Button>
                </div>

                {data.action_items.filter(item => item.category === "Custom").length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Your Custom Actions:</h4>
                    <div className="space-y-2">
                      {data.action_items.filter(item => item.category === "Custom").map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="text-sm">{item.name}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setData(prev => ({
                                ...prev,
                                action_items: prev.action_items.filter(a => a.id !== item.id)
                              }));
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium mb-2 text-blue-900">Next Steps</h4>
                  <p className="text-sm text-blue-700">
                    Your custom actions will be included in the final strategic blueprint with 
                    prioritization recommendations based on your brand's specific context.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        const implementation = getImplementationReadiness();
        const strategicFocus = getStrategicFocus();
        const actionPriority = getActionPrioritization();
        
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Strategic Blueprint Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Executive Summary */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Implementation Readiness Assessment</h3>
                <p className="text-sm leading-relaxed">
                  Your strategic foundation shows <strong>{strategicFocus.strategicMaturity.toLowerCase()}</strong> maturity 
                  with <strong>{strategicFocus.completedPillars.length}</strong> defined pillars and 
                  <strong>{strategicFocus.actionableRate.toFixed(0)}%</strong> actionability. 
                  Implementation readiness is <strong>{implementation.readinessLevel.toLowerCase()}</strong> 
                  (score: {implementation.readinessScore}/100). You have <strong>{actionPriority.quickWins.length}</strong> quick 
                  wins identified for immediate execution.
                </p>
              </div>

              {/* Strategic Pillars Overview */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  Strategic Focus Areas
                </h4>
                <div className="space-y-3">
                  {strategicFocus.completedPillars.map((pillar, index) => (
                    <div key={index} className="p-3 bg-muted/30 rounded">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-sm">{pillar.name}</h5>
                        {pillar.priority_action && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Action Defined
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{pillar.purpose}</p>
                      {pillar.priority_action && (
                        <p className="text-xs text-primary mt-2">
                          <strong>Priority Action:</strong> {pillar.priority_action}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Prioritization Analysis */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Grid3x3 className="w-4 h-4 text-green-500" />
                    Quick Wins (Do First)
                  </h4>
                  {actionPriority.quickWins.length > 0 ? (
                    <ul className="space-y-2">
                      {actionPriority.quickWins.map((action, index) => (
                        <li key={index} className="text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium">{action.name}</span>
                            <span className="text-xs text-muted-foreground">
                              Impact: {action.impact}, Effort: {action.effort}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Consider adjusting impact/effort ratings to identify quick wins.
                    </p>
                  )}
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    Big Bets (Plan Carefully)
                  </h4>
                  {actionPriority.bigBets.length > 0 ? (
                    <ul className="space-y-2">
                      {actionPriority.bigBets.map((action, index) => (
                        <li key={index} className="text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium">{action.name}</span>
                            <span className="text-xs text-muted-foreground">
                              Impact: {action.impact}, Effort: {action.effort}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No high-impact, high-effort initiatives identified.
                    </p>
                  )}
                </div>
              </div>

              {/* Transformation Framework */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-4">Brand Transformation Framework</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-3 bg-green-50 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      START
                    </h5>
                    <p className="text-sm text-green-700">{data.start_doing}</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                      <Pause className="w-4 h-4" />
                      STOP
                    </h5>
                    <p className="text-sm text-red-700">{data.stop_doing}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded border border-blue-200">
                    <h5 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      CONTINUE
                    </h5>
                    <p className="text-sm text-blue-700">{data.continue_doing}</p>
                  </div>
                </div>
              </div>

              {/* Implementation Roadmap */}
              <div className="bg-primary/5 p-4 rounded-lg">
                <h4 className="font-medium mb-3">90-Day Implementation Roadmap</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Week 1-2 (Foundation Setting):</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Communicate strategic pillars to team</li>
                      <li>• Begin implementing "START" initiatives</li>
                      {actionPriority.quickWins.slice(0, 1).map((action, i) => (
                        <li key={i}>• Execute: {action.name}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Week 3-6 (Quick Wins Execution):</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Complete priority actions for each pillar</li>
                      <li>• Phase out "STOP" activities</li>
                      {actionPriority.quickWins.slice(1, 3).map((action, i) => (
                        <li key={i}>• Execute: {action.name}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Week 7-12 (Strategic Build-out):</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Begin planning for high-impact, high-effort initiatives</li>
                      <li>• Measure progress against pillar objectives</li>
                      <li>• Refine and optimize based on early results</li>
                      {actionPriority.bigBets.slice(0, 1).map((action, i) => (
                        <li key={i}>• Plan: {action.name}</li>
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
        <h2 className="text-2xl font-bold mb-2">Strategic Pillars & Action Prioritization</h2>
        <p className="text-muted-foreground">
          Transform your brand strategy into a concrete action plan with clear priorities
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
          {currentStep === 0 ? 'Back to Progress' : 'Previous'}
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="flex items-center gap-2"
        >
          {currentStep === steps.length - 1 ? 'Complete Strategic Blueprint' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
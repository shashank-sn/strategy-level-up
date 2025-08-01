import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Share2, FileText, Target, Users, MessageSquare, Zap, CheckCircle, Calendar, Palette, Globe, Upload, Plus, X } from "lucide-react";
interface BrandBlueprintProps {
  brandData?: any; // In real implementation, this would be typed based on all module data
}
export const BrandBlueprint = ({
  brandData
}: BrandBlueprintProps) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("summary");

  // Todo list state
  const [todoItems, setTodoItems] = useState([{
    id: 1,
    text: "Update website messaging",
    completed: false
  }, {
    id: 2,
    text: "Launch content marketing series",
    completed: false
  }, {
    id: 3,
    text: "Implement customer onboarding sequence",
    completed: false
  }]);
  const [newTodoText, setNewTodoText] = useState("");

  // Checklist completion state
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [completedSubTasks, setCompletedSubTasks] = useState(new Set());

  // Simulate blueprint generation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsGenerating(false);
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    return () => clearInterval(timer);
  }, []);

  // Mock data - in real implementation, this would come from completed modules
  const mockBrandData = {
    companyName: "TechFlow Solutions",
    purpose: "Empowering small businesses to thrive in the digital age",
    vision: "A world where every small business has access to enterprise-level technology",
    mission: "To provide intuitive, affordable tech solutions that grow with your business",
    targetAudience: "Small business owners (25-45) seeking digital transformation",
    positioning: "For small business owners who need reliable tech solutions, TechFlow is the platform that grows with your business because of our scalable architecture and personal support.",
    personality: ["Reliable", "Innovative", "Supportive"],
    differentiators: {
      product: 8,
      distribution: 6,
      marketing: 7,
      pricing: 9
    },
    promise: "Technology that works as hard as you do",
    reasonsToBelieve: ["99.9% uptime guarantee", "24/7 customer support", "Scalable pricing model", "Integration with 100+ business tools"],
    pillars: [{
      name: "Customer Success",
      purpose: "Ensure every customer achieves their business goals",
      action: "Launch customer success program with quarterly check-ins",
      subTasks: [
        "Set up customer health scoring system",
        "Create quarterly review meeting templates",
        "Implement customer feedback tracking"
      ]
    }, {
      name: "Product Innovation",
      purpose: "Stay ahead with cutting-edge features",
      action: "Implement monthly feature releases based on user feedback",
      subTasks: [
        "Establish feature request collection system",
        "Set up monthly development sprint cycles",
        "Create user testing feedback loop"
      ]
    }, {
      name: "Market Expansion",
      purpose: "Reach new business segments",
      action: "Develop partnerships with 3 industry associations",
      subTasks: [
        "Research and identify target industry associations",
        "Prepare partnership proposal presentations",
        "Schedule meetings with association leaders"
      ]
    }],
    quickWins: ["Update website messaging", "Launch content marketing series", "Implement customer onboarding sequence"],
    voiceTone: ["Professional", "Empathetic", "Direct"]
  };
  const downloadDocument = (type: 'summary' | 'guidelines' | 'both') => {
    console.log(`Downloading ${type} document(s)`);
    // In real implementation, this would generate and download the actual documents
  };
  const shareStrategy = () => {
    const shareUrl = `${mockBrandData.companyName.toLowerCase().replace(/\s+/g, '')}.yourbrandstrategist.com`;
    navigator.clipboard.writeText(shareUrl);
    console.log(`Copied share URL: ${shareUrl}`);
  };

  // Todo list functions
  const toggleTodo = (id: number) => {
    setTodoItems(items => items.map(item => item.id === id ? {
      ...item,
      completed: !item.completed
    } : item));
  };
  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false
      };
      setTodoItems(items => [...items, newTodo]);
      setNewTodoText("");
    }
  };
  const removeTodo = (id: number) => {
    setTodoItems(items => items.filter(item => item.id !== id));
  };

  // Task completion handler
  const toggleTaskCompletion = (taskId: string) => {
    setCompletedTasks(prev => {
      const newCompleted = new Set(prev);
      if (newCompleted.has(taskId)) {
        newCompleted.delete(taskId);
      } else {
        newCompleted.add(taskId);
      }
      return newCompleted;
    });
  };

  // Sub-task completion handler
  const toggleSubTaskCompletion = (subTaskId: string, pillarIndex: number) => {
    setCompletedSubTasks(prev => {
      const newCompleted = new Set(prev);
      if (newCompleted.has(subTaskId)) {
        newCompleted.delete(subTaskId);
      } else {
        newCompleted.add(subTaskId);
      }
      
      // Check if all 3 sub-tasks for this pillar are completed
      let subTasksForPillar;
      let mainTaskId;
      
      if (pillarIndex <= 2) {
        // For the brand pillars (0, 1, 2)
        subTasksForPillar = [
          `strategic-${pillarIndex + 1}-sub-1`,
          `strategic-${pillarIndex + 1}-sub-2`, 
          `strategic-${pillarIndex + 1}-sub-3`
        ];
        mainTaskId = `strategic-${pillarIndex + 1}`;
      } else if (pillarIndex === 3) {
        // For brand audit task
        subTasksForPillar = [
          'strategic-audit-sub-1',
          'strategic-audit-sub-2',
          'strategic-audit-sub-3'
        ];
        mainTaskId = 'strategic-audit';
      } else if (pillarIndex === 4) {
        // For strategic planning task
        subTasksForPillar = [
          'strategic-planning-sub-1',
          'strategic-planning-sub-2',
          'strategic-planning-sub-3'
        ];
        mainTaskId = 'strategic-planning';
      }
      
      const allSubTasksCompleted = subTasksForPillar.every(id => 
        id === subTaskId ? newCompleted.has(id) : completedSubTasks.has(id)
      );
      
      // Auto-complete main task if all sub-tasks are done
      if (allSubTasksCompleted) {
        setCompletedTasks(prevMain => {
          const newMainCompleted = new Set(prevMain);
          newMainCompleted.add(mainTaskId);
          return newMainCompleted;
        });
      } else {
        // Remove main task completion if not all sub-tasks are done
        setCompletedTasks(prevMain => {
          const newMainCompleted = new Set(prevMain);
          newMainCompleted.delete(mainTaskId);
          return newMainCompleted;
        });
      }
      
      return newCompleted;
    });
  };
  if (isGenerating) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Target className="w-10 h-10 text-primary animate-pulse" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Generating Your Brand Blueprint</h2>
            <p className="text-muted-foreground">
              Synthesizing your strategy into actionable documents...
            </p>
          </div>
          
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">{progress}% Complete</p>
          </div>
          
          <div className="text-left text-sm text-muted-foreground space-y-1">
            <div className={`flex items-center gap-2 ${progress >= 20 ? 'text-primary' : ''}`}>
              <CheckCircle className={`w-4 h-4 ${progress >= 20 ? 'text-green-500' : 'text-muted-foreground'}`} />
              Processing strategic pillars
            </div>
            <div className={`flex items-center gap-2 ${progress >= 40 ? 'text-primary' : ''}`}>
              <CheckCircle className={`w-4 h-4 ${progress >= 40 ? 'text-green-500' : 'text-muted-foreground'}`} />
              Analyzing positioning & differentiation
            </div>
            <div className={`flex items-center gap-2 ${progress >= 60 ? 'text-primary' : ''}`}>
              <CheckCircle className={`w-4 h-4 ${progress >= 60 ? 'text-green-500' : 'text-muted-foreground'}`} />
              Creating action plan framework
            </div>
            <div className={`flex items-center gap-2 ${progress >= 80 ? 'text-primary' : ''}`}>
              <CheckCircle className={`w-4 h-4 ${progress >= 80 ? 'text-green-500' : 'text-muted-foreground'}`} />
              Generating brand guidelines
            </div>
            <div className={`flex items-center gap-2 ${progress >= 100 ? 'text-primary' : ''}`}>
              <CheckCircle className={`w-4 h-4 ${progress >= 100 ? 'text-green-500' : 'text-muted-foreground'}`} />
              Finalizing blueprint
            </div>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">🎉 Your Brand Blueprint is Ready!</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Congratulations! Your comprehensive brand strategy has been synthesized into actionable documents. 
            Your brand is now ready for consistent, strategic implementation.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button onClick={() => downloadDocument('summary')} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download One-Page Summary
          </Button>
          <Button onClick={() => downloadDocument('guidelines')} variant="outline" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Download Full Guidelines
          </Button>
          <Button onClick={shareStrategy} variant="outline" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Strategy
          </Button>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">One-Page Summary</TabsTrigger>
            <TabsTrigger value="guidelines">Brand Guidelines</TabsTrigger>
            <TabsTrigger value="action-plan">Action Plan</TabsTrigger>
            <TabsTrigger value="brand-kit">Brand Kit</TabsTrigger>
          </TabsList>

          {/* One-Page Summary */}
          <TabsContent value="summary" className="space-y-6">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-primary/10">
                <CardTitle className="text-2xl">{mockBrandData.companyName}</CardTitle>
                <p className="text-muted-foreground">Brand Strategy Summary</p>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {/* Purpose & Vision */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      Purpose
                    </h3>
                    <p className="text-sm">{mockBrandData.purpose}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Vision</h3>
                    <p className="text-sm">{mockBrandData.vision}</p>
                  </div>
                </div>

                <Separator />

                {/* Target Audience & Positioning */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Target Audience
                    </h3>
                    <p className="text-sm">{mockBrandData.targetAudience}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Positioning Statement</h3>
                    <p className="text-sm italic bg-muted/50 p-3 rounded">"{mockBrandData.positioning}"</p>
                  </div>
                </div>

                <Separator />

                {/* Brand Personality & Voice */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      Personality Traits
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {mockBrandData.personality.map((trait, index) => <Badge key={index} variant="secondary">{trait}</Badge>)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Voice & Tone</h3>
                    <div className="flex flex-wrap gap-2">
                      {mockBrandData.voiceTone.map((tone, index) => <Badge key={index} variant="outline">{tone}</Badge>)}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Brand Promise & Differentiators */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      Brand Promise
                    </h3>
                    <p className="text-sm font-medium text-primary">"{mockBrandData.promise}"</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Reasons to Believe</h3>
                    <ul className="text-sm space-y-1">
                      {mockBrandData.reasonsToBelieve.map((reason, index) => <li key={index} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {reason}
                        </li>)}
                    </ul>
                  </div>
                </div>

                <Separator />

                {/* Strategic Pillars */}
                <div>
                  <h3 className="font-semibold mb-4">Strategic Pillars</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {mockBrandData.pillars.map((pillar, index) => <div key={index} className="p-3 border rounded-lg">
                        <h4 className="font-medium text-sm mb-1">{pillar.name}</h4>
                        <p className="text-xs text-muted-foreground">{pillar.purpose}</p>
                      </div>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Brand Guidelines */}
          <TabsContent value="guidelines" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Messaging Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Messages</h4>
                    <ul className="text-sm space-y-1">
                      <li>• {mockBrandData.promise}</li>
                      <li>• Technology that scales with your business</li>
                      <li>• Professional support, personal touch</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Language to Use</h4>
                    <div className="text-sm space-y-1">
                      <p>• Empowering, supportive, reliable</p>
                      <p>• Solution-focused, growth-oriented</p>
                      <p>• Clear, jargon-free explanations</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Language to Avoid</h4>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p>• Complex technical jargon</p>
                      <p>• Overly corporate language</p>
                      <p>• Negative or limiting terms</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Differentiation Matrix
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(mockBrandData.differentiators).map(([key, value]) => <div key={key} className="flex justify-between items-center">
                        <span className="text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{
                          width: `${(value as number) * 10}%`
                        }} />
                          </div>
                          <span className="text-sm font-medium text-primary">{value}/10</span>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Action Plan */}
          <TabsContent value="action-plan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  90-Day Sprint Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Part 1: Quick Wins (0-15 days) */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">1</span>
                      </div>
                      <h3 className="font-semibold text-lg">Quick Wins (Days 0-15)</h3>
                    </div>
                    <div className="ml-11 space-y-3">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Checkbox 
                          checked={completedTasks.has('quick-win-1')} 
                          onCheckedChange={() => toggleTaskCompletion('quick-win-1')} 
                        />
                        <span className="text-sm flex-1">Update website messaging with new brand positioning</span>
                        <Badge 
                          variant={completedTasks.has('quick-win-1') ? "default" : "secondary"}
                          className={completedTasks.has('quick-win-1') ? "bg-green-500" : ""}
                        >
                          {completedTasks.has('quick-win-1') ? "Completed" : "Quick Win"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Checkbox 
                          checked={completedTasks.has('quick-win-2')} 
                          onCheckedChange={() => toggleTaskCompletion('quick-win-2')} 
                        />
                        <span className="text-sm flex-1">Create email signature with consistent brand elements</span>
                        <Badge 
                          variant={completedTasks.has('quick-win-2') ? "default" : "secondary"}
                          className={completedTasks.has('quick-win-2') ? "bg-green-500" : ""}
                        >
                          {completedTasks.has('quick-win-2') ? "Completed" : "Quick Win"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Checkbox 
                          checked={completedTasks.has('quick-win-3')} 
                          onCheckedChange={() => toggleTaskCompletion('quick-win-3')} 
                        />
                        <span className="text-sm flex-1">Update social media profiles with new brand voice</span>
                        <Badge 
                          variant={completedTasks.has('quick-win-3') ? "default" : "secondary"}
                          className={completedTasks.has('quick-win-3') ? "bg-green-500" : ""}
                        >
                          {completedTasks.has('quick-win-3') ? "Completed" : "Quick Win"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Checkbox 
                          checked={completedTasks.has('quick-win-4')} 
                          onCheckedChange={() => toggleTaskCompletion('quick-win-4')} 
                        />
                        <span className="text-sm flex-1">Launch first content piece showcasing brand personality</span>
                        <Badge 
                          variant={completedTasks.has('quick-win-4') ? "default" : "secondary"}
                          className={completedTasks.has('quick-win-4') ? "bg-green-500" : ""}
                        >
                          {completedTasks.has('quick-win-4') ? "Completed" : "Quick Win"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Part 2: Momentum Builders (15-45 days) */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">2</span>
                      </div>
                      <h3 className="font-semibold text-lg">Momentum Builders (Days 15-45)</h3>
                    </div>
                    <div className="ml-11 space-y-3">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Checkbox 
                          checked={completedTasks.has('momentum-1')} 
                          onCheckedChange={() => toggleTaskCompletion('momentum-1')} 
                        />
                        <span className="text-sm flex-1">Implement customer onboarding sequence with brand messaging</span>
                        <Badge 
                          variant={completedTasks.has('momentum-1') ? "default" : "secondary"}
                          className={completedTasks.has('momentum-1') ? "bg-green-500" : ""}
                        >
                          {completedTasks.has('momentum-1') ? "Completed" : "Momentum Builder"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Checkbox 
                          checked={completedTasks.has('momentum-2')} 
                          onCheckedChange={() => toggleTaskCompletion('momentum-2')} 
                        />
                        <span className="text-sm flex-1">Launch content marketing series aligned with brand pillars</span>
                        <Badge 
                          variant={completedTasks.has('momentum-2') ? "default" : "secondary"}
                          className={completedTasks.has('momentum-2') ? "bg-green-500" : ""}
                        >
                          {completedTasks.has('momentum-2') ? "Completed" : "Momentum Builder"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Checkbox 
                          checked={completedTasks.has('momentum-3')} 
                          onCheckedChange={() => toggleTaskCompletion('momentum-3')} 
                        />
                        <span className="text-sm flex-1">Train team on brand voice and messaging guidelines</span>
                        <Badge 
                          variant={completedTasks.has('momentum-3') ? "default" : "secondary"}
                          className={completedTasks.has('momentum-3') ? "bg-green-500" : ""}
                        >
                          {completedTasks.has('momentum-3') ? "Completed" : "Momentum Builder"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Checkbox 
                          checked={completedTasks.has('momentum-4')} 
                          onCheckedChange={() => toggleTaskCompletion('momentum-4')} 
                        />
                        <span className="text-sm flex-1">Create brand-aligned sales materials and presentations</span>
                        <Badge 
                          variant={completedTasks.has('momentum-4') ? "default" : "secondary"}
                          className={completedTasks.has('momentum-4') ? "bg-green-500" : ""}
                        >
                          {completedTasks.has('momentum-4') ? "Completed" : "Momentum Builder"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Checkbox 
                          checked={completedTasks.has('momentum-5')} 
                          onCheckedChange={() => toggleTaskCompletion('momentum-5')} 
                        />
                        <span className="text-sm flex-1">Establish customer feedback loop for brand validation</span>
                        <Badge 
                          variant={completedTasks.has('momentum-5') ? "default" : "secondary"}
                          className={completedTasks.has('momentum-5') ? "bg-green-500" : ""}
                        >
                          {completedTasks.has('momentum-5') ? "Completed" : "Momentum Builder"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Part 3: Strategic Pillars (45-90 days) */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">3</span>
                      </div>
                      <h3 className="font-semibold text-lg">Strategic Pillars (Days 45-90)</h3>
                    </div>
                    <div className="ml-11 space-y-3">
                      {mockBrandData.pillars.map((pillar, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <Checkbox 
                              checked={completedTasks.has(`strategic-${index + 1}`)} 
                              disabled={true}
                            />
                            <h4 className="font-medium flex-1">{pillar.name}</h4>
                            <Badge 
                              variant={completedTasks.has(`strategic-${index + 1}`) ? "default" : "secondary"}
                              className={completedTasks.has(`strategic-${index + 1}`) ? "bg-green-500" : ""}
                            >
                              {completedTasks.has(`strategic-${index + 1}`) ? "Completed" : "Strategic Pillar"}
                            </Badge>
                          </div>
                          <div className="ml-8 mb-4">
                            <p className="text-sm text-muted-foreground">{pillar.purpose}</p>
                          </div>
                          
                          {/* Sub-tasks */}
                          <div className="ml-8 space-y-2">
                            <h5 className="text-sm font-medium text-muted-foreground mb-2">Sub-tasks:</h5>
                            {pillar.subTasks.map((subTask, subIndex) => (
                              <div key={subIndex} className="flex items-center gap-3 p-2 border rounded-md bg-muted/30">
                                <Checkbox 
                                  checked={completedSubTasks.has(`strategic-${index + 1}-sub-${subIndex + 1}`)} 
                                  onCheckedChange={() => toggleSubTaskCompletion(`strategic-${index + 1}-sub-${subIndex + 1}`, index)} 
                                />
                                <span className="text-xs flex-1">{subTask}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <Checkbox 
                            checked={completedTasks.has('strategic-audit')} 
                            disabled={true}
                          />
                          <h4 className="font-medium flex-1">Brand Audit & Performance Review</h4>
                          <Badge 
                            variant={completedTasks.has('strategic-audit') ? "default" : "secondary"}
                            className={completedTasks.has('strategic-audit') ? "bg-green-500" : ""}
                          >
                            {completedTasks.has('strategic-audit') ? "Completed" : "Strategic Pillar"}
                          </Badge>
                        </div>
                        <div className="ml-8 mb-4">
                          <p className="text-sm text-muted-foreground">Evaluate brand performance and identify areas for optimization.</p>
                        </div>
                        
                        {/* Sub-tasks */}
                        <div className="ml-8 space-y-2">
                          <h5 className="text-sm font-medium text-muted-foreground mb-2">Sub-tasks:</h5>
                          <div className="flex items-center gap-3 p-2 border rounded-md bg-muted/30">
                            <Checkbox 
                              checked={completedSubTasks.has('strategic-audit-sub-1')} 
                              onCheckedChange={() => toggleSubTaskCompletion('strategic-audit-sub-1', 3)} 
                            />
                            <span className="text-xs flex-1">Analyze brand sentiment and customer feedback</span>
                          </div>
                          <div className="flex items-center gap-3 p-2 border rounded-md bg-muted/30">
                            <Checkbox 
                              checked={completedSubTasks.has('strategic-audit-sub-2')} 
                              onCheckedChange={() => toggleSubTaskCompletion('strategic-audit-sub-2', 3)} 
                            />
                            <span className="text-xs flex-1">Review marketing performance metrics and ROI</span>
                          </div>
                          <div className="flex items-center gap-3 p-2 border rounded-md bg-muted/30">
                            <Checkbox 
                              checked={completedSubTasks.has('strategic-audit-sub-3')} 
                              onCheckedChange={() => toggleSubTaskCompletion('strategic-audit-sub-3', 3)} 
                            />
                            <span className="text-xs flex-1">Document lessons learned and optimization opportunities</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <Checkbox 
                            checked={completedTasks.has('strategic-planning')} 
                            disabled={true}
                          />
                          <h4 className="font-medium flex-1">Next Quarter Evolution Strategy</h4>
                          <Badge 
                            variant={completedTasks.has('strategic-planning') ? "default" : "secondary"}
                            className={completedTasks.has('strategic-planning') ? "bg-green-500" : ""}
                          >
                            {completedTasks.has('strategic-planning') ? "Completed" : "Strategic Pillar"}
                          </Badge>
                        </div>
                        <div className="ml-8 mb-4">
                          <p className="text-sm text-muted-foreground">Plan strategic brand evolution for continued growth and market positioning.</p>
                        </div>
                        
                        {/* Sub-tasks */}
                        <div className="ml-8 space-y-2">
                          <h5 className="text-sm font-medium text-muted-foreground mb-2">Sub-tasks:</h5>
                          <div className="flex items-center gap-3 p-2 border rounded-md bg-muted/30">
                            <Checkbox 
                              checked={completedSubTasks.has('strategic-planning-sub-1')} 
                              onCheckedChange={() => toggleSubTaskCompletion('strategic-planning-sub-1', 4)} 
                            />
                            <span className="text-xs flex-1">Define next quarter brand objectives and KPIs</span>
                          </div>
                          <div className="flex items-center gap-3 p-2 border rounded-md bg-muted/30">
                            <Checkbox 
                              checked={completedSubTasks.has('strategic-planning-sub-2')} 
                              onCheckedChange={() => toggleSubTaskCompletion('strategic-planning-sub-2', 4)} 
                            />
                            <span className="text-xs flex-1">Develop strategic initiative roadmap and timeline</span>
                          </div>
                          <div className="flex items-center gap-3 p-2 border rounded-md bg-muted/30">
                            <Checkbox 
                              checked={completedSubTasks.has('strategic-planning-sub-3')} 
                              onCheckedChange={() => toggleSubTaskCompletion('strategic-planning-sub-3', 4)} 
                            />
                            <span className="text-xs flex-1">Allocate resources and assign team responsibilities</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Brand Kit */}
          <TabsContent value="brand-kit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Brand Asset Hub
                </CardTitle>
                <p className="text-muted-foreground">
                  Organize and manage all your brand assets in one centralized location
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Brand Assets Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Logo Files */}
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Palette className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Logo Files</h4>
                        <p className="text-xs text-muted-foreground">SVG, PNG, JPG formats</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                        <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Drop logo files here</p>
                        <Button size="sm" variant="outline">
                          <Upload className="w-3 h-3 mr-1" />
                          Upload
                        </Button>
                      </div>
                      
                      {/* Sample uploaded file */}
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                            <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">logo-primary.svg</p>
                            <p className="text-xs text-muted-foreground">248 KB</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Brand Colors */}
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <div className="w-5 h-5 bg-gradient-to-br from-red-400 to-blue-400 rounded" />
                      </div>
                      <div>
                        <h4 className="font-medium">Color Palette</h4>
                        <p className="text-xs text-muted-foreground">HEX, RGB, CMYK codes</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Upload color swatches</p>
                        <Button size="sm" variant="outline">
                          <Upload className="w-3 h-3 mr-1" />
                          Upload
                        </Button>
                      </div>
                      
                      {/* Sample color palette */}
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-4 h-4 bg-blue-600 rounded-sm" />
                            <div className="w-4 h-4 bg-green-500 rounded-sm" />
                            <div className="w-4 h-4 bg-orange-400 rounded-sm" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">brand-colors.ase</p>
                            <p className="text-xs text-muted-foreground">12 KB</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Typography */}
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-lg">Aa</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Typography</h4>
                        <p className="text-xs text-muted-foreground">Font files & specimens</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                        <span className="text-2xl font-bold text-muted-foreground mb-2 block">Aa</span>
                        <p className="text-sm text-muted-foreground mb-2">Upload font files</p>
                        <Button size="sm" variant="outline">
                          <Upload className="w-3 h-3 mr-1" />
                          Upload
                        </Button>
                      </div>
                      
                      {/* Sample font */}
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                            <span className="text-primary font-bold text-sm">Aa</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Inter-Regular.woff2</p>
                            <p className="text-xs text-muted-foreground">156 KB</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Photography */}
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded" />
                      </div>
                      <div>
                        <h4 className="font-medium">Photography</h4>
                        <p className="text-xs text-muted-foreground">Style guide & samples</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Upload style guide</p>
                        <Button size="sm" variant="outline">
                          <Upload className="w-3 h-3 mr-1" />
                          Upload
                        </Button>
                      </div>
                      
                      {/* Sample photography */}
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded" />
                          <div>
                            <p className="text-sm font-medium">photo-style-guide.pdf</p>
                            <p className="text-xs text-muted-foreground">2.4 MB</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Icons */}
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Icon Library</h4>
                        <p className="text-xs text-muted-foreground">SVG icons & guidelines</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                        <Zap className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Upload icon set</p>
                        <Button size="sm" variant="outline">
                          <Upload className="w-3 h-3 mr-1" />
                          Upload
                        </Button>
                      </div>
                      
                      {/* Sample icons */}
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-0.5">
                              <div className="w-1 h-1 bg-primary rounded-full" />
                              <div className="w-1 h-1 bg-primary rounded-full" />
                              <div className="w-1 h-1 bg-primary rounded-full" />
                              <div className="w-1 h-1 bg-primary rounded-full" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium">icon-library.zip</p>
                            <p className="text-xs text-muted-foreground">89 KB</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Brand Guidelines */}
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Brand Guidelines</h4>
                        <p className="text-xs text-muted-foreground">Usage & standards</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                        <FileText className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Upload guidelines</p>
                        <Button size="sm" variant="outline">
                          <Upload className="w-3 h-3 mr-1" />
                          Upload
                        </Button>
                      </div>
                      
                      {/* Sample guidelines */}
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                            <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">brand-guidelines.pdf</p>
                            <p className="text-xs text-muted-foreground">5.2 MB</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Brand Hub Info */}
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg mt-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">Your Brand Hub</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        All your brand assets and guidelines are accessible to your team at your custom subdomain:
                      </p>
                      <div className="bg-background p-3 rounded border text-sm font-mono mb-4">
                        {mockBrandData.companyName.toLowerCase().replace(/\s+/g, '')}.yourbrandstrategist.com
                      </div>
                      <div className="flex gap-3">
                        <Button size="sm" className="flex items-center gap-2">
                          <Share2 className="w-3 h-3" />
                          Share Hub
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                          <Download className="w-3 h-3" />
                          Download All Assets
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
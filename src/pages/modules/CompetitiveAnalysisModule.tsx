import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ModuleIntro } from "@/components/modules/ModuleIntro";
import { CompetitiveAnalysisStrategy } from "@/components/modules/CompetitiveAnalysisStrategy";
import { ModuleSummary } from "@/components/modules/ModuleSummary";

interface ModuleData {
  id: string;
  title: string;
  description: string;
  introduction: {
    title: string;
    content: string;
    importance: string;
  };
  learningContent: {
    title: string;
    sections: Array<{
      title: string;
      content: string;
      keyPoints: string[];
    }>;
  };
    questions: Array<{
      id: string;
      type: 'binary' | 'mcq' | 'slider' | 'fill-blank' | 'text' | 'competitor-checklist' | 'competitor';
      question: string;
      options?: string[];
      competitors?: string[];
      min?: number;
      max?: number;
      placeholder?: string;
      required: boolean;
    }>;
}

const CompetitiveAnalysisModule = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const moduleData: ModuleData = {
    id: "competitive-analysis",
    title: "Who's in the Game? Competitors & Market Shifts",
    description: "Estimated Time: 14 minutes",
    introduction: {
      title: "Understand Your Competitive Landscape",
      content: "Competitive analysis reveals who you're up against and what market forces are shaping your industry. You'll identify direct competitors (same product/service, same target market) and indirect competitors (different solutions to the same customer problem). Understanding both your competition and market trends helps you position your brand strategically and identify opportunities for differentiation.",
      importance: "Companies that regularly analyze their competitive landscape are 2.5x more likely to grow market share and identify new opportunities. This analysis helps you understand what customers expect, where gaps exist in the market, and how to position your brand for maximum impact."
    },
    learningContent: {
      title: "Competitive Analysis Framework",
      sections: [
        {
          title: "Identifying Competitors: Direct vs. Indirect",
          content: "Direct competitors offer the same product or service to the same target market. Indirect competitors solve the same customer problem with a different approach or compete for the same customer budget. Understanding both types gives you a complete view of your competitive landscape and helps identify unexpected threats and opportunities.",
          keyPoints: [
            "Direct competitors target the same customers with similar solutions",
            "Indirect competitors solve the same problem differently",
            "Budget competitors compete for the same customer spending",
            "Consider who your customers actually compare you to"
          ]
        },
        {
          title: "Competitor Analysis Framework",
          content: "Systematic competitor analysis examines multiple dimensions: their product offerings and pricing strategy, brand messaging and positioning, target audience and customer experience, and core strengths and weaknesses. This framework ensures you gather comprehensive competitive intelligence rather than surface-level observations.",
          keyPoints: [
            "Analyze offerings, pricing, and value propositions",
            "Study their messaging, brand voice, and positioning",
            "Understand their target audience and customer journey",
            "Identify key strengths to learn from and weaknesses to exploit"
          ]
        },
        {
          title: "Market Trends: External Forces",
          content: "Market trends represent external forces that impact both your brand and customers. Use STEEP analysis to examine Social trends (changing behaviors), Technological advances, Economic factors, Environmental concerns, and Political/regulatory changes. These macro trends create opportunities and threats for all players in your market.",
          keyPoints: [
            "Social trends change customer expectations and behaviors",
            "Technology creates new possibilities and disrupts existing ones",
            "Economic factors affect purchasing power and priorities",
            "Environmental and political forces create new requirements"
          ]
        },
        {
          title: "Synthesizing Strategic Insights",
          content: "The goal is transforming competitive research into actionable insights. Look for patterns across competitors, identify market gaps and opportunities, spot threats that need addressing, and find areas where you can differentiate. Great insights connect competitive intelligence to strategic decisions about positioning, messaging, and market approach.",
          keyPoints: [
            "Look for patterns and common strategies across competitors",
            "Identify gaps where customer needs aren't being met",
            "Spot emerging trends that create new opportunities",
            "Connect insights to specific strategic decisions"
          ]
        },
        {
          title: "Competitive Strengths & Weaknesses Analysis",
          content: "Systematic evaluation of each competitor across key business dimensions helps identify where they excel and where they fall short. This analysis reveals opportunities for differentiation and areas where you need to match or exceed competitor performance. Focus on attributes that matter most to your target customers.",
          keyPoints: [
            "Evaluate each competitor across consistent criteria",
            "Focus on attributes that matter to your customers",
            "Identify where competitors are vulnerable",
            "Find opportunities to differentiate your offering"
          ]
        }
      ]
    },
    questions: [
      {
        id: "competitor-1",
        type: "competitor",
        question: "Competitor 1: Who is your first main direct competitor and what are they known for?",
        required: true
      },
      {
        id: "competitor-2",
        type: "competitor",
        question: "Competitor 2: Who is your second main direct competitor and what are they known for?",
        required: true
      },
      {
        id: "competitor-3",
        type: "competitor",
        question: "Competitor 3: Who is your third main direct competitor and what are they known for?",
        required: true
      },
      {
        id: "market-trends",
        type: "mcq",
        question: "Which of the following market trends are most significantly impacting your industry or target audience right now? (Select up to 3)",
        options: [
          "Increased demand for sustainability",
          "Rise of AI/Automation",
          "Shift to remote work",
          "Growing emphasis on mental wellness",
          "Personalization expectations",
          "Gig economy expansion",
          "Data privacy concerns",
          "Supply chain disruptions"
        ],
        required: true
      },
      {
        id: "strategic-insights",
        type: "text",
        question: "Based on your understanding of your target customer and the market, what are the THREE most important new insights you've gained that could influence your brand strategy?",
        placeholder: "Example: Our target audience is increasingly prioritizing ethical sourcing, even at a higher price point. Competitor X has a very strong community, which is a key differentiator for them.",
        required: true
      },
      {
        id: "competitor-checklist",
        type: "competitor-checklist",
        question: "For each of your 3 competitors, identify whether each business attribute is a strength or weakness for them:",
        competitors: [], // This will be populated dynamically based on competitor names
        required: true
      }
    ]
  };

  const handleModuleComplete = (answers: Record<string, any>) => {
    // Save the results and navigate back to progress
    console.log("Competitive Analysis module completed:", answers);
    // Here you could save to a database or local storage
    navigate("/progress");
  };

  const handleBack = () => {
    navigate("/progress");
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 0) {
      handleBack();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / 3) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Progress
              </Button>
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of 3
              </div>
            </div>
            <Progress value={progress} className="mb-4" />
            <div>
              <h1 className="text-3xl font-bold mb-2">{moduleData.title}</h1>
              <p className="text-muted-foreground">{moduleData.description}</p>
            </div>
          </div>

          {/* Content */}
          {currentStep === 0 && (
            <ModuleIntro
              data={moduleData.introduction}
              onNext={handleNext}
            />
          )}

          {currentStep === 1 && (
            <CompetitiveAnalysisStrategy
              learningContent={moduleData.learningContent}
              questions={moduleData.questions}
              onComplete={handleModuleComplete}
              onPrevious={handlePrevious}
            />
          )}

          {currentStep === 2 && (
            <ModuleSummary
              moduleTitle={moduleData.title}
              answers={{}}
              score={100}
              onComplete={() => handleModuleComplete({})}
              onBack={handlePrevious}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitiveAnalysisModule;
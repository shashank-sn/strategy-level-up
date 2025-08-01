import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ModuleIntro } from "./ModuleIntro";
import { StrategyBuilding } from "./StrategyBuilding";
import { ModuleSummary } from "./ModuleSummary";

export interface ModuleData {
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
    type: 'binary' | 'mcq' | 'slider' | 'fill-blank' | 'text' | 'competitor-checklist';
    question: string;
    options?: string[];
    competitors?: string[];
    min?: number;
    max?: number;
    placeholder?: string;
    required: boolean;
  }>;
  frameworks?: Array<{
    title: string;
    description: string;
    component: string;
  }>;
}

interface ModuleWrapperProps {
  moduleData: ModuleData;
  onComplete: (answers: Record<string, any>, score: number) => void;
  onBack: () => void;
}

export const ModuleWrapper = ({ moduleData, onComplete, onBack }: ModuleWrapperProps) => {
  const steps = ["intro", "strategy", "summary"] as const;
  type Step = typeof steps[number];

  const [currentStep, setCurrentStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleStrategyComplete = (strategyAnswers: Record<string, any>) => {
    setAnswers(strategyAnswers);
    setCurrentStep("summary");
  };

  const handleModuleComplete = () => {
    onComplete(answers, 0); // No scoring for strategy building
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "intro":
        return (
          <ModuleIntro
            data={moduleData.introduction}
            onNext={handleNext}
          />
        );
      case "strategy":
        return (
          <StrategyBuilding
            learningContent={moduleData.learningContent}
            questions={moduleData.questions}
            onComplete={handleStrategyComplete}
            onPrevious={handlePrevious}
          />
        );
      case "summary":
        return (
          <ModuleSummary
            moduleTitle={moduleData.title}
            answers={answers}
            score={0}
            onComplete={handleModuleComplete}
            onBack={onBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Progress
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">{moduleData.title}</h1>
              <p className="text-muted-foreground">{moduleData.description}</p>
            </div>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>
                {currentStep === "intro" && "Introduction"}
                {currentStep === "strategy" && "Strategy Building"}
                {currentStep === "summary" && "Summary"}
              </span>
              <span>{Math.round(((steps.indexOf(currentStep) + 1) / steps.length) * 100)}% Complete</span>
            </div>
            <Progress value={((steps.indexOf(currentStep) + 1) / steps.length) * 100} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span className={currentStep === "intro" ? 'text-primary font-medium' : ''}>Introduction</span>
              <span className={currentStep === "strategy" ? 'text-primary font-medium' : ''}>Strategy Building</span>
              <span className={currentStep === "summary" ? 'text-primary font-medium' : ''}>Summary</span>
            </div>
          </div>

          {/* Current Step Content */}
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};
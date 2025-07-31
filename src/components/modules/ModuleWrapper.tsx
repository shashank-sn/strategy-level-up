import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ModuleIntro } from "./ModuleIntro";
import { LearningContent } from "./LearningContent";
import { InteractiveQuestions } from "./InteractiveQuestions";
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
    type: 'binary' | 'mcq' | 'slider' | 'fill-blank' | 'text';
    question: string;
    options?: string[];
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
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  
  const steps = ['intro', 'learning', 'questions', 'summary'];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleQuestionsComplete = (questionAnswers: Record<string, any>) => {
    setAnswers(questionAnswers);
    setCurrentStep(currentStep + 1);
  };

  const handleModuleComplete = (score: number) => {
    onComplete(answers, score);
  };

  const renderCurrentStep = () => {
    switch (steps[currentStep]) {
      case 'intro':
        return <ModuleIntro data={moduleData.introduction} onNext={handleNext} />;
      case 'learning':
        return <LearningContent data={moduleData.learningContent} onNext={handleNext} onPrevious={handlePrevious} />;
      case 'questions':
        return <InteractiveQuestions questions={moduleData.questions} onComplete={handleQuestionsComplete} onPrevious={handlePrevious} />;
      case 'summary':
        return <ModuleSummary moduleData={moduleData} answers={answers} onComplete={handleModuleComplete} onPrevious={handlePrevious} />;
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
              Back to Journey
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
              <span>Module Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span className={currentStep >= 0 ? 'text-primary' : ''}>Introduction</span>
              <span className={currentStep >= 1 ? 'text-primary' : ''}>Learning</span>
              <span className={currentStep >= 2 ? 'text-primary' : ''}>Questions</span>
              <span className={currentStep >= 3 ? 'text-primary' : ''}>Summary</span>
            </div>
          </div>

          {/* Current Step Content */}
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};
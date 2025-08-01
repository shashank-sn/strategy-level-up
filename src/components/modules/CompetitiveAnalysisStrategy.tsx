import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BinaryQuestion } from "./questions/BinaryQuestion";
import { MCQQuestion } from "./questions/MCQQuestion";
import { SliderQuestion } from "./questions/SliderQuestion";
import { FillBlankQuestion } from "./questions/FillBlankQuestion";
import { TextQuestion } from "./questions/TextQuestion";
import { CompetitorChecklistQuestion } from "./questions/CompetitorChecklistQuestion";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Question {
  id: string;
  type: "binary" | "mcq" | "slider" | "fill-blank" | "text" | "competitor-checklist";
  question: string;
  options?: string[];
  competitors?: string[];
  min?: number;
  max?: number;
  placeholder?: string;
  required?: boolean;
}

interface Section {
  title: string;
  content: string;
  keyPoints?: string[];
}

interface LearningContent {
  title: string;
  sections: Section[];
}

interface CompetitiveAnalysisStrategyProps {
  learningContent: LearningContent;
  questions: Question[];
  onComplete: (answers: Record<string, any>) => void;
  onPrevious: () => void;
}

export const CompetitiveAnalysisStrategy = ({ 
  learningContent, 
  questions, 
  onComplete, 
  onPrevious 
}: CompetitiveAnalysisStrategyProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  // Dynamically populate competitors for the checklist question
  const processedQuestions = useMemo(() => {
    return questions.map(question => {
      if (question.type === "competitor-checklist") {
        const competitors = [
          answers["competitor-1-name"],
          answers["competitor-2-name"], 
          answers["competitor-3-name"]
        ].filter(Boolean);
        
        return {
          ...question,
          competitors: competitors
        };
      }
      return question;
    });
  }, [questions, answers]);

  const currentQuestion = processedQuestions[currentQuestionIndex];
  const currentSection = learningContent.sections[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isAnswered = (question: Question): boolean => {
    const answer = answers[question.id];
    if (!question.required) return true;
    if (question.type === "binary") return answer !== undefined;
    if (question.type === "slider") return answer !== undefined;
    if (question.type === "competitor-checklist") {
      // For checklist, check if at least some attributes are filled for the available competitors
      const competitors = (question as any).competitors || [];
      if (competitors.length === 0) return false;
      return answer && Object.keys(answer).length > 0;
    }
    return answer && answer.toString().trim() !== "";
  };

  const renderQuestion = (question: Question) => {
    const answer = answers[question.id];
    
    switch (question.type) {
      case "binary":
        return (
          <BinaryQuestion
            question={question}
            value={answer}
            onChange={(value) => handleAnswerChange(question.id, value)}
          />
        );
      case "mcq":
        return (
          <MCQQuestion
            question={question}
            value={answer}
            onChange={(value) => handleAnswerChange(question.id, value)}
          />
        );
      case "slider":
        return (
          <SliderQuestion
            question={question}
            value={answer}
            onChange={(value) => handleAnswerChange(question.id, value)}
          />
        );
      case "fill-blank":
        return (
          <FillBlankQuestion
            question={question}
            value={answer}
            onChange={(value) => handleAnswerChange(question.id, value)}
          />
        );
      case "text":
        return (
          <TextQuestion
            question={question}
            value={answer}
            onChange={(value) => handleAnswerChange(question.id, value)}
          />
        );
      case "competitor-checklist":
        const competitors = (question as any).competitors || [];
        if (competitors.length === 0) {
          return (
            <div className="p-4 text-center text-muted-foreground">
              <p>Please complete the competitor name questions first to proceed with this analysis.</p>
            </div>
          );
        }
        return (
          <CompetitorChecklistQuestion
            question={{
              id: question.id,
              question: question.question,
              competitors: competitors
            }}
            value={answer}
            onChange={(value) => handleAnswerChange(question.id, value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{learningContent.title}</h2>
        <p className="text-muted-foreground">
          Build your brand strategy step by step
        </p>
      </div>

      <div className="flex justify-between text-sm text-muted-foreground mb-4">
        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="mb-6" />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Learning Context */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">{currentSection?.title}</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {currentSection?.content}
            </p>
            {currentSection?.keyPoints && (
              <div>
                <h4 className="font-medium mb-2">Key Points:</h4>
                <ul className="space-y-1">
                  {currentSection.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start">
                      <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Strategy Question */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Build Your Strategy</h3>
            {renderQuestion(currentQuestion)}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={currentQuestionIndex === 0 ? onPrevious : handlePreviousQuestion}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          {currentQuestionIndex === 0 ? "Back to Introduction" : "Previous"}
        </Button>

        <Button
          onClick={handleNext}
          disabled={!isAnswered(currentQuestion)}
          className="flex items-center gap-2"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Strategy"}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
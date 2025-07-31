import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BinaryQuestion } from "./questions/BinaryQuestion";
import { MCQQuestion } from "./questions/MCQQuestion";
import { SliderQuestion } from "./questions/SliderQuestion";
import { FillBlankQuestion } from "./questions/FillBlankQuestion";
import { TextQuestion } from "./questions/TextQuestion";

interface Question {
  id: string;
  type: 'binary' | 'mcq' | 'slider' | 'fill-blank' | 'text';
  question: string;
  options?: string[];
  min?: number;
  max?: number;
  placeholder?: string;
  required: boolean;
}

interface InteractiveQuestionsProps {
  questions: Question[];
  onComplete: (answers: Record<string, any>) => void;
  onPrevious: () => void;
}

export const InteractiveQuestions = ({ questions, onComplete, onPrevious }: InteractiveQuestionsProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQ.id] !== undefined && answers[currentQ.id] !== '';
  const canProceed = !currentQ.required || isAnswered;

  const renderQuestion = () => {
    const commonProps = {
      question: currentQ,
      value: answers[currentQ.id],
      onChange: (value: any) => handleAnswerChange(currentQ.id, value)
    };

    switch (currentQ.type) {
      case 'binary':
        return <BinaryQuestion {...commonProps} />;
      case 'mcq':
        return <MCQQuestion {...commonProps} />;
      case 'slider':
        return <SliderQuestion {...commonProps} />;
      case 'fill-blank':
        return <FillBlankQuestion {...commonProps} />;
      case 'text':
        return <TextQuestion {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Question Progress</span>
            <span>{currentQuestion + 1} of {questions.length}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Question {currentQuestion + 1}
            {currentQ.required && <span className="text-destructive ml-1">*</span>}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {renderQuestion()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={currentQuestion === 0 ? onPrevious : handlePrevious}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {currentQuestion === 0 ? 'Back to Learning' : 'Previous Question'}
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="flex items-center gap-2"
        >
          {currentQuestion === questions.length - 1 ? 'Complete Questions' : 'Next Question'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
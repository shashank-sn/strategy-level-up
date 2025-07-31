import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AuditAnswers } from "@/pages/BrandAudit";

interface AuditQuestionsProps {
  answers: AuditAnswers;
  setAnswers: (answers: AuditAnswers) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const questions = [
  {
    id: "mission",
    question: "Do you have a clear, written mission statement?",
    options: [
      { value: "4", label: "Yes, and it guides all our decisions" },
      { value: "3", label: "Yes, but it's not always followed" },
      { value: "2", label: "We have something informal" },
      { value: "1", label: "No, we don't have one" }
    ]
  },
  {
    id: "target_audience",
    question: "How well do you know your target audience?",
    options: [
      { value: "4", label: "Very well - we have detailed personas" },
      { value: "3", label: "Pretty well - we know the basics" },
      { value: "2", label: "Somewhat - we have general ideas" },
      { value: "1", label: "Not well - we're still figuring it out" }
    ]
  },
  {
    id: "brand_voice",
    question: "Do you have a consistent brand voice and tone?",
    options: [
      { value: "4", label: "Yes, documented and consistently used" },
      { value: "3", label: "Yes, but not always consistent" },
      { value: "2", label: "Somewhat - it varies by platform" },
      { value: "1", label: "No, our tone is inconsistent" }
    ]
  },
  {
    id: "visual_identity",
    question: "How developed is your visual brand identity?",
    options: [
      { value: "4", label: "Complete brand guidelines with logo, colors, fonts" },
      { value: "3", label: "Logo and some guidelines" },
      { value: "2", label: "Just a logo" },
      { value: "1", label: "No consistent visual identity" }
    ]
  },
  {
    id: "differentiation",
    question: "Can you clearly explain what makes you different from competitors?",
    options: [
      { value: "4", label: "Absolutely - we have a clear unique value proposition" },
      { value: "3", label: "Yes, but it could be clearer" },
      { value: "2", label: "Somewhat - we know some differences" },
      { value: "1", label: "Not really - we struggle with this" }
    ]
  },
  {
    id: "consistency",
    question: "How consistent is your brand across all touchpoints?",
    options: [
      { value: "4", label: "Very consistent across all channels" },
      { value: "3", label: "Mostly consistent with some variations" },
      { value: "2", label: "Somewhat consistent" },
      { value: "1", label: "Inconsistent across different channels" }
    ]
  },
  {
    id: "values",
    question: "Are your brand values clearly defined and communicated?",
    options: [
      { value: "4", label: "Yes, clearly defined and actively communicated" },
      { value: "3", label: "Defined but not always communicated" },
      { value: "2", label: "Somewhat defined" },
      { value: "1", label: "Not clearly defined" }
    ]
  },
  {
    id: "customer_perception",
    question: "Do you regularly gather feedback on brand perception?",
    options: [
      { value: "4", label: "Yes, we have regular feedback systems" },
      { value: "3", label: "Sometimes through surveys or reviews" },
      { value: "2", label: "Occasionally and informally" },
      { value: "1", label: "Rarely or never" }
    ]
  },
  {
    id: "brand_strategy",
    question: "Do you have a documented brand strategy?",
    options: [
      { value: "4", label: "Yes, comprehensive and regularly updated" },
      { value: "3", label: "Yes, but it needs updating" },
      { value: "2", label: "Basic strategy exists" },
      { value: "1", label: "No formal brand strategy" }
    ]
  },
  {
    id: "competitive_analysis",
    question: "How well do you understand your competitive landscape?",
    options: [
      { value: "4", label: "Very well - regular competitive analysis" },
      { value: "3", label: "Pretty well - occasional analysis" },
      { value: "2", label: "Somewhat - basic understanding" },
      { value: "1", label: "Not well - limited knowledge" }
    ]
  }
];

const AuditQuestions = ({ answers, setAnswers, onNext, onPrevious }: AuditQuestionsProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onNext();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onPrevious();
    }
  };

  const isAnswered = answers[questions[currentQuestion].id];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Brand Assessment</CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">
            {Math.round(progress)}% Complete
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium leading-relaxed">
            {questions[currentQuestion].question}
          </h3>
          
          <RadioGroup
            value={answers[questions[currentQuestion].id] || ""}
            onValueChange={(value) => handleAnswerChange(questions[currentQuestion].id, value)}
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option) => (
              <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <Label htmlFor={option.value} className="font-normal leading-relaxed cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handlePreviousQuestion}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentQuestion === 0 ? "Back to Sign In" : "Previous"}
          </Button>
          <Button onClick={handleNextQuestion} disabled={!isAnswered}>
            {currentQuestion === questions.length - 1 ? "View Results" : "Next Question"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuditQuestions;
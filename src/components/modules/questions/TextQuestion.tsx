import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Lightbulb } from "lucide-react";

interface TextQuestionProps {
  question: {
    id: string;
    question: string;
    placeholder?: string;
  };
  value: string | undefined;
  onChange: (value: string) => void;
}

export const TextQuestion = ({ question, value, onChange }: TextQuestionProps) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleOptimizeWithAI = async () => {
    if (!value || value.trim().length === 0) return;
    
    setIsOptimizing(true);
    // Simulate AI optimization
    setTimeout(() => {
      const optimizedText = `${value.trim()} [AI Enhanced: This response has been refined for clarity and impact.]`;
      onChange(optimizedText);
      setIsOptimizing(false);
    }, 2000);
  };

  const examples = [
    "Example: For a SaaS company like Salesforce, this might be...",
    "Example: Consider how Zoom approaches this challenge...",
    "Example: HubSpot demonstrates this principle by..."
  ];

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.question}</p>
      
      <div className="space-y-4">
        <Textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder || 'Share your thoughts in detail...'}
          className="min-h-[120px] resize-none"
        />
        
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowExamples(!showExamples)}
            className="flex items-center gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            {showExamples ? 'Hide Examples' : 'Show Examples'}
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={handleOptimizeWithAI}
            disabled={!value || value.trim().length === 0 || isOptimizing}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {isOptimizing ? 'Optimizing...' : 'Optimize with AI'}
          </Button>
        </div>

        {showExamples && (
          <Card className="bg-secondary/50">
            <CardContent className="pt-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                Contextual Examples
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {examples.map((example, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {example}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
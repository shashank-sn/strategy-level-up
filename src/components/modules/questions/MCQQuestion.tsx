import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface MCQQuestionProps {
  question: {
    id: string;
    question: string;
    options?: string[];
  };
  value: string | undefined;
  onChange: (value: string) => void;
}

export const MCQQuestion = ({ question, value, onChange }: MCQQuestionProps) => {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.question}</p>
      
      <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
        {question.options?.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`${question.id}-${index}`} />
            <Label 
              htmlFor={`${question.id}-${index}`} 
              className="text-sm font-normal cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
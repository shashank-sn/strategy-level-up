import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface BinaryQuestionProps {
  question: {
    id: string;
    question: string;
  };
  value: boolean | undefined;
  onChange: (value: boolean) => void;
}

export const BinaryQuestion = ({ question, value, onChange }: BinaryQuestionProps) => {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.question}</p>
      
      <div className="flex gap-4">
        <Button
          variant={value === true ? "default" : "outline"}
          onClick={() => onChange(true)}
          className="flex-1 h-16 flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          Yes
        </Button>
        
        <Button
          variant={value === false ? "default" : "outline"}
          onClick={() => onChange(false)}
          className="flex-1 h-16 flex items-center justify-center gap-2"
        >
          <X className="w-5 h-5" />
          No
        </Button>
      </div>
    </div>
  );
};
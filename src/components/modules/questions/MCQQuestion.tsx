import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface MCQQuestionProps {
  question: {
    id: string;
    question: string;
    options?: string[];
    maxSelections?: number;
  };
  value: string[] | undefined;
  onChange: (value: string[]) => void;
}

export const MCQQuestion = ({ question, value = [], onChange }: MCQQuestionProps) => {
  const handleOptionChange = (option: string, checked: boolean) => {
    const currentSelections = Array.isArray(value) ? value : [];
    const maxSelections = question.maxSelections || question.options.length;
    
    if (checked) {
      if (currentSelections.length < maxSelections) {
        onChange([...currentSelections, option]);
      }
    } else {
      onChange(currentSelections.filter(item => item !== option));
    }
  };

  const currentSelections = Array.isArray(value) ? value : [];
  const maxSelections = question.maxSelections || question.options.length;

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium mb-4">{question.question}</p>
      {question.maxSelections && (
        <p className="text-sm text-muted-foreground mb-4">
          Select up to {question.maxSelections} options ({currentSelections.length}/{question.maxSelections} selected)
        </p>
      )}
      
      <div className="space-y-3">
        {question.options?.map((option, index) => {
          const isSelected = currentSelections.includes(option);
          const canSelect = !isSelected || currentSelections.length < maxSelections;
          
          return (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={`${question.id}-${index}`}
                checked={isSelected}
                disabled={!canSelect && !isSelected}
                onCheckedChange={(checked) => handleOptionChange(option, checked as boolean)}
              />
              <Label 
                htmlFor={`${question.id}-${index}`} 
                className="text-sm font-normal cursor-pointer"
              >
                {option}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
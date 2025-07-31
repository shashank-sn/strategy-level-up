import { Slider } from "@/components/ui/slider";

interface SliderQuestionProps {
  question: {
    id: string;
    question: string;
    min?: number;
    max?: number;
  };
  value: number | undefined;
  onChange: (value: number) => void;
}

export const SliderQuestion = ({ question, value, onChange }: SliderQuestionProps) => {
  const min = question.min || 0;
  const max = question.max || 10;
  
  return (
    <div className="space-y-6">
      <p className="text-lg font-medium">{question.question}</p>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{min}</span>
          <span className="font-medium text-primary">
            {value !== undefined ? value : 'Not set'}
          </span>
          <span>{max}</span>
        </div>
        
        <Slider
          value={value !== undefined ? [value] : [5]}
          onValueChange={(values) => onChange(values[0])}
          min={min}
          max={max}
          step={1}
          className="w-full"
          defaultValue={[5]}
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
};
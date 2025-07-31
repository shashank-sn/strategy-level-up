import { Input } from "@/components/ui/input";

interface FillBlankQuestionProps {
  question: {
    id: string;
    question: string;
    placeholder?: string;
  };
  value: string | undefined;
  onChange: (value: string) => void;
}

export const FillBlankQuestion = ({ question, value, onChange }: FillBlankQuestionProps) => {
  // Split question text by underscores to show fill-in-the-blank format
  const parts = question.question.split('_____');
  
  return (
    <div className="space-y-4">
      <div className="text-lg font-medium flex flex-wrap items-center gap-2">
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && (
              <Input
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={question.placeholder || 'Your answer...'}
                className="inline-flex w-48 mx-2"
              />
            )}
          </span>
        ))}
      </div>
      
      {parts.length === 1 && (
        <Input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder || 'Your answer...'}
          className="w-full"
        />
      )}
    </div>
  );
};
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CompetitorQuestionProps {
  question: {
    id: string;
    question: string;
    placeholder?: string;
  };
  value: { name: string; description: string } | undefined;
  onChange: (value: { name: string; description: string }) => void;
}

export const CompetitorQuestion = ({ question, value, onChange }: CompetitorQuestionProps) => {
  const handleNameChange = (name: string) => {
    onChange({
      name,
      description: value?.description || ""
    });
  };

  const handleDescriptionChange = (description: string) => {
    onChange({
      name: value?.name || "",
      description
    });
  };

  return (
    <div className="space-y-6">
      <p className="text-lg font-medium">{question.question}</p>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor={`${question.id}-name`} className="text-sm font-medium">
            Competitor Name
          </Label>
          <Input
            id={`${question.id}-name`}
            placeholder="Enter competitor name"
            value={value?.name || ""}
            onChange={(e) => handleNameChange(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor={`${question.id}-description`} className="text-sm font-medium">
            Description & Key Attributes
          </Label>
          <Textarea
            id={`${question.id}-description`}
            placeholder="Describe 2-3 unique identifiers, key attributes, and perceived personality traits. What are they known for?"
            value={value?.description || ""}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className="mt-1 min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
};
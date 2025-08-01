import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CompetitorChecklistQuestionProps {
  question: {
    id: string;
    question: string;
    competitors: string[];
  };
  value: Record<string, Record<string, 'strength' | 'moderate' | 'weakness' | ''>> | undefined;
  onChange: (value: Record<string, Record<string, 'strength' | 'moderate' | 'weakness' | ''>>) => void;
}

const businessAttributes = [
  "Price",
  "Quality", 
  "Customer Service",
  "Innovation",
  "Brand Recognition",
  "Community"
];

export const CompetitorChecklistQuestion = ({ question, value, onChange }: CompetitorChecklistQuestionProps) => {
  const handleAttributeChange = (competitor: string, attribute: string, type: 'strength' | 'moderate' | 'weakness') => {
    const currentValue = value || {};
    const competitorData = currentValue[competitor] || {};
    
    // Toggle the selection
    const newValue = competitorData[attribute] === type ? '' : type;
    
    const updatedValue = {
      ...currentValue,
      [competitor]: {
        ...competitorData,
        [attribute]: newValue as 'strength' | 'moderate' | 'weakness' | ''
      }
    };
    
    onChange(updatedValue);
  };

  const getAttributeValue = (competitor: string, attribute: string): 'strength' | 'moderate' | 'weakness' | '' => {
    return value?.[competitor]?.[attribute] || '';
  };

  return (
    <div className="space-y-6">
      <p className="text-lg font-medium">{question.question}</p>
      
      {question.competitors.map((competitor, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">{competitor}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businessAttributes.map((attribute) => {
                const currentValue = getAttributeValue(competitor, attribute);
                return (
                  <div key={attribute} className="space-y-2">
                    <div className="font-medium text-sm">{attribute}</div>
                    <div className="flex gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${competitor}-${attribute}-strength`}
                          checked={currentValue === 'strength'}
                          onCheckedChange={() => handleAttributeChange(competitor, attribute, 'strength')}
                        />
                        <label 
                          htmlFor={`${competitor}-${attribute}-strength`}
                          className="text-sm cursor-pointer"
                        >
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Strength
                          </Badge>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${competitor}-${attribute}-moderate`}
                          checked={currentValue === 'moderate'}
                          onCheckedChange={() => handleAttributeChange(competitor, attribute, 'moderate')}
                        />
                        <label 
                          htmlFor={`${competitor}-${attribute}-moderate`}
                          className="text-sm cursor-pointer"
                        >
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            Moderate
                          </Badge>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${competitor}-${attribute}-weakness`}
                          checked={currentValue === 'weakness'}
                          onCheckedChange={() => handleAttributeChange(competitor, attribute, 'weakness')}
                        />
                        <label 
                          htmlFor={`${competitor}-${attribute}-weakness`}
                          className="text-sm cursor-pointer"
                        >
                          <Badge variant="secondary" className="bg-red-100 text-red-800">
                            Weakness
                          </Badge>
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
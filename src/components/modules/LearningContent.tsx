import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle } from "lucide-react";

interface LearningContentProps {
  data: {
    title: string;
    sections: Array<{
      title: string;
      content: string;
      keyPoints: string[];
    }>;
  };
  onNext: () => void;
  onPrevious: () => void;
}

export const LearningContent = ({ data, onNext, onPrevious }: LearningContentProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [readSections, setReadSections] = useState<Set<number>>(new Set());

  const handleSectionRead = () => {
    setReadSections(prev => new Set([...prev, currentSection]));
    if (currentSection < data.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handleNextSection = () => {
    if (currentSection < data.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const allSectionsRead = readSections.size === data.sections.length;
  const currentSectionData = data.sections[currentSection];

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {data.title}
          </CardTitle>
          <div className="flex gap-2 mt-4">
            {data.sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  index === currentSection
                    ? 'bg-primary text-primary-foreground'
                    : readSections.has(index)
                    ? 'bg-green-500 text-white'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {readSections.has(index) ? <CheckCircle className="w-4 h-4" /> : index + 1}
              </button>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Current Section Content */}
      <Card>
        <CardHeader>
          <CardTitle>{currentSectionData.title}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="prose max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {currentSectionData.content}
            </p>
          </div>

          <div className="bg-secondary/50 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Key Takeaways:</h4>
            <ul className="space-y-2">
              {currentSectionData.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section Navigation */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={handlePreviousSection}
              disabled={currentSection === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              {currentSection + 1} of {data.sections.length}
            </span>

            <Button
              onClick={currentSection === data.sections.length - 1 ? handleSectionRead : handleNextSection}
              className="flex items-center gap-2"
            >
              {currentSection === data.sections.length - 1 ? 'Mark as Read' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Module Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Introduction
        </Button>

        <Button
          onClick={onNext}
          disabled={!allSectionsRead}
          className="flex items-center gap-2"
        >
          Continue to Questions
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
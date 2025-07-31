import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

interface ModuleIntroProps {
  data: {
    title: string;
    content: string;
    importance: string;
  };
  onNext: () => void;
}

export const ModuleIntro = ({ data, onNext }: ModuleIntroProps) => {
  return (
    <Card className="border-primary/20">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-3xl">{data.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {data.content}
          </p>
        </div>

        <div className="bg-primary/5 rounded-lg p-6">
          <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Why This Matters
          </h3>
          <p className="text-muted-foreground">
            {data.importance}
          </p>
        </div>

        <div className="flex justify-center pt-6">
          <Button onClick={onNext} size="lg" className="flex items-center gap-2">
            Start Learning
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
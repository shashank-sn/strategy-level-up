import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, User, Users } from "lucide-react";

interface PersonaData {
  persona_name: string;
  persona_demographics: string;
  persona_profession: string;
  information_sources: string;
  core_needs_frustrations: string;
  money_vs_time: number;
  professional_vs_personal: number;
  solving_vs_experiencing: number;
  day_in_life: string;
}

interface AudienceQuestionnaireProps {
  onComplete: (personas: PersonaData[]) => void;
  onBack: () => void;
}

export const AudienceQuestionnaire = ({ onComplete, onBack }: AudienceQuestionnaireProps) => {
  const [currentProfile, setCurrentProfile] = useState(0);
  const [personas, setPersonas] = useState<PersonaData[]>([
    {
      persona_name: "",
      persona_demographics: "",
      persona_profession: "",
      information_sources: "",
      core_needs_frustrations: "",
      money_vs_time: 5,
      professional_vs_personal: 5,
      solving_vs_experiencing: 5,
      day_in_life: ""
    },
    {
      persona_name: "",
      persona_demographics: "",
      persona_profession: "",
      information_sources: "",
      core_needs_frustrations: "",
      money_vs_time: 5,
      professional_vs_personal: 5,
      solving_vs_experiencing: 5,
      day_in_life: ""
    },
    {
      persona_name: "",
      persona_demographics: "",
      persona_profession: "",
      information_sources: "",
      core_needs_frustrations: "",
      money_vs_time: 5,
      professional_vs_personal: 5,
      solving_vs_experiencing: 5,
      day_in_life: ""
    }
  ]);

  const updatePersona = (index: number, field: keyof PersonaData, value: string | number) => {
    setPersonas(prev => prev.map((persona, i) => 
      i === index ? { ...persona, [field]: value } : persona
    ));
  };

  const isPersonaComplete = (persona: PersonaData): boolean => {
    return persona.persona_name.trim() !== "" &&
           persona.persona_demographics.trim() !== "" &&
           persona.persona_profession.trim() !== "" &&
           persona.information_sources.trim() !== "" &&
           persona.core_needs_frustrations.trim() !== "" &&
           persona.day_in_life.trim() !== "";
  };

  const canSubmit = personas.every(isPersonaComplete);

  const handleSubmit = () => {
    onComplete(personas);
  };

  const renderPersonaForm = (persona: PersonaData, index: number) => (
    <Card key={index} className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Ideal Customer Profile #{index + 1}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Demographics */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Customer Name/Type
            </label>
            <Input
              value={persona.persona_name}
              onChange={(e) => updatePersona(index, "persona_name", e.target.value)}
              placeholder="Give your persona a representative name"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Demographics (Age, Family Status, Income)
            </label>
            <Input
              value={persona.persona_demographics}
              onChange={(e) => updatePersona(index, "persona_demographics", e.target.value)}
              placeholder="e.g., 25-35 years old, married with kids, $50k-75k income"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Profession & Location
            </label>
            <Input
              value={persona.persona_profession}
              onChange={(e) => updatePersona(index, "persona_profession", e.target.value)}
              placeholder="e.g., Marketing Manager, primarily urban areas"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Information Sources & Communication Preferences
            </label>
            <Input
              value={persona.information_sources}
              onChange={(e) => updatePersona(index, "information_sources", e.target.value)}
              placeholder="e.g., LinkedIn, industry blogs, prefers email communication"
            />
          </div>
        </div>

        {/* Core Needs & Frustrations */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Core Needs & Frustrations
          </label>
          <Textarea
            value={persona.core_needs_frustrations}
            onChange={(e) => updatePersona(index, "core_needs_frustrations", e.target.value)}
            placeholder="What are their 3-5 core needs and biggest frustrations that your brand addresses?"
            className="min-h-[100px]"
          />
        </div>

        {/* Motivation Sliders */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-4 block">
              Saving Money (1) vs. Saving Time (10)
            </label>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Saving Money</span>
                <span className="font-medium text-primary">{persona.money_vs_time}</span>
                <span>Saving Time</span>
              </div>
              <Slider
                value={[persona.money_vs_time]}
                onValueChange={([value]) => updatePersona(index, "money_vs_time", value)}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-4 block">
              Professional Growth (1) vs. Personal Well-being (10)
            </label>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Professional Growth</span>
                <span className="font-medium text-primary">{persona.professional_vs_personal}</span>
                <span>Personal Well-being</span>
              </div>
              <Slider
                value={[persona.professional_vs_personal]}
                onValueChange={([value]) => updatePersona(index, "professional_vs_personal", value)}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-4 block">
              Solving Problems (1) vs. Gaining Experiences (10)
            </label>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Solving Problems</span>
                <span className="font-medium text-primary">{persona.solving_vs_experiencing}</span>
                <span>Gaining Experiences</span>
              </div>
              <Slider
                value={[persona.solving_vs_experiencing]}
                onValueChange={([value]) => updatePersona(index, "solving_vs_experiencing", value)}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Day in Life */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            A Day in Their Life
          </label>
          <Textarea
            value={persona.day_in_life}
            onChange={(e) => updatePersona(index, "day_in_life", e.target.value)}
            placeholder="Walk us through a typical day in their life, focusing on moments where your brand could make a difference..."
            className="min-h-[120px]"
          />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Create Your Customer Personas</h2>
        <p className="text-muted-foreground">
          Build detailed profiles of your ideal customers to guide your brand strategy
        </p>
        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>All 3 customer personas are required</span>
        </div>
      </div>

      {/* Profile Navigation */}
      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3].map((profileNum) => (
          <Button
            key={profileNum}
            variant={currentProfile === profileNum - 1 ? "default" : "outline"}
            onClick={() => setCurrentProfile(profileNum - 1)}
            className="flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Profile {profileNum}
            {isPersonaComplete(personas[profileNum - 1]) && (
              <span className="w-2 h-2 bg-green-500 rounded-full ml-1" />
            )}
          </Button>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Understanding Your Audience</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Key Concepts:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Focus on specific audiences for stronger connections</li>
                <li>• Include both demographic and psychographic details</li>
                <li>• Base personas on real customer insights</li>
                <li>• Use personas to guide all strategic decisions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">What to Consider:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Demographics: age, income, location, family</li>
                <li>• Psychographics: values, motivations, fears</li>
                <li>• Behaviors: how they research and make decisions</li>
                <li>• Pain points: challenges your brand can solve</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {renderPersonaForm(personas[currentProfile], currentProfile)}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Progress
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex items-center gap-2"
        >
          Complete Persona Development
        </Button>
      </div>
    </div>
  );
};
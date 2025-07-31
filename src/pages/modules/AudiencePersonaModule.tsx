import { AudienceQuestionnaire } from "@/components/modules/AudienceQuestionnaire";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AudiencePersonaModule() {
  const navigate = useNavigate();

  const handleComplete = (personas: any[]) => {
    console.log("Audience Persona Module completed with personas:", personas);
    toast.success(`${personas.length} customer persona(s) created successfully!`);
    navigate("/brand-journey");
  };

  const handleBack = () => {
    navigate("/brand-journey");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <AudienceQuestionnaire
          onComplete={handleComplete}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
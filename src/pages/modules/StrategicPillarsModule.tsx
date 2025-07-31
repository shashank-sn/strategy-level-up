import { StrategicPillarsQuestionnaire } from "@/components/modules/StrategicPillarsQuestionnaire";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function StrategicPillarsModule() {
  const navigate = useNavigate();

  const handleComplete = (data: any) => {
    console.log("Strategic Pillars Module completed with data:", data);
    toast.success("Strategic blueprint and action plan completed!");
    navigate("/brand-blueprint");
  };

  const handleBack = () => {
    navigate("/brand-journey");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <StrategicPillarsQuestionnaire
          onComplete={handleComplete}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
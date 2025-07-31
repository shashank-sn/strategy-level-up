import { PositioningQuestionnaire } from "@/components/modules/PositioningQuestionnaire";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function PositioningModule() {
  const navigate = useNavigate();

  const handleComplete = (data: any) => {
    console.log("Positioning Module completed with data:", data);
    toast.success("Brand positioning and promise strategy completed!");
    navigate("/brand-journey");
  };

  const handleBack = () => {
    navigate("/brand-journey");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PositioningQuestionnaire
          onComplete={handleComplete}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
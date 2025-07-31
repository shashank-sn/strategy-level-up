import { GapAnalysisQuestionnaire } from "@/components/modules/GapAnalysisQuestionnaire";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function GapAnalysisModule() {
  const navigate = useNavigate();

  const handleComplete = (data: any) => {
    console.log("Gap Analysis Module completed with data:", data);
    toast.success("Gap analysis and differentiation strategy completed!");
    navigate("/brand-journey");
  };

  const handleBack = () => {
    navigate("/brand-journey");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <GapAnalysisQuestionnaire
          onComplete={handleComplete}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
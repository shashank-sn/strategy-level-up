import { BrandConceptQuestionnaire } from "@/components/modules/BrandConceptQuestionnaire";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function BrandConceptModule() {
  const navigate = useNavigate();

  const handleComplete = (data: any) => {
    console.log("Brand Concept Module completed with data:", data);
    toast.success("Brand concept and expression strategy completed!");
    navigate("/brand-journey");
  };

  const handleBack = () => {
    navigate("/brand-journey");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <BrandConceptQuestionnaire
          onComplete={handleComplete}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
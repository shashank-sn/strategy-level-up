import { AudienceQuestionnaire } from "@/components/modules/AudienceQuestionnaire";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export default function AudiencePersonaModule() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleComplete = async (personas: any[]) => {
    try {
      if (!user) {
        toast.error("Please sign in to save your personas.");
        return;
      }

      await supabase.from("audience_personas").delete().eq("user_id", user.id);

      const rows = personas.map((p: any, idx: number) => ({
        user_id: user.id,
        persona_name: p.persona_name,
        demographics: {
          demographics_text: p.persona_demographics,
          profession_location: p.persona_profession,
        },
        psychographics: {
          information_sources: p.information_sources,
          core_needs_frustrations: p.core_needs_frustrations,
          sliders: {
            money_vs_time: p.money_vs_time,
            professional_vs_personal: p.professional_vs_personal,
            solving_vs_experiencing: p.solving_vs_experiencing,
          },
          day_in_life: p.day_in_life,
        },
        is_primary: idx === 0,
      }));

      const { error } = await supabase.from("audience_personas").insert(rows);
      if (error) throw error;

      toast.success(`${personas.length} customer persona(s) saved successfully!`);
      navigate("/progress");
    } catch (e) {
      console.error("[AudiencePersonaModule] Save personas error", e);
      toast.error("Failed to save personas. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/progress");
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
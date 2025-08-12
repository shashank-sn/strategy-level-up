import { ModuleWrapper, ModuleData } from "@/components/modules/ModuleWrapper";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/contexts/ProgressContext";
import { toast } from "@/components/ui/use-toast";

const BrandFoundationModule = () => {
  const navigate = useNavigate();

  const moduleData: ModuleData = {
    id: "brand-foundation",
    title: "Brand Foundation: Discover Your Why, Where, and How",
    description: "Estimated Time: 15 minutes",
    introduction: {
      title: "Build Your Brand's North Star",
      content: "Your brand foundation consists of three interconnected elements that will guide every decision you make. Purpose is your brand's soul – the fundamental reason you exist beyond profit. Vision is your North Star – the grand future you're building toward. Mission is your action plan – how you'll achieve that vision and live your purpose.",
      importance: "A strong brand foundation creates clarity for your team, builds trust with customers, and ensures all your business decisions align with your core values. Companies with clear purpose, vision, and mission statements are 3x more likely to achieve sustainable growth and customer loyalty."
    },
    learningContent: {
      title: "Understanding the Three Pillars",
      sections: [
        {
          title: "Purpose: Your Brand's Soul",
          content: "Purpose is the fundamental reason a company exists beyond making money. It's why customers should truly care about your brand's presence in the world. Purpose answers the question: 'What problem do you solve or what positive change do you bring?' It's the driving force that motivates your team and resonates with your audience on an emotional level.",
          keyPoints: [
            "Purpose drives deeper meaning beyond profit",
            "It connects emotionally with customers and employees",
            "Purpose should address a real problem or need in the world",
            "Great purpose statements are simple, memorable, and inspiring"
          ]
        },
        {
          title: "Vision: Your North Star",
          content: "Your Vision is the aspirational future state your brand aims to create. It's the grand picture of the future you want to build – inspirational, long-term, and ambitious. Vision provides direction and hope, painting a picture of what success looks like when your purpose is fully realized.",
          keyPoints: [
            "Vision is aspirational and future-focused",
            "It should inspire and motivate stakeholders",
            "Vision statements are typically 10+ years out",
            "They describe the impact you want to make on the world"
          ]
        },
        {
          title: "Mission: Your Action Plan",
          content: "Your Mission is how you'll achieve your vision and live your purpose. It outlines your core activities, target audience, and approach. Mission describes what you do, for whom you do it, and how you do it. It's the bridge between your aspirational vision and daily operations.",
          keyPoints: [
            "Mission is actionable and present-focused",
            "It defines your target audience clearly",
            "Mission outlines your core activities and approach",
            "It should guide day-to-day decision making"
          ]
        },
        {
          title: "The Interconnection",
          content: "These three elements work together in harmony: Purpose fuels your Vision, giving it emotional resonance and deeper meaning. Vision provides the destination for your Mission, ensuring your actions are building toward something meaningful. Mission executes your Vision while staying true to your Purpose, creating a consistent and authentic brand experience.",
          keyPoints: [
            "Purpose provides the 'why' that fuels everything",
            "Vision sets the destination and inspiration",
            "Mission defines the path and daily actions",
            "All three must align for authentic brand building"
          ]
        }
      ]
    },
    questions: [
      {
        id: "profit-only",
        type: "binary",
        question: "Does your brand exist solely to generate profit?",
        required: true
      },
      {
        id: "purpose-statement",
        type: "text",
        question: "Beyond revenue, what is the fundamental reason your company exists? Why should anyone truly care about your brand's presence in the world? (Think about the problem you solve or the positive change you bring.)",
        placeholder: "Describe the deeper purpose that drives your brand beyond making money...",
        required: true
      },
      {
        id: "vision-statement",
        type: "text",
        question: "Imagine your brand has achieved its greatest impact 10 years from now. What does that future look like? What grand aspiration or desired state are you striving to create for your customers or the world?",
        placeholder: "Paint a picture of the future you're building toward...",
        required: true
      },
      {
        id: "mission-statement",
        type: "text",
        question: "How will your brand achieve its vision and live its purpose? What are the core activities you will undertake, and for whom are you doing it?",
        placeholder: "Describe your approach, activities, and target audience...",
        required: true
      }
    ]
  };

  const handleModuleComplete = (answers: Record<string, any>, score: number) => {
    // Save the results and navigate back to progress
    console.log("Module completed:", { answers, score });
    // Here you could save to a database or local storage
    navigate("/progress");
  };

  const handleBack = () => {
    navigate("/progress");
  };

  return (
    <ModuleWrapper
      moduleData={moduleData}
      onComplete={handleModuleComplete}
      onBack={handleBack}
    />
  );
};

export default BrandFoundationModule;
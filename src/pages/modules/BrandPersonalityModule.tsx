import { ModuleWrapper } from "@/components/modules/ModuleWrapper";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const moduleData = {
  id: "brand-personality",
  title: "Brand Personality & Values",
  description: "Define your brand's character and core values",
  introduction: {
    title: "Your Brand's Character: Personality & Core Values",
    content: "Your brand personality is how your brand would act, speak, and look if it were a person. Combined with your core values, this creates the foundation for all brand communications, decisions, and experiences that build authentic connections with your audience.",
    importance: "Brand personality and values aren't just marketing concepts—they're strategic assets that guide every decision, create emotional connections, and differentiate your brand in meaningful ways. This foundation ensures consistency across all touchpoints and builds trust through authentic expression."
  },
  learningContent: {
    title: "Defining Your Brand Character",
    sections: [
      {
        title: "Understanding Brand Personality",
        content: "Brand personality encompasses the human characteristics and traits your brand would exhibit if it were a person. This includes how your brand communicates, makes decisions, and interacts with the world around it.",
        keyPoints: [
          "Personality creates emotional connections beyond functional benefits",
          "Consistent personality builds recognition and familiarity",
          "Authentic personality attracts aligned customers and employees",
          "Personality guides communication tone, visual style, and behavior"
        ]
      },
      {
        title: "Brand Personality Spectrums",
        content: "Most brand personalities exist on various spectrums rather than absolutes. Understanding where your brand falls on key dimensions like innovative vs. traditional, or playful vs. serious, helps define your unique character.",
        keyPoints: [
          "Personality exists on spectrums, not as binary choices",
          "Different situations may call for different spectrum positions",
          "Balance creates more nuanced and authentic personalities",
          "Spectrums help differentiate from direct competitors"
        ]
      },
      {
        title: "Core Values Foundation", 
        content: "Core values are the fundamental beliefs that guide your brand's actions and decisions. They shape company culture, influence strategic choices, and communicate what your brand stands for beyond products or services.",
        keyPoints: [
          "Values guide decision-making in complex situations",
          "Strong values attract aligned customers and talent",
          "Values must be actionable, not just aspirational",
          "Authentic values create trust and credibility"
        ]
      },
      {
        title: "Brand Essence & Analogies",
        content: "Distilling your brand to its essence—whether through analogies, single words, or personality traits—creates clarity for internal teams and external communications. This clarity ensures consistent brand expression across all touchpoints.",
        keyPoints: [
          "Analogies make complex brands more relatable and memorable",
          "Single words create focus and clarity for decision-making",
          "Essence guides creative and strategic decisions",
          "Clear essence enables consistent brand expression"
        ]
      }
    ]
  },
  questions: [
    {
      id: "innovative_traditional",
      type: "slider" as const,
      question: "Where does your brand fall on the Innovative (1) vs. Traditional (10) spectrum?",
      min: 1,
      max: 10,
      required: true
    },
    {
      id: "playful_serious",
      type: "slider" as const,
      question: "Where does your brand fall on the Playful (1) vs. Serious (10) spectrum?",
      min: 1,
      max: 10,
      required: true
    },
    {
      id: "luxury_affordable",
      type: "slider" as const,
      question: "Where does your brand fall on the Luxury (1) vs. Affordable (10) spectrum?",
      min: 1,
      max: 10,
      required: true
    },
    {
      id: "friendly_authoritative",
      type: "slider" as const,
      question: "Where does your brand fall on the Friendly (1) vs. Authoritative (10) spectrum?",
      min: 1,
      max: 10,
      required: true
    },
    {
      id: "modern_classic",
      type: "slider" as const,
      question: "Where does your brand fall on the Modern (1) vs. Classic (10) spectrum?",
      min: 1,
      max: 10,
      required: true
    },
    {
      id: "brand_animal",
      type: "mcq" as const,
      question: "If your brand were an animal, which would it be?",
      options: [
        "Lion (Brave, Leader)",
        "Owl (Wise, Insightful)", 
        "Dolphin (Playful, Community-focused)",
        "Fox (Clever, Agile)",
        "Elephant (Strong, Loyal)"
      ],
      required: true
    },
    {
      id: "brand_as_person",
      type: "text" as const,
      question: "If your brand walked into a room as a real person, how would they look, talk, think, and act? Describe their key attributes, personality traits, and unique identifiers. (Focus on 3-5 key traits).",
      placeholder: "Describe your brand's human characteristics: appearance, communication style, behavior, and distinctive personality traits that would make them memorable...",
      required: true
    },
    {
      id: "core_values",
      type: "text" as const,
      question: "What are the 3-5 non-negotiable core values that guide your brand's every action and decision? For each value, describe what it 'looks like in action' for your brand.",
      placeholder: "List your core values and explain how each value manifests in real business decisions and actions. Be specific about what each value means in practice...",
      required: true
    },
    {
      id: "one_word",
      type: "text" as const,
      question: "If your brand could be encapsulated by just ONE word, what would it be? And briefly explain why this word represents its essence.",
      placeholder: "Choose one powerful word that captures your brand's essence and explain why this word perfectly represents what you stand for...",
      required: true
    }
  ]
};

export default function BrandPersonalityModule() {
  const navigate = useNavigate();

  const handleComplete = (answers: Record<string, any>) => {
    console.log("Brand Personality Module completed with answers:", answers);
    toast.success("Brand Personality strategy completed successfully!");
    navigate("/progress");
  };

  const handleBack = () => {
    navigate("/progress");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <ModuleWrapper
          moduleData={moduleData}
          onComplete={handleComplete}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
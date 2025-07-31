import { ModuleWrapper } from "@/components/modules/ModuleWrapper";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const moduleData = {
  id: "audience-persona",
  title: "Audience Deep Dive - Persona & Empathy",
  description: "Understand your ideal customer through deep persona development",
  introduction: {
    title: "Who Are You Serving? Understanding Your Ideal Customer",
    content: "Building a successful brand requires deep understanding of who you serve. In this module, you'll create detailed customer personas and empathy maps that guide every strategic decision, ensuring your brand resonates authentically with the right people.",
    importance: "Without clear understanding of your audience, even the best brand strategy falls flat. Deep customer insight drives product development, messaging, positioning, and experience design that creates meaningful connections and drives business results."
  },
  learningContent: {
    title: "Building Customer Understanding",
    sections: [
      {
        title: "Minimal Viable Audience (MVA)",
        content: "Success comes from serving a specific audience exceptionally well, not trying to appeal to everyone. Your Minimal Viable Audience is the smallest group of people who would be delighted by your brand and willing to tell others about it.",
        keyPoints: [
          "Focus creates stronger connections than broad appeal",
          "Specific audiences are easier to reach and understand",
          "Small, passionate audiences grow through word-of-mouth",
          "Clear target guides all strategic decisions"
        ]
      },
      {
        title: "Buyer Persona Development",
        content: "A buyer persona is a semi-fictional representation of your ideal customer based on real data and insights. It goes beyond demographics to include motivations, behaviors, challenges, and goals that drive decision-making.",
        keyPoints: [
          "Personas humanize your target audience",
          "Include both demographic and psychographic details",
          "Base personas on real customer research and data",
          "Use personas to guide messaging and experience design"
        ]
      },
      {
        title: "Demographics vs. Psychographics",
        content: "Demographics tell you who your customers are (age, income, location), while psychographics reveal how they think, feel, and behave. Both are essential for complete customer understanding and effective brand strategy.",
        keyPoints: [
          "Demographics: age, income, location, occupation, family status",
          "Psychographics: values, interests, lifestyle, motivations, fears",
          "Psychographics often matter more than demographics for brand connection",
          "Combine both for complete customer picture"
        ]
      },
      {
        title: "Empathy Mapping",
        content: "Empathy mapping is a collaborative tool that captures what customers say, think, feel, and do. It helps teams develop deeper empathy and understanding, leading to better products, services, and experiences.",
        keyPoints: [
          "Say: What customers express verbally or in writing",
          "Think: Internal thoughts, beliefs, and concerns",
          "Feel: Emotions and feelings throughout their journey",
          "Do: Actions and behaviors in relevant situations"
        ]
      }
    ]
  },
  questions: [
    {
      id: "persona_name",
      type: "fill-blank" as const,
      question: "Our ideal customer's name is _____.",
      placeholder: "Choose a representative name for your persona",
      required: true
    },
    {
      id: "persona_demographics",
      type: "fill-blank" as const,
      question: "They are _____ years old, _____ with an income of _____.",
      placeholder: "age range, marital/family status, income range",
      required: true
    },
    {
      id: "persona_profession",
      type: "fill-blank" as const,
      question: "Their profession is _____ and they primarily live in _____ areas.",
      placeholder: "job title/industry, location type (urban/suburban/rural)",
      required: true
    },
    {
      id: "information_sources",
      type: "fill-blank" as const,
      question: "They get information from _____ and prefer to communicate via _____.",
      placeholder: "key platforms/sources, preferred communication channels",
      required: true
    },
    {
      id: "core_needs_frustrations",
      type: "text" as const,
      question: "What are the 3-5 core needs your ideal customer has that your brand addresses? And what are their biggest frustrations or challenges that your brand helps to solve?",
      placeholder: "List their key needs and frustrations, explaining how your brand addresses each one. Be specific about the problems you solve and value you provide...",
      required: true
    },
    {
      id: "money_vs_time",
      type: "slider" as const,
      question: "How strongly is your ideal customer motivated by Saving Money (1) vs. Saving Time (10)?",
      min: 1,
      max: 10,
      required: true
    },
    {
      id: "professional_vs_personal",
      type: "slider" as const,
      question: "How strongly is your ideal customer motivated by Professional Growth (1) vs. Personal Well-being (10)?",
      min: 1,
      max: 10,
      required: true
    },
    {
      id: "solving_vs_experiencing",
      type: "slider" as const,
      question: "How strongly is your ideal customer motivated by Solving Problems (1) vs. Gaining New Experiences (10)?",
      min: 1,
      max: 10,
      required: true
    },
    {
      id: "day_in_life",
      type: "text" as const,
      question: "Walk us through a typical day in your ideal customer's life. What do they do, think, feel, and express throughout their day, especially in relation to the problems or opportunities your brand addresses?",
      placeholder: "Describe their daily routine, challenges, thoughts, and feelings. Focus on moments where your brand could make a difference in their day...",
      required: true
    }
  ]
};

export default function AudiencePersonaModule() {
  const navigate = useNavigate();

  const handleComplete = (answers: Record<string, any>) => {
    console.log("Audience Persona Module completed with answers:", answers);
    toast.success("Audience persona strategy completed successfully!");
    navigate("/brand-journey");
  };

  const handleBack = () => {
    navigate("/brand-journey");
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
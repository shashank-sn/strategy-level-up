import { ModuleWrapper } from "@/components/modules/ModuleWrapper";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const moduleData = {
  id: "founder-story",
  title: "The Founder's Story & Perceived Brand Challenge",
  description: "Transform your origin story into a powerful brand narrative",
  introduction: {
    title: "Your Origin & Obstacles: The Story Behind the Brand",
    content: "Every great brand has a compelling origin story that creates authentic connection with audiences. In this module, you'll craft your founder's narrative and identify the core challenges that will shape your strategic focus going forward.",
    importance: "Your founder's story isn't just history—it's one of your most powerful brand assets. Combined with a clear understanding of your biggest challenges, this foundation will guide your strategic decisions and help you connect authentically with your audience."
  },
  learningContent: {
    title: "Building Your Brand Narrative",
    sections: [
      {
        title: "The Power of Storytelling",
        content: "Authentic founder stories create emotional connections that facts and features cannot. Your origin story becomes the foundation of trust, differentiation, and memorability that sets your brand apart in crowded markets.",
        keyPoints: [
          "Stories create emotional connections beyond product features",
          "Authentic narratives build trust and credibility",
          "Origin stories differentiate your brand from competitors",
          "Compelling hooks capture attention and interest"
        ]
      },
      {
        title: "Story Arc Framework",
        content: "Effective brand stories follow a clear structure: Hook (what grabs attention), Problem (what needed solving), Turning Point (the moment of realization), and Purpose/Solution (what you're building toward).",
        keyPoints: [
          "Hook: The compelling moment that started everything",
          "Problem: The frustration or gap you identified",
          "Turning Point: Your breakthrough or realization moment",
          "Purpose/Solution: How you're addressing the problem"
        ]
      },
      {
        title: "Understanding Brand Challenges",
        content: "Most brand challenges fall into five key areas: Awareness (unknown), Interest (known but ignored), Conversion (considered but not chosen), Loyalty (chosen but not retained), and Advocacy (retained but not recommended).",
        keyPoints: [
          "Awareness: Building visibility and recognition",
          "Interest: Creating curiosity and consideration",
          "Conversion: Driving decision and purchase",
          "Loyalty: Encouraging repeat engagement",
          "Advocacy: Inspiring recommendations and referrals"
        ]
      },
      {
        title: "Categorizing Challenge Types",
        content: "Brand challenges typically stem from three root causes: Marketing (messaging and reach), Distribution & Sales (access and process), or Branding (perception and positioning). Understanding the root cause guides strategic solutions.",
        keyPoints: [
          "Marketing: Message clarity, channel effectiveness, reach",
          "Distribution & Sales: Availability, process, experience",
          "Branding: Positioning, perception, differentiation",
          "Root cause analysis drives strategic focus"
        ]
      }
    ]
  },
  questions: [
    {
      id: "founder_story_hook",
      type: "text" as const,
      question: "What's the compelling 'hook' or unique origin story of your brand? What sparked the idea, and what problem did you set out to solve?",
      placeholder: "Describe the moment or experience that led to your brand's creation. What was the spark that made you think 'there has to be a better way'?",
      required: true
    },
    {
      id: "biggest_challenge",
      type: "mcq" as const,
      question: "From the list below, what is the SINGLE biggest challenge your brand is facing RIGHT NOW?",
      options: [
        "Awareness (People don't know us)",
        "Interest/Consideration (People know us but aren't curious)",
        "Conversion (People are curious but aren't buying)",
        "Loyalty (Customers buy once but don't return)",
        "Advocacy (Customers don't recommend us)"
      ],
      required: true
    },
    {
      id: "marketing_problem",
      type: "binary" as const,
      question: "Is this challenge primarily a Marketing Problem (messaging, reach, channels)?",
      required: true
    },
    {
      id: "distribution_sales_problem", 
      type: "binary" as const,
      question: "Is this challenge primarily a Distribution & Sales Problem (availability, process, experience)?",
      required: true
    },
    {
      id: "branding_problem",
      type: "binary" as const,
      question: "Is this challenge primarily a Branding Problem (positioning, perception, differentiation)?",
      required: true
    },
    {
      id: "obstacles_overcome",
      type: "text" as const,
      question: "Briefly describe one significant obstacle you or your brand faced in the early days, and how it was overcome.",
      placeholder: "Share a specific challenge from your journey and the steps you took to overcome it. This adds credibility and resilience to your story.",
      required: true
    }
  ]
};

export default function FounderStoryModule() {
  const navigate = useNavigate();

  const handleComplete = (answers: Record<string, any>) => {
    console.log("Founder Story Module completed with answers:", answers);
    toast.success("Founder Story strategy completed successfully!");
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
import { ModuleWrapper } from "@/components/modules/ModuleWrapper";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const moduleData = {
  id: "business-goals",
  title: "Business Goals & Measurement", 
  description: "Connect your grand vision to actionable, measurable goals",
  introduction: {
    title: "Your Brand's Compass: Setting & Measuring Goals",
    content: "Transform your brand vision into concrete, measurable goals that drive real business results. In this module, you'll establish a clear goal hierarchy from short-term objectives to long-term aspirations, and build the measurement framework needed to track your progress.",
    importance: "Without measurable goals, even the strongest brand strategy becomes directionless. This module ensures your brand building efforts are focused, trackable, and aligned with business outcomes that matter to your stakeholders."
  },
  learningContent: {
    title: "Building Your Goal Framework",
    sections: [
      {
        title: "Goal Hierarchy & Time Horizons",
        content: "Effective brand building requires goals at multiple time horizons. Your 10-year ultimate goal represents your brand's transformational impact, while 3-year milestones mark significant progress, and 1-year objectives drive immediate action.",
        keyPoints: [
          "Ultimate goals (10-year) align with your brand vision",
          "Mid-term goals (3-year) represent major milestones", 
          "Short-term goals (1-year) drive daily actions and decisions",
          "Each goal level should build toward the next"
        ]
      },
      {
        title: "SMART Goal Framework",
        content: "SMART goals ensure your objectives are Specific, Measurable, Achievable, Relevant, and Time-bound. This framework transforms vague aspirations into actionable targets that can drive real business growth.",
        keyPoints: [
          "Specific: Clear and well-defined outcomes",
          "Measurable: Quantifiable metrics for tracking progress",
          "Achievable: Realistic given your resources and context",
          "Relevant: Aligned with your brand strategy and business needs",
          "Time-bound: Clear deadlines and milestones"
        ]
      },
      {
        title: "Measurement Confidence Assessment",
        content: "Understanding your current measurement capabilities helps identify where to focus your efforts. Strong measurement systems enable data-driven decisions and continuous improvement of your brand strategy.",
        keyPoints: [
          "Brand awareness tracking through multiple channels",
          "Customer engagement metrics across touchpoints",
          "Loyalty and advocacy measurement systems",
          "Regular review and optimization of measurement approaches"
        ]
      },
      {
        title: "Strategic Measurement Approach",
        content: "Your measurement strategy should focus on metrics that directly connect to business outcomes. Choose indicators that are actionable, meaningful to stakeholders, and provide insights for strategic decisions.",
        keyPoints: [
          "Select metrics that align with your business goals",
          "Focus on leading indicators, not just lagging metrics",
          "Ensure data collection is sustainable and accurate", 
          "Connect measurement to strategic decision-making"
        ]
      }
    ]
  },
  questions: [
    {
      id: "ultimate_goal",
      type: "fill-blank" as const,
      question: "Our ultimate 10-year brand goal is to _____ by _____.",
      placeholder: "achieve transformational impact, specific year",
      required: true
    },
    {
      id: "midterm_goal", 
      type: "fill-blank" as const,
      question: "In 3 years, we aim to _____ by _____.",
      placeholder: "achieve measurable milestone, specific date",
      required: true
    },
    {
      id: "shortterm_goal",
      type: "fill-blank" as const, 
      question: "Within the next 1 year, our key brand objective is to _____ by _____.",
      placeholder: "achieve specific outcome, specific date",
      required: true
    },
    {
      id: "brand_awareness_confidence",
      type: "slider" as const,
      question: "On a scale of 1-10, how confident are you in your current ability to accurately measure Brand Awareness?",
      min: 1,
      max: 10,
      required: true
    },
    {
      id: "customer_engagement_confidence", 
      type: "slider" as const,
      question: "On a scale of 1-10, how confident are you in your current ability to accurately measure Customer Engagement?",
      min: 1,
      max: 10,
      required: true
    },
    {
      id: "customer_loyalty_confidence",
      type: "slider" as const,
      question: "On a scale of 1-10, how confident are you in your current ability to accurately measure Customer Loyalty/Advocacy?", 
      min: 1,
      max: 10,
      required: true
    },
    {
      id: "measurement_strategy",
      type: "text" as const,
      question: "Describe one key strategy or metric you will use to provide quantifiable data to evaluate your brand's progress toward its 1-year goal.",
      placeholder: "Explain your measurement approach, specific metrics, and how you'll track progress...",
      required: true
    }
  ]
};

export default function BusinessGoalsModule() {
  const navigate = useNavigate();

  const handleComplete = (answers: Record<string, any>) => {
    console.log("Business Goals Module completed with answers:", answers);
    toast.success("Business Goals strategy completed successfully!");
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
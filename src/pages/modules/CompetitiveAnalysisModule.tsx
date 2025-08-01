import { ModuleWrapper, ModuleData } from "@/components/modules/ModuleWrapper";
import { useNavigate } from "react-router-dom";

const CompetitiveAnalysisModule = () => {
  const navigate = useNavigate();

  const moduleData: ModuleData = {
    id: "competitive-analysis",
    title: "Who's in the Game? Competitors & Market Shifts",
    description: "Estimated Time: 14 minutes",
    introduction: {
      title: "Understand Your Competitive Landscape",
      content: "Competitive analysis reveals who you're up against and what market forces are shaping your industry. You'll identify direct competitors (same product/service, same target market) and indirect competitors (different solutions to the same customer problem). Understanding both your competition and market trends helps you position your brand strategically and identify opportunities for differentiation.",
      importance: "Companies that regularly analyze their competitive landscape are 2.5x more likely to grow market share and identify new opportunities. This analysis helps you understand what customers expect, where gaps exist in the market, and how to position your brand for maximum impact."
    },
    learningContent: {
      title: "Competitive Analysis Framework",
      sections: [
        {
          title: "Identifying Competitors: Direct vs. Indirect",
          content: "Direct competitors offer the same product or service to the same target market. Indirect competitors solve the same customer problem with a different approach or compete for the same customer budget. Understanding both types gives you a complete view of your competitive landscape and helps identify unexpected threats and opportunities.",
          keyPoints: [
            "Direct competitors target the same customers with similar solutions",
            "Indirect competitors solve the same problem differently",
            "Budget competitors compete for the same customer spending",
            "Consider who your customers actually compare you to"
          ]
        },
        {
          title: "Competitor Analysis Framework",
          content: "Systematic competitor analysis examines multiple dimensions: their product offerings and pricing strategy, brand messaging and positioning, target audience and customer experience, and core strengths and weaknesses. This framework ensures you gather comprehensive competitive intelligence rather than surface-level observations.",
          keyPoints: [
            "Analyze offerings, pricing, and value propositions",
            "Study their messaging, brand voice, and positioning",
            "Understand their target audience and customer journey",
            "Identify key strengths to learn from and weaknesses to exploit"
          ]
        },
        {
          title: "Market Trends: External Forces",
          content: "Market trends represent external forces that impact both your brand and customers. Use STEEP analysis to examine Social trends (changing behaviors), Technological advances, Economic factors, Environmental concerns, and Political/regulatory changes. These macro trends create opportunities and threats for all players in your market.",
          keyPoints: [
            "Social trends change customer expectations and behaviors",
            "Technology creates new possibilities and disrupts existing ones",
            "Economic factors affect purchasing power and priorities",
            "Environmental and political forces create new requirements"
          ]
        },
        {
          title: "Synthesizing Strategic Insights",
          content: "The goal is transforming competitive research into actionable insights. Look for patterns across competitors, identify market gaps and opportunities, spot threats that need addressing, and find areas where you can differentiate. Great insights connect competitive intelligence to strategic decisions about positioning, messaging, and market approach.",
          keyPoints: [
            "Look for patterns and common strategies across competitors",
            "Identify gaps where customer needs aren't being met",
            "Spot emerging trends that create new opportunities",
            "Connect insights to specific strategic decisions"
          ]
        }
      ]
    },
    questions: [
      {
        id: "competitor-1-name",
        type: "fill-blank",
        question: "Competitor 1 Name: Who is your first main direct competitor?",
        placeholder: "Enter competitor name",
        required: true
      },
      {
        id: "competitor-1-description",
        type: "text",
        question: "For your first competitor, describe 2-3 unique identifiers, key attributes, and perceived personality traits. What are they known for?",
        placeholder: "Example: Performance-focused, aspirational, athletic apparel, often uses celebrity endorsements",
        required: true
      },
      {
        id: "competitor-2-name",
        type: "fill-blank",
        question: "Competitor 2 Name: Who is your second main direct competitor?",
        placeholder: "Enter competitor name",
        required: true
      },
      {
        id: "competitor-2-description",
        type: "text",
        question: "For your second competitor, describe their key attributes and what they're known for.",
        placeholder: "Describe their unique identifiers and personality traits",
        required: true
      },
      {
        id: "competitor-3-name",
        type: "fill-blank",
        question: "Competitor 3 Name: Who is your third main direct competitor?",
        placeholder: "Enter competitor name",
        required: true
      },
      {
        id: "competitor-3-description",
        type: "text",
        question: "For your third competitor, describe their key attributes and what they're known for.",
        placeholder: "Describe their unique identifiers and personality traits",
        required: true
      },
      {
        id: "market-trends",
        type: "mcq",
        question: "Which of the following market trends are most significantly impacting your industry or target audience right now? (Select up to 3)",
        options: [
          "Increased demand for sustainability",
          "Rise of AI/Automation",
          "Shift to remote work",
          "Growing emphasis on mental wellness",
          "Personalization expectations",
          "Gig economy expansion",
          "Data privacy concerns",
          "Supply chain disruptions"
        ],
        required: true
      },
      {
        id: "strategic-insights",
        type: "text",
        question: "Based on your understanding of your target customer and the market, what are the THREE most important new insights you've gained that could influence your brand strategy?",
        placeholder: "Example: Our target audience is increasingly prioritizing ethical sourcing, even at a higher price point. Competitor X has a very strong community, which is a key differentiator for them.",
        required: true
      }
    ]
  };

  const handleModuleComplete = (answers: Record<string, any>, score: number) => {
    // Save the results and navigate back to progress
    console.log("Competitive Analysis module completed:", { answers, score });
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

export default CompetitiveAnalysisModule;
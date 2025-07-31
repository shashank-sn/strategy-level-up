import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Palette, MessageCircle, Users, TouchpadOff, Upload, CheckCircle } from "lucide-react";

interface BrandConceptData {
  brand_concept_translation: string;
  brand_voice_tone: string[];
  internal_brand_living: string;
  touchpoint_website_headline: string;
  touchpoint_social_bio: string;
  touchpoint_customer_service: string;
  touchpoint_packaging: string;
  visual_inspiration_notes: string;
}

interface BrandConceptQuestionnaireProps {
  onComplete: (data: BrandConceptData) => void;
  onBack: () => void;
}

export const BrandConceptQuestionnaire = ({ onComplete, onBack }: BrandConceptQuestionnaireProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<BrandConceptData>({
    brand_concept_translation: "",
    brand_voice_tone: [],
    internal_brand_living: "",
    touchpoint_website_headline: "",
    touchpoint_social_bio: "",
    touchpoint_customer_service: "",
    touchpoint_packaging: "",
    visual_inspiration_notes: ""
  });

  const steps = [
    "Brand Concept Translation",
    "Voice & Tone",
    "Internal Brand Living",
    "Touchpoint Strategy",
    "Visual Translation",
    "Brand Expression Summary"
  ];

  const voiceToneOptions = [
    "Informative", "Inspirational", "Authoritative", "Friendly", 
    "Playful", "Direct", "Empathetic", "Sophisticated", 
    "Humorous", "Rebellious"
  ];

  const updateData = (field: keyof BrandConceptData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const toggleVoiceTone = (option: string) => {
    setData(prev => ({
      ...prev,
      brand_voice_tone: prev.brand_voice_tone.includes(option)
        ? prev.brand_voice_tone.filter(item => item !== option)
        : prev.brand_voice_tone.length < 3 
          ? [...prev.brand_voice_tone, option]
          : prev.brand_voice_tone
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return data.brand_concept_translation.trim() !== "";
      case 1: return data.brand_voice_tone.length >= 2;
      case 2: return data.internal_brand_living.trim() !== "";
      case 3: return data.touchpoint_website_headline.trim() !== "" && 
                     data.touchpoint_social_bio.trim() !== "" && 
                     data.touchpoint_customer_service.trim() !== "";
      case 4: return true; // Visual inspiration is optional
      case 5: return true; // Summary page
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(data);
    }
  };

  // Analysis functions for summary
  const getBrandPersonality = () => {
    const voiceAnalysis = {
      professional: data.brand_voice_tone.filter(tone => 
        ["Informative", "Authoritative", "Direct", "Sophisticated"].includes(tone)
      ).length,
      approachable: data.brand_voice_tone.filter(tone => 
        ["Friendly", "Playful", "Empathetic", "Humorous"].includes(tone)
      ).length,
      inspiring: data.brand_voice_tone.filter(tone => 
        ["Inspirational", "Rebellious"].includes(tone)
      ).length
    };

    let personalityType = "Balanced";
    let communicationStyle = "versatile";
    
    if (voiceAnalysis.professional > voiceAnalysis.approachable && voiceAnalysis.professional > voiceAnalysis.inspiring) {
      personalityType = "Professional Authority";
      communicationStyle = "expert-driven and credible";
    } else if (voiceAnalysis.approachable > voiceAnalysis.professional && voiceAnalysis.approachable > voiceAnalysis.inspiring) {
      personalityType = "Approachable Human";
      communicationStyle = "warm and relatable";
    } else if (voiceAnalysis.inspiring > voiceAnalysis.professional && voiceAnalysis.inspiring > voiceAnalysis.approachable) {
      personalityType = "Inspirational Leader";
      communicationStyle = "motivating and forward-thinking";
    }

    return { personalityType, communicationStyle, voiceAnalysis };
  };

  const getTouchpointConsistency = () => {
    const touchpoints = [
      { name: "Website", content: data.touchpoint_website_headline, critical: true },
      { name: "Social Media", content: data.touchpoint_social_bio, critical: true },
      { name: "Customer Service", content: data.touchpoint_customer_service, critical: true },
      { name: "Packaging", content: data.touchpoint_packaging, critical: false }
    ];

    const completedTouchpoints = touchpoints.filter(tp => tp.content.trim() !== "");
    const criticalCompleted = touchpoints.filter(tp => tp.critical && tp.content.trim() !== "");
    const coverage = (completedTouchpoints.length / touchpoints.length) * 100;
    const criticalCoverage = (criticalCompleted.length / touchpoints.filter(tp => tp.critical).length) * 100;

    return { touchpoints, completedTouchpoints, coverage, criticalCoverage };
  };

  const getBrandCoherence = () => {
    const personality = getBrandPersonality();
    const touchpoints = getTouchpointConsistency();
    
    // Analyze consistency between voice/tone and touchpoint expressions
    const hasConceptClarity = data.brand_concept_translation.length > 100;
    const hasInternalAlignment = data.internal_brand_living.length > 50;
    const hasVisualDirection = data.visual_inspiration_notes.length > 30;
    
    let coherenceScore = 0;
    if (hasConceptClarity) coherenceScore += 25;
    if (hasInternalAlignment) coherenceScore += 25;
    if (touchpoints.criticalCoverage === 100) coherenceScore += 30;
    if (hasVisualDirection) coherenceScore += 20;
    
    let coherenceLevel = "Developing";
    if (coherenceScore >= 80) coherenceLevel = "Strong";
    else if (coherenceScore >= 60) coherenceLevel = "Good";
    else if (coherenceScore >= 40) coherenceLevel = "Moderate";
    
    return { 
      coherenceScore, 
      coherenceLevel, 
      hasConceptClarity, 
      hasInternalAlignment, 
      hasVisualDirection,
      personality
    };
  };

  const getStrategicInsights = () => {
    const coherence = getBrandCoherence();
    const touchpoints = getTouchpointConsistency();
    
    let primaryStrength = "brand concept development";
    let improvementArea = "touchpoint consistency";
    let strategicFocus = "building foundational brand expression";
    
    if (coherence.coherenceScore >= 80) {
      strategicFocus = "optimizing and scaling brand expression";
      primaryStrength = "comprehensive brand coherence";
      improvementArea = "continuous refinement and measurement";
    } else if (coherence.coherenceScore >= 60) {
      strategicFocus = "strengthening brand consistency";
      primaryStrength = coherence.hasConceptClarity ? "clear brand concept" : "strong voice definition";
      improvementArea = touchpoints.criticalCoverage < 100 ? "touchpoint implementation" : "visual identity development";
    }
    
    const quickWins = [];
    if (touchpoints.criticalCoverage < 100) quickWins.push("Complete critical touchpoint definitions");
    if (!coherence.hasVisualDirection) quickWins.push("Develop visual identity guidelines");
    if (!coherence.hasInternalAlignment) quickWins.push("Strengthen internal brand culture");
    
    return { 
      primaryStrength, 
      improvementArea, 
      strategicFocus, 
      quickWins,
      coherence,
      touchpoints
    };
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Brand Concept Translation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">From Strategy to Expression</h4>
                <p className="text-sm text-muted-foreground">
                  Your brand concept translates abstract strategy into tangible visual and verbal 
                  communication. This is how your brand will come to life across all touchpoints.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Translation Elements:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Visual style and design direction</li>
                    <li>• Messaging tone and language</li>
                    <li>• Communication approach</li>
                    <li>• Creative executions</li>
                    <li>• Customer experience design</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Example (Playful Tech Brand):</h4>
                  <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
                    <p>"Our 'making complex tech simple' promise comes alive through bright, 
                    cheerful colors and friendly illustrations. Copy uses clear, jargon-free 
                    language with gentle humor to make technology feel approachable."</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Brand Concept Translation
                </label>
                <p className="text-sm text-muted-foreground mb-3">
                  Describe how your brand promise, personality, and values will be visually and 
                  verbally translated into your core messaging and marketing activities. How will 
                  this "concept" shape your communication and design?
                </p>
                <Textarea
                  value={data.brand_concept_translation}
                  onChange={(e) => updateData("brand_concept_translation", e.target.value)}
                  placeholder="Example: Our premium, reliability-focused brand will express itself through clean, minimalist design with premium materials. Messaging will be confident but not boastful, emphasizing proven results and customer success stories..."
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Brand Voice & Tone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">How Your Brand Sounds</h4>
                <p className="text-sm text-muted-foreground">
                  Your brand voice is the personality that comes through in all communications. 
                  Choose 2-3 tones that best represent how you want to sound.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">
                  Select 2-3 words that best describe your desired tone of voice:
                </label>
                <p className="text-sm text-muted-foreground mb-4">
                  Selected: {data.brand_voice_tone.length}/3
                </p>
                
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {voiceToneOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={data.brand_voice_tone.includes(option)}
                        onCheckedChange={() => toggleVoiceTone(option)}
                        disabled={!data.brand_voice_tone.includes(option) && data.brand_voice_tone.length >= 3}
                      />
                      <label 
                        htmlFor={option} 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {data.brand_voice_tone.length > 0 && (
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Your Voice Profile</h4>
                  <p className="text-sm text-muted-foreground">
                    Selected tones: <strong>{data.brand_voice_tone.join(", ")}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This combination suggests a brand that communicates in a way that feels both 
                    {data.brand_voice_tone.includes("Professional") || data.brand_voice_tone.includes("Authoritative") ? " credible and trustworthy" : ""}
                    {data.brand_voice_tone.includes("Friendly") || data.brand_voice_tone.includes("Empathetic") ? " warm and approachable" : ""}
                    {data.brand_voice_tone.includes("Playful") || data.brand_voice_tone.includes("Humorous") ? " engaging and memorable" : ""}
                    .
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Living the Brand Internally
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Internal Brand Culture</h4>
                <p className="text-sm text-muted-foreground">
                  Your brand must be lived internally before it can be authentically expressed 
                  externally. How will your team embody your brand values?
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Internal Examples:</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li><strong>Customer-Centricity:</strong> "Every team meeting starts with a customer success story"</li>
                    <li><strong>Innovation:</strong> "We dedicate Fridays to 'experimentation time' for new ideas"</li>
                    <li><strong>Transparency:</strong> "All company metrics are openly shared monthly"</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Implementation Areas:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Team meetings and rituals</li>
                    <li>• Hiring and onboarding processes</li>
                    <li>• Decision-making criteria</li>
                    <li>• Workspace design and culture</li>
                    <li>• Performance evaluations</li>
                  </ul>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Internal Brand Implementation
                </label>
                <p className="text-sm text-muted-foreground mb-3">
                  How will your brand's core values and personality be implemented internally 
                  within your team and company culture? Give one concrete example.
                </p>
                <Textarea
                  value={data.internal_brand_living}
                  onChange={(e) => updateData("internal_brand_living", e.target.value)}
                  placeholder="Example: To embody our 'continuous learning' value, we start each week with a 15-minute team share where someone teaches the group something new they learned. This keeps curiosity alive and shows we practice what we preach about growth."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TouchpadOff className="w-5 h-5 text-primary" />
                Touchpoint Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Brand Touchpoints</h4>
                <p className="text-sm text-muted-foreground">
                  Every interaction point should consistently express your brand concept. 
                  Define how your brand will show up across key touchpoints.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Website Headline
                  </label>
                  <p className="text-sm text-muted-foreground mb-2">
                    The main headline visitors see when they land on your website
                  </p>
                  <Input
                    value={data.touchpoint_website_headline}
                    onChange={(e) => updateData("touchpoint_website_headline", e.target.value)}
                    placeholder="Example: 'Finally, project management that actually makes work easier'"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Social Media Bio
                  </label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Brief description in your social media profiles
                  </p>
                  <Input
                    value={data.touchpoint_social_bio}
                    onChange={(e) => updateData("touchpoint_social_bio", e.target.value)}
                    placeholder="Example: 'Simplifying complex tech for everyday heroes. Building tools that just work. 🚀'"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Customer Service Interaction
                  </label>
                  <p className="text-sm text-muted-foreground mb-2">
                    How your brand personality shows up in customer support
                  </p>
                  <Input
                    value={data.touchpoint_customer_service}
                    onChange={(e) => updateData("touchpoint_customer_service", e.target.value)}
                    placeholder="Example: 'We always lead with empathy and ask 'How can we make this right?' before anything else'"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Product Packaging (if applicable)
                  </label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Physical or digital packaging experience (leave blank if not applicable)
                  </p>
                  <Input
                    value={data.touchpoint_packaging}
                    onChange={(e) => updateData("touchpoint_packaging", e.target.value)}
                    placeholder="Example: 'Minimalist design with a handwritten thank-you note and eco-friendly materials'"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Visual Translation & Inspiration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Visual Brand Expression</h4>
                <p className="text-sm text-muted-foreground">
                  Document your visual inspiration and direction. This helps translate your 
                  brand concept into visual elements.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Visual Elements to Consider:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Color palette and mood</li>
                    <li>• Typography style and feel</li>
                    <li>• Photography style</li>
                    <li>• Illustration approach</li>
                    <li>• Layout and composition</li>
                    <li>• Logo style and treatment</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Inspiration Sources:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Pinterest boards</li>
                    <li>• Dribbble collections</li>
                    <li>• Brand references</li>
                    <li>• Color palette tools</li>
                    <li>• Font combinations</li>
                    <li>• Design trends</li>
                  </ul>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Visual Inspiration & Direction Notes
                </label>
                <p className="text-sm text-muted-foreground mb-3">
                  Describe your visual direction, inspiration sources, or specific visual elements 
                  that represent your brand concept. Include links to mood boards, color palettes, 
                  or font examples if you have them.
                </p>
                <Textarea
                  value={data.visual_inspiration_notes}
                  onChange={(e) => updateData("visual_inspiration_notes", e.target.value)}
                  placeholder="Example: Inspired by Scandinavian minimalism - clean lines, lots of white space, muted earth tones (sage green, warm beige). Typography should feel modern but approachable (thinking Nunito or similar). Photography style: natural lighting, authentic moments, not overly polished. Pinterest board: [URL]"
                  className="min-h-[120px]"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium mb-2 text-blue-900">Future Enhancement</h4>
                <p className="text-sm text-blue-700">
                  In future versions, you'll be able to upload images, create mood boards, 
                  and generate color palettes directly within this interface.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        const insights = getStrategicInsights();
        const coherence = getBrandCoherence();
        const personality = getBrandPersonality();
        
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Strategic Brand Expression Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Executive Summary */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Brand Expression Readiness</h3>
                <p className="text-sm leading-relaxed">
                  Your brand expression shows <strong>{coherence.coherenceLevel.toLowerCase()}</strong> coherence 
                  (score: {coherence.coherenceScore}/100) with a <strong>{personality.communicationStyle}</strong> communication approach. 
                  Current strategic focus should be on <strong>{insights.strategicFocus}</strong>, 
                  leveraging your strength in <strong>{insights.primaryStrength}</strong>.
                </p>
              </div>

              {/* Brand Coherence Analysis */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-green-500" />
                    Brand Strengths
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {coherence.hasConceptClarity && (
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        Clear brand concept translation
                      </li>
                    )}
                    {coherence.hasInternalAlignment && (
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        Strong internal brand culture
                      </li>
                    )}
                    {insights.touchpoints.criticalCoverage === 100 && (
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        Complete critical touchpoints
                      </li>
                    )}
                    {coherence.hasVisualDirection && (
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        Defined visual direction
                      </li>
                    )}
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      {personality.personalityType} voice profile
                    </li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <TouchpadOff className="w-4 h-4 text-orange-500" />
                    Quick Wins Available
                  </h4>
                  {insights.quickWins.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                      {insights.quickWins.map((win, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-orange-500 rounded-full" />
                          {win}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Strong foundation established. Focus on optimization and scaling.
                    </p>
                  )}
                </div>
              </div>

              {/* Communication Profile Analysis */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  Communication Personality Analysis
                </h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{personality.voiceAnalysis.professional}</div>
                    <div className="text-sm text-muted-foreground">Professional Tones</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {personality.voiceAnalysis.professional > 1 ? "Authority & Expertise" : "Balanced Approach"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{personality.voiceAnalysis.approachable}</div>
                    <div className="text-sm text-muted-foreground">Approachable Tones</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {personality.voiceAnalysis.approachable > 1 ? "Human & Relatable" : "More Formal Approach"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{personality.voiceAnalysis.inspiring}</div>
                    <div className="text-sm text-muted-foreground">Inspiring Tones</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {personality.voiceAnalysis.inspiring > 0 ? "Motivational Edge" : "Practical Focus"}
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted/30 rounded text-sm">
                  <strong>Communication Style:</strong> {personality.communicationStyle}
                </div>
              </div>

              {/* Touchpoint Readiness */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-4">Brand Implementation Readiness</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Critical Touchpoints:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ width: `${insights.touchpoints.criticalCoverage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {insights.touchpoints.criticalCoverage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Coverage:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ width: `${insights.touchpoints.coverage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {insights.touchpoints.coverage.toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Brand Coherence:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ width: `${coherence.coherenceScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {coherence.coherenceScore}/100
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategic Recommendations */}
              <div className="bg-primary/5 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Strategic Action Plan</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Immediate Priority (Next 1-2 weeks):</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {insights.quickWins.length > 0 ? (
                        insights.quickWins.slice(0, 2).map((win, index) => (
                          <li key={index}>• {win}</li>
                        ))
                      ) : (
                        <>
                          <li>• Implement brand voice guidelines across team communications</li>
                          <li>• Update primary touchpoints with consistent messaging</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Short-term Goals (Next 30 days):</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Develop comprehensive brand guidelines document</li>
                      <li>• Train team on {personality.personalityType.toLowerCase()} communication approach</li>
                      <li>• Create brand expression audit checklist</li>
                      {insights.touchpoints.coverage < 100 && (
                        <li>• Complete remaining touchpoint implementations</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Long-term Focus (Next 90 days):</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Measure brand perception alignment through customer feedback</li>
                      <li>• Optimize {insights.improvementArea} based on performance data</li>
                      <li>• Scale brand expression across all customer interactions</li>
                      <li>• Establish brand consistency monitoring processes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Concept & Living the Brand</h2>
        <p className="text-muted-foreground">
          Translate your brand strategy into tangible expression and everyday experience
        </p>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mb-6">
        {steps.map((step, index) => (
          <Button
            key={index}
            variant={currentStep === index ? "default" : currentStep > index ? "secondary" : "outline"}
            size="sm"
            className="flex items-center gap-2 text-xs"
            onClick={() => setCurrentStep(index)}
            disabled={index > currentStep}
          >
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-background/20">
              {index + 1}
            </span>
            <span className="hidden sm:inline">{step}</span>
            {index < currentStep && (
              <span className="w-2 h-2 bg-green-500 rounded-full ml-1" />
            )}
          </Button>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{steps[currentStep]}</h3>
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </CardContent>
      </Card>

      {renderStepContent()}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={currentStep === 0 ? onBack : () => setCurrentStep(prev => prev - 1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {currentStep === 0 ? 'Back to Journey' : 'Previous'}
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="flex items-center gap-2"
        >
          {currentStep === steps.length - 1 ? 'Complete Brand Expression' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
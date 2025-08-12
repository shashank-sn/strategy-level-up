import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle, TrendingUp, Target, Lightbulb } from "lucide-react";
import AuditIntro from "@/components/audit/AuditIntro";
import UserDetailsForm from "@/components/audit/UserDetailsForm";
import AuditSignIn from "@/components/audit/AuditSignIn";
import AuditQuestions from "@/components/audit/AuditQuestions";
import AuditResults from "@/components/audit/AuditResults";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export type UserDetails = {
  name: string;
  role: string;
  industry: string;
  website: string;
  company: string;
};

export type AuditAnswers = {
  [key: string]: string;
};

const BrandAudit = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    role: "",
    industry: "",
    website: "",
    company: "",
  });
  const [auditAnswers, setAuditAnswers] = useState<AuditAnswers>({});

  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Jump straight to assessment after auth when resume=1
  useEffect(() => {
    if (searchParams.get('resume') === '1') {
      setCurrentStep(3);
    }
  }, [searchParams]);

  // Gate access based on auth and prior completion
  useEffect(() => {
    if (loading) return;

    if (!user) {
      const next = encodeURIComponent('/brand-audit?resume=1');
      navigate(`/auth?next=${next}`, { replace: true });
      return;
    }

    (async () => {
      const { data } = await supabase
        .from('brand_audits')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .limit(1);

      if (data && data.length > 0) {
        navigate('/progress', { replace: true });
      }
    })();
  }, [user, loading, navigate]);

  const steps = [
    "Introduction",
    "Your Details", 
    "Create Account",
    "Brand Assessment",
    "Results"
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AuditIntro onNext={handleNext} />;
      case 1:
        return (
          <UserDetailsForm
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 2:
        return (
          <AuditSignIn
            onNext={handleNext}
            onPrevious={handlePrevious}
            userName={userDetails.name}
            userDetails={userDetails}
          />
        );
      case 3:
        return (
          <AuditQuestions
            answers={auditAnswers}
            setAnswers={setAuditAnswers}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <AuditResults
            userDetails={userDetails}
            answers={auditAnswers}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Brand Health Check</h1>
            <Badge variant="secondary" className="text-sm">
              Step {currentStep + 1} of {steps.length}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{steps[currentStep]}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default BrandAudit;
import { useState, useEffect, useRef } from "react";
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
  const [draftAuditId, setDraftAuditId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeout = useRef<number | null>(null);
  const lastSavedRef = useRef<string>("");

  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Handle deep-linking into specific steps or resume flow
  useEffect(() => {
    const step = searchParams.get('step');
    const stepMap: Record<string, number> = {
      intro: 0,
      details: 1,
      signup: 2,
      questions: 3,
      results: 4,
    };

    if (step && step in stepMap) {
      setCurrentStep(stepMap[step]);
      return;
    }

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

      const hasStep = !!searchParams.get('step');
      if (data && data.length > 0 && !hasStep) {
        navigate('/progress', { replace: true });
      }
    })();
  }, [user, loading, navigate]);

  // Load latest audit (draft or completed) to hydrate state and resume editing
  useEffect(() => {
    if (!user || loading) return;

    (async () => {
      const { data, error } = await supabase
        .from('brand_audits')
        .select('id, status, answers, user_details')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('[BrandAudit] Failed to load latest audit:', error);
        return;
      }

      if (data && data.length > 0) {
        const row: any = data[0];
        if (row.answers) setAuditAnswers(row.answers);
        if (row.user_details) setUserDetails((prev) => ({ ...prev, ...row.user_details }));
        if (row.status === 'draft') setDraftAuditId(row.id);
      }
    })();
  }, [user, loading]);

  // Debounced autosave of answers and user details into a draft audit
  useEffect(() => {
    if (!user) return;

    const snapshot = JSON.stringify({ userDetails, auditAnswers });
    if (snapshot === lastSavedRef.current) return;

    if (saveTimeout.current) window.clearTimeout(saveTimeout.current);

    saveTimeout.current = window.setTimeout(async () => {
      setIsSaving(true);
      try {
        if (draftAuditId) {
          const { error } = await supabase
            .from('brand_audits')
            .update({
              answers: auditAnswers,
              user_details: userDetails,
              status: 'draft',
            })
            .eq('id', draftAuditId);
          if (error) throw error;
        } else {
          const { data, error } = await supabase
            .from('brand_audits')
            .insert({
              user_id: user.id,
              title: 'Brand Audit',
              answers: auditAnswers,
              user_details: userDetails,
              status: 'draft',
            })
            .select('id')
            .single();
          if (error) throw error;
          if (data) setDraftAuditId((data as any).id);
        }
        lastSavedRef.current = snapshot;
      } catch (e) {
        console.error('[BrandAudit] Autosave failed:', e);
      } finally {
        setIsSaving(false);
      }
    }, 600);

    return () => {
      if (saveTimeout.current) window.clearTimeout(saveTimeout.current);
    };
  }, [user, draftAuditId, userDetails, auditAnswers]);

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
            draftAuditId={draftAuditId || undefined}
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
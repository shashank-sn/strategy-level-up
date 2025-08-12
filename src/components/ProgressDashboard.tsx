import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useProgress } from "@/contexts/ProgressContext";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  Lock, 
  Edit
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const ProgressDashboard = () => {
  const { progress } = useProgress();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [modules, setModules] = useState(progress.modules);
  const [loading, setLoading] = useState(false);

  const moduleRoutes: Record<string, string> = {
    'brand-profile': '/brand-audit', // Brand Profile Setup leads to audit page
    'brand-audit': '/brand-audit', // Brand Audit stays on audit page
    'foundation': '/modules/foundation',
    'business-goals': '/modules/business-goals',
    'founder-story': '/modules/founder-story',
    'personality': '/modules/personality',
    'audience': '/modules/audience',
    'competitive-analysis': '/modules/competitive-analysis',
    'gap-analysis': '/modules/gap-analysis',
    'positioning': '/modules/positioning',
    'brand-concept': '/modules/brand-concept',
    'strategic-pillars': '/modules/strategic-pillars'
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Helper to determine if a response is considered answered
  const isAnswered = (value: any) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return Object.keys(value).length > 0;
    return true; // numbers, booleans are considered answered
  };
  
  // SEO tags
  useEffect(() => {
    document.title = "Brand Strategy Dashboard | Progress";
    const existingMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const meta = existingMeta ?? (() => {
      const m = document.createElement('meta');
      m.name = 'description';
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute('content', 'Track your brand profile setup and brand audit progress.');

    const existingLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const link = existingLink ?? (() => {
      const l = document.createElement('link');
      l.rel = 'canonical';
      document.head.appendChild(l);
      return l;
    })();
    link.href = window.location.origin + '/progress';
  }, []);

  useEffect(() => {
    if (!user) return;
    let active = true;
    (async () => {
      try {
        setLoading(true);

        const foundationQuestionIds = ['profit-only', 'purpose-statement', 'vision-statement', 'mission-statement'];
        const businessGoalsQuestionIds = [
          'ultimate_goal',
          'midterm_goal',
          'shortterm_goal',
          'brand_awareness_confidence',
          'customer_engagement_confidence',
          'customer_loyalty_confidence',
          'measurement_strategy'
        ];
        const founderStoryQuestionIds = [
          'founder_story_hook',
          'biggest_challenge',
          'marketing_problem',
          'distribution_sales_problem',
          'branding_problem',
          'obstacles_overcome'
        ];
        const personalityQuestionIds = [
          'innovative_traditional',
          'playful_serious',
          'luxury_affordable',
          'friendly_authoritative',
          'modern_classic',
          'brand_animal',
          'brand_as_person',
          'core_values',
          'one_word'
        ];

        const [auditRes, profileRes, respRes, respGoalsRes, respFounderRes, respPersonalityRes, personasRes] = await Promise.all([
          supabase
            .from('brand_audits')
            .select('total_score, completion_percentage, status, user_details, created_at, completed_at')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle(),
          supabase
            .from('profiles')
            .select('first_name, last_name, company_name, role')
            .eq('user_id', user.id)
            .limit(1)
            .maybeSingle(),
          supabase
            .from('module_responses')
            .select('question_id, response_data')
            .eq('user_id', user.id)
            .eq('module_id', 'brand-foundation'),
          supabase
            .from('module_responses')
            .select('question_id, response_data')
            .eq('user_id', user.id)
            .eq('module_id', 'business-goals'),
          supabase
            .from('module_responses')
            .select('question_id, response_data')
            .eq('user_id', user.id)
            .eq('module_id', 'founder-story'),
          supabase
            .from('module_responses')
            .select('question_id, response_data')
            .eq('user_id', user.id)
            .eq('module_id', 'brand-personality'),
          supabase
            .from('audience_personas')
            .select('id')
            .eq('user_id', user.id)
        ]);

        const audit = auditRes.data as any;
        const profile = profileRes.data as any;

        const details: any = (audit?.user_details && typeof audit.user_details === 'object') ? (audit.user_details as any) : {};
        const name = details.name || [profile?.first_name, profile?.last_name].filter(Boolean).join(' ');
        const role = details.role || (profile as any)?.role;
        const industry = details.industry;
        const company = details.company || (profile as any)?.company_name;
        const website = details.website;

        const fields = [name, role, industry, company, website];
        const filled = fields.filter((f) => (typeof f === 'string' ? f.trim().length > 0 : !!f)).length;
        const profileScore = Math.round((filled / fields.length) * 100);

        // Compute Brand Foundation score based on answered required questions
        const responsesFoundation = (respRes.data || []) as Array<{ question_id: string; response_data: any }>;
        const answeredFoundation = responsesFoundation.filter(r => foundationQuestionIds.includes(r.question_id) && isAnswered(r.response_data)).length;
        const foundationScore = Math.round((answeredFoundation / foundationQuestionIds.length) * 100);

        // Compute Business Goals score based on answered required questions
        const responsesGoals = (respGoalsRes.data || []) as Array<{ question_id: string; response_data: any }>;
        const answeredGoals = responsesGoals.filter(r => businessGoalsQuestionIds.includes(r.question_id) && isAnswered(r.response_data)).length;
        const businessGoalsScore = Math.round((answeredGoals / businessGoalsQuestionIds.length) * 100);

        // Compute Founder Story score based on answered required questions
        const responsesFounder = (respFounderRes.data || []) as Array<{ question_id: string; response_data: any }>;
        const answeredFounder = responsesFounder.filter(r => founderStoryQuestionIds.includes(r.question_id) && isAnswered(r.response_data)).length;
        const founderStoryScore = Math.round((answeredFounder / founderStoryQuestionIds.length) * 100);

        // Compute Brand Personality score based on answered required questions
        const responsesPersonality = (respPersonalityRes.data || []) as Array<{ question_id: string; response_data: any }>;
        const answeredPersonality = responsesPersonality.filter(r => personalityQuestionIds.includes(r.question_id) && isAnswered(r.response_data)).length;
        const personalityScore = Math.round((answeredPersonality / personalityQuestionIds.length) * 100);

        // Compute Audience Personas score based on number of personas created (out of 3 required)
        const personaCount = ((personasRes.data || []) as Array<{ id: string }>).length;
        const audienceScore = Math.round(Math.min(100, (personaCount / 3) * 100));

        if (!active) return;

        setModules((prev) =>
          prev.map((m) => {
            if (m.id === 'brand-audit') {
              const score = audit?.total_score ?? 0;
              const completed = audit ? (audit.status === 'completed' || (audit.completion_percentage ?? 0) >= 100) : false;
              return { ...m, score, completed, locked: false };
            }
            if (m.id === 'brand-profile') {
              const completed = profileScore >= 60;
              return { ...m, score: profileScore, completed, locked: false };
            }
            if (m.id === 'foundation') {
              const completed = foundationScore >= 100;
              return { ...m, score: foundationScore, completed, locked: false };
            }
            if (m.id === 'business-goals') {
              const completed = businessGoalsScore >= 100;
              return { ...m, score: businessGoalsScore, completed, locked: false };
            }
            if (m.id === 'founder-story') {
              const completed = founderStoryScore >= 100;
              return { ...m, score: founderStoryScore, completed, locked: false };
            }
            if (m.id === 'personality') {
              const completed = personalityScore >= 100;
              return { ...m, score: personalityScore, completed, locked: false };
            }
            if (m.id === 'audience') {
              const completed = audienceScore >= 100;
              return { ...m, score: audienceScore, completed, locked: false };
            }
            return m;
          })
        );
      } catch (err) {
        console.error('[ProgressDashboard] Error loading Supabase progress', err);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Brand Strategy Dashboard</h1>
          <p className="text-muted-foreground">
            Track your progress and monitor your brand strategy development
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed Modules</p>
                  <p className="text-2xl font-bold">
                    {modules.filter(m => m.completed).length}/{modules.length}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">modules finished</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-blue-600 font-bold text-sm">∑</div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Score</p>
                  <p className="text-2xl font-bold">
                    {modules.reduce((sum, module) => sum + module.score, 0)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">out of 1200 points</p>
            </CardContent>
          </Card>
        </div>

        {/* Module Progress */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {modules.map((module, index) => (
                <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                      {index + 1}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {module.locked ? (
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      ) : module.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-primary rounded-full" />
                      )}
                      
                      <div>
                        <h4 className="font-medium">{module.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-sm font-medium ${getScoreColor(module.score)}`}>
                            {module.score}/100
                          </span>
                          {module.completed && (
                            <Badge variant="secondary" className="text-xs">
                              Completed
                            </Badge>
                          )}
                          {module.locked && (
                            <Badge variant="outline" className="text-xs">
                              Locked
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {module.score > 0 && (
                      <Progress value={module.score} className="w-20" />
                    )}
                    
                    {!module.locked && (
                      <div className="flex gap-2">
                        {module.completed && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              if (module.id === 'brand-profile') return navigate('/brand-audit?step=details');
                              if (module.id === 'brand-audit') return navigate('/brand-audit?step=questions');
                              navigate(moduleRoutes[module.id]);
                            }}
                            className="flex items-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </Button>
                        )}
                        {!module.completed && (
                          <Button
                            size="sm"
                            onClick={() => {
                              if (module.id === 'brand-profile') return navigate('/brand-audit?step=details');
                              if (module.id === 'brand-audit') return navigate('/brand-audit?resume=1');
                              navigate(moduleRoutes[module.id]);
                            }}
                          >
                            {module.score > 0 ? 'Continue' : 'Start'}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
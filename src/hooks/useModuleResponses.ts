import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ModuleQuestionMeta {
  id: string;
  question: string;
}

interface UseModuleResponsesOptions {
  moduleId: string;
  questions: ModuleQuestionMeta[];
  debounceMs?: number;
}

interface ExistingRow {
  id: string;
  question_id: string;
}

export function useModuleResponses({ moduleId, questions, debounceMs = 600 }: UseModuleResponsesOptions) {
  const { user } = useAuth();
  const [initialAnswers, setInitialAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const existingMapRef = useRef<Record<string, ExistingRow>>({});
  const timerRef = useRef<number | null>(null);
  const lastSavedRef = useRef<Record<string, any>>({});

  const questionTextById = useMemo(() => {
    const map: Record<string, string> = {};
    questions.forEach((q) => (map[q.id] = q.question));
    return map;
  }, [questions]);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("module_responses")
          .select("id, question_id, response_data")
          .eq("user_id", user.id)
          .eq("module_id", moduleId);

        if (error) throw error;

        const answers: Record<string, any> = {};
        const existing: Record<string, ExistingRow> = {};
        (data || []).forEach((row: any) => {
          answers[row.question_id] = row.response_data;
          existing[row.question_id] = { id: row.id, question_id: row.question_id };
        });
        if (!active) return;
        existingMapRef.current = existing;
        lastSavedRef.current = answers;
        setInitialAnswers(answers);
      } catch (e: any) {
        if (!active) return;
        setError(e?.message || "Failed to load saved responses");
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [user, moduleId]);

  const saveAnswers = useCallback(
    (answers: Record<string, any>) => {
      if (!user) return; // only persist for authenticated users
      if (timerRef.current) window.clearTimeout(timerRef.current);

      timerRef.current = window.setTimeout(async () => {
        try {
          // determine changes from lastSaved
          const changes: [string, any][] = Object.entries(answers).filter(
            ([key, value]) => lastSavedRef.current[key] !== value
          );
          if (changes.length === 0) return;

          // split into updates and inserts
          const updates: any[] = [];
          const inserts: any[] = [];

          for (const [question_id, value] of changes) {
            const existing = existingMapRef.current[question_id];
            if (existing?.id) {
              updates.push({ id: existing.id, response_data: value, score: 0 });
            } else {
              inserts.push({
                user_id: user.id,
                module_id: moduleId,
                question_id,
                question_text: questionTextById[question_id] || null,
                response_data: value,
                score: 0,
              });
            }
          }

          if (updates.length > 0) {
            // Perform individual updates to satisfy TypeScript types
            await Promise.all(
              updates.map(async (u) => {
                const { error: updErr } = await supabase
                  .from("module_responses")
                  .update({ response_data: u.response_data, score: u.score })
                  .eq("id", u.id);
                if (updErr) throw updErr;
              })
            );
          }

          if (inserts.length > 0) {
            const { data: insData, error: insErr } = await supabase
              .from("module_responses")
              .insert(inserts)
              .select("id, question_id");
            if (insErr) throw insErr;
            // update existing map with inserted ids
            (insData || []).forEach((row: any) => {
              existingMapRef.current[row.question_id] = { id: row.id, question_id: row.question_id };
            });
          }

          // update lastSaved
          lastSavedRef.current = { ...lastSavedRef.current, ...answers };
        } catch (e) {
          // Fail silently for now to avoid noisy UX
          console.error("[useModuleResponses] save error", e);
        }
      }, debounceMs);
    },
    [user, moduleId, questionTextById, debounceMs]
  );

  return { initialAnswers, loading, error, saveAnswers };
}

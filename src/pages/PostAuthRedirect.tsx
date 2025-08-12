import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function PostAuthRedirect() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    // If no user, go to auth page
    if (!user) {
      navigate(`/auth${location.search}`, { replace: true });
      return;
    }

    const params = new URLSearchParams(location.search);
    const nextFromQuery = params.get("next");
    const storedNext = localStorage.getItem("postAuthNext");
    const fallback = "/brand-audit?resume=1";
    const intendedNext = nextFromQuery || storedNext || fallback;

    (async () => {
      // If completed audit exists, send to dashboard
      const { data } = await supabase
        .from("brand_audits")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "completed")
        .limit(1);

      if (data && data.length > 0) {
        localStorage.removeItem("postAuthNext");
        navigate("/progress", { replace: true });
        return;
      }

      // Otherwise, continue to intended next
      localStorage.removeItem("postAuthNext");
      navigate(intendedNext, { replace: true });
    })();
  }, [user, loading, navigate, location]);

  return (
    <div className="min-h-screen grid place-items-center">
      <p className="text-muted-foreground">Signing you in…</p>
    </div>
  );
}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BrandAudit from "./pages/BrandAudit";
import BrandJourney from "./pages/BrandJourney";
import BrandFoundationModule from "./pages/modules/BrandFoundationModule";
import BusinessGoalsModule from "./pages/modules/BusinessGoalsModule";
import FounderStoryModule from "./pages/modules/FounderStoryModule";
import BrandPersonalityModule from "./pages/modules/BrandPersonalityModule";
import AudiencePersonaModule from "./pages/modules/AudiencePersonaModule";
import GapAnalysisModule from "./pages/modules/GapAnalysisModule";
import PositioningModule from "./pages/modules/PositioningModule";
import BrandConceptModule from "./pages/modules/BrandConceptModule";
import StrategicPillarsModule from "./pages/modules/StrategicPillarsModule";
import BrandBlueprintPage from "./pages/BrandBlueprintPage";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/brand-audit" element={<BrandAudit />} />
          <Route path="/brand-journey" element={<BrandJourney />} />
          <Route path="/brand-journey/foundation" element={<BrandFoundationModule />} />
          <Route path="/brand-journey/business-goals" element={<BusinessGoalsModule />} />
          <Route path="/brand-journey/founder-story" element={<FounderStoryModule />} />
          <Route path="/brand-journey/personality" element={<BrandPersonalityModule />} />
          <Route path="/brand-journey/audience" element={<AudiencePersonaModule />} />
          <Route path="/brand-journey/gap-analysis" element={<GapAnalysisModule />} />
          <Route path="/brand-journey/positioning" element={<PositioningModule />} />
          <Route path="/brand-journey/brand-concept" element={<BrandConceptModule />} />
          <Route path="/brand-journey/strategic-pillars" element={<StrategicPillarsModule />} />
          <Route path="/brand-blueprint" element={<BrandBlueprintPage />} />
          <Route path="/pricing" element={<Pricing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

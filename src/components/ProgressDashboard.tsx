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

export const ProgressDashboard = () => {
  const { progress } = useProgress();
  const navigate = useNavigate();

  const moduleRoutes: Record<string, string> = {
    'foundation': '/modules/foundation',
    'business-goals': '/modules/business-goals',
    'founder-story': '/modules/founder-story',
    'personality': '/modules/personality',
    'audience': '/modules/audience',
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
        <div className="grid gap-6 md:grid-cols-1 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed Modules</p>
                  <p className="text-2xl font-bold">
                    {progress.modules.filter(m => m.completed).length}/{progress.modules.length}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">modules finished</p>
            </CardContent>
          </Card>
        </div>

        {/* Module Progress */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {progress.modules.map((module, index) => (
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
                            onClick={() => navigate(moduleRoutes[module.id])}
                            className="flex items-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </Button>
                        )}
                        
                        {!module.completed && (
                          <Button
                            size="sm"
                            onClick={() => navigate(moduleRoutes[module.id])}
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
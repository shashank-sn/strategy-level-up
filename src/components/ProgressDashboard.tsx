import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProgress } from "@/contexts/ProgressContext";
import { useNavigate } from "react-router-dom";
import { 
  Target, 
  CheckCircle, 
  Lock, 
  TrendingUp, 
  Clock, 
  Award,
  Edit,
  Download,
  BarChart3,
  Calendar
} from "lucide-react";

export const ProgressDashboard = () => {
  const { progress, getBrandHealthLevel } = useProgress();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const moduleRoutes: Record<string, string> = {
    'foundation': '/brand-journey/foundation',
    'business-goals': '/brand-journey/business-goals',
    'founder-story': '/brand-journey/founder-story',
    'personality': '/brand-journey/personality',
    'audience': '/brand-journey/audience',
    'gap-analysis': '/brand-journey/gap-analysis',
    'positioning': '/brand-journey/positioning',
    'brand-concept': '/brand-journey/brand-concept',
    'strategic-pillars': '/brand-journey/strategic-pillars'
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const downloadOptions = [
    { format: 'PDF', description: 'Professional print-ready format' },
    { format: 'Word', description: 'Editable document format' },
    { format: 'Google Docs', description: 'Collaborative online format' }
  ];

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
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                  <p className="text-2xl font-bold">{Math.round(progress.overallProgress)}%</p>
                </div>
              </div>
              <Progress value={progress.overallProgress} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Score</p>
                  <p className="text-2xl font-bold">{progress.overallScore}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">out of 1000 points</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${getHealthColor(progress.brandHealthScore)} rounded-lg flex items-center justify-center`}>
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Brand Health</p>
                  <p className="text-lg font-bold">{getBrandHealthLevel()}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{Math.round(progress.brandHealthScore)}% completion quality</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">
                    {progress.modules.filter(m => m.completed).length}/{progress.modules.length}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">modules finished</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Module Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
          </TabsList>

          {/* Module Overview */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Module Progress</CardTitle>
              </CardHeader>
              <CardContent>
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
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Score Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {progress.modules.map((module) => (
                      <div key={module.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{module.name}</span>
                          <span className={`text-sm font-bold ${getScoreColor(module.score)}`}>
                            {module.score}%
                          </span>
                        </div>
                        <Progress value={module.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Completion Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {progress.modules
                      .filter(m => m.completed && m.completedAt)
                      .map((module) => (
                        <div key={module.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div>
                            <p className="text-sm font-medium">{module.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Score: {module.score}/100
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">
                              {module.completedAt && new Date(module.completedAt).toLocaleDateString()}
                            </p>
                            {module.timeSpent && (
                              <p className="text-xs text-muted-foreground">
                                {Math.round(module.timeSpent / 60)}min
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Downloads */}
          <TabsContent value="downloads" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-primary" />
                    One-Page Strategy Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Download your complete brand strategy in a professional one-page format
                  </p>
                  
                  <div className="space-y-3">
                    {downloadOptions.map((option) => (
                      <div key={option.format} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{option.format}</p>
                          <p className="text-xs text-muted-foreground">{option.description}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Action Plan & Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Download detailed implementation guidelines and 90-day action plan
                  </p>
                  
                  <div className="space-y-3">
                    {downloadOptions.map((option) => (
                      <div key={option.format} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{option.format}</p>
                          <p className="text-xs text-muted-foreground">{option.description}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Complete Brand Blueprint</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
                  <div>
                    <h4 className="font-medium mb-1">Full Brand Strategy Package</h4>
                    <p className="text-sm text-muted-foreground">
                      All documents, guidelines, and assets in one comprehensive package
                    </p>
                  </div>
                  <Button 
                    className="flex items-center gap-2"
                    onClick={() => navigate('/brand-blueprint')}
                  >
                    <Award className="w-4 h-4" />
                    View Blueprint
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
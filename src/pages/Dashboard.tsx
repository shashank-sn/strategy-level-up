import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UserNav } from "@/components/dashboard/UserNav";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { VisitorsChart } from "@/components/dashboard/VisitorsChart";
import { Search, Bell, Github } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <Input
                type="search"
                placeholder="Search..."
                className="md:w-[100px] lg:w-[300px]"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
            </Button>
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>Download Report</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Total Brands Created"
                value="2,847"
                change="+12.5%"
                trend="up"
                description="Trending up this month"
                subtext="Strong brand creation growth"
              />
              <MetricCard
                title="Active Users"
                value="1,234"
                change="+8.2%"
                trend="up"
                description="Up 8.2% this period"
                subtext="Excellent user engagement"
              />
              <MetricCard
                title="Completion Rate"
                value="89.6%"
                change="+4.1%"
                trend="up"
                description="Strong completion rate"
                subtext="Users finishing journeys"
              />
              <MetricCard
                title="Average Score"
                value="92.3%"
                change="+2.4%"
                trend="up"
                description="Steady performance increase"
                subtext="High-quality strategies"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <VisitorsChart />
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest user progress and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardLayout;
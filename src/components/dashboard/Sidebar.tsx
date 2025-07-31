import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  HelpCircle,
  Search,
  Plus,
  Home,
  Trophy,
  Brain,
  Palette,
  ChevronRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Brand Journey",
    href: "/journey",
    icon: Target,
    badge: "10 Levels"
  },
  {
    name: "Analytics",
    href: "/analytics", 
    icon: BarChart3,
  },
  {
    name: "Templates",
    href: "/templates",
    icon: Palette,
  },
  {
    name: "Team",
    href: "/team",
    icon: Users,
  },
];

const documents = [
  {
    name: "Brand Guidelines",
    href: "/documents/guidelines",
    icon: FileText,
    badge: "New"
  },
  {
    name: "Strategy Reports",
    href: "/documents/reports", 
    icon: BarChart3,
    badge: "3"
  },
  {
    name: "AI Assistant",
    href: "/documents/assistant",
    icon: Brain,
    badge: "Beta"
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        {/* Header */}
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold">AI Brand Strategist</h2>
          </div>
          
          <Button className="w-full justify-start gap-2" variant="default">
            <Plus className="w-4 h-4" />
            Quick Create
          </Button>
        </div>

        {/* Main Navigation */}
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                  asChild
                >
                  <Link to={item.href}>
                    <item.icon className="w-4 h-4" />
                    {item.name}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Documents Section */}
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-sm font-semibold text-muted-foreground">
            Documents
          </h3>
          <div className="space-y-1">
            {documents.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start gap-3"
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="w-4 h-4" />
                  {item.name}
                  <div className="ml-auto flex items-center gap-1">
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                </Link>
              </Button>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground"
            >
              <FileText className="w-4 h-4" />
              More
            </Button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-3 py-2 space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <HelpCircle className="w-4 h-4" />
            Get Help
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
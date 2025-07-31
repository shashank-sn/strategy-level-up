import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      email: "sarah@startup.com",
      avatar: "/avatars/01.png",
      initials: "SC"
    },
    action: "Completed Level 3: Brand Personality",
    score: "92%",
    time: "2 hours ago",
    badge: "Level Up!"
  },
  {
    id: 2,
    user: {
      name: "Marcus Rodriguez",
      email: "marcus@agency.com", 
      avatar: "/avatars/02.png",
      initials: "MR"
    },
    action: "Started Brand Audit",
    score: "In Progress",
    time: "4 hours ago",
    badge: "New"
  },
  {
    id: 3,
    user: {
      name: "Lisa Wang",
      email: "lisa@ecommerce.com",
      avatar: "/avatars/03.png", 
      initials: "LW"
    },
    action: "Exported Brand Strategy Report",
    score: "Complete",
    time: "6 hours ago",
    badge: "Export"
  },
  {
    id: 4,
    user: {
      name: "David Kim",
      email: "david@tech.com",
      avatar: "/avatars/04.png",
      initials: "DK"
    },
    action: "Completed Level 7: Competitive Analysis", 
    score: "89%",
    time: "1 day ago",
    badge: "Level Up!"
  },
  {
    id: 5,
    user: {
      name: "Emma Thompson",
      email: "emma@creative.com",
      avatar: "/avatars/05.png",
      initials: "ET"
    },
    action: "Updated Brand Guidelines",
    score: "Revised",
    time: "2 days ago",
    badge: "Update"
  }
];

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar} alt="Avatar" />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">
                {activity.user.name}
              </p>
              <Badge 
                variant={activity.badge === "Level Up!" ? "default" : "secondary"}
                className="text-xs"
              >
                {activity.badge}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {activity.action}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {activity.user.email}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-primary">
                  {activity.score}
                </span>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
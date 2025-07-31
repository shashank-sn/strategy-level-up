import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
  subtext: string;
}

export function MetricCard({ title, value, change, trend, description, subtext }: MetricCardProps) {
  const isPositive = trend === "up";
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn(
          "flex items-center gap-1 text-xs",
          isPositive ? "text-success" : "text-destructive"
        )}>
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {change}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="space-y-1">
          <p className={cn(
            "text-xs flex items-center gap-1",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {description}
          </p>
          <p className="text-xs text-muted-foreground">{subtext}</p>
        </div>
      </CardContent>
    </Card>
  );
}
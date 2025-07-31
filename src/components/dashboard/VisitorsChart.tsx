import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", visitors: 2400 },
  { month: "Feb", visitors: 1398 },
  { month: "Mar", visitors: 9800 },
  { month: "Apr", visitors: 3908 },
  { month: "May", visitors: 4800 },
  { month: "Jun", visitors: 3800 },
  { month: "Jul", visitors: 4300 },
];

const timeFilters = [
  { label: "Last 3 months", active: true },
  { label: "Last 30 days", active: false },
  { label: "Last 7 days", active: false },
];

export function VisitorsChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Total Visitors</CardTitle>
            <CardDescription>
              Total for the last 3 months
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {timeFilters.map((filter) => (
              <Badge 
                key={filter.label}
                variant={filter.active ? "default" : "outline"}
                className="cursor-pointer"
              >
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="visitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#visitors)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
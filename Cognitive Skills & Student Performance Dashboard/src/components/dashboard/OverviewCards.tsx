import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Clock, Award } from "lucide-react";

interface OverviewCardsProps {
  analytics: {
    totalStudents: number;
    averageScore: number;
    averageEngagement: number;
    topPerformers: number;
    needsSupport: number;
  };
}

export function OverviewCards({ analytics }: OverviewCardsProps) {
  const cards = [
    {
      title: "Total Students",
      value: analytics.totalStudents,
      icon: Users,
      description: "Active learners",
      color: "text-primary"
    },
    {
      title: "Average Score",
      value: `${analytics.averageScore}%`,
      icon: TrendingUp,
      description: "Assessment performance",
      color: "text-success"
    },
    {
      title: "Engagement Time",
      value: `${analytics.averageEngagement}min`,
      icon: Clock,
      description: "Daily average",
      color: "text-info"
    },
    {
      title: "Top Performers",
      value: analytics.topPerformers,
      icon: Award,
      description: "Score ≥ 85%",
      color: "text-warning"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card 
          key={index}
          className="bg-surface border-border hover:bg-card-hover transition-all duration-300 hover:shadow-lg"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className={`h-5 w-5 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{card.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
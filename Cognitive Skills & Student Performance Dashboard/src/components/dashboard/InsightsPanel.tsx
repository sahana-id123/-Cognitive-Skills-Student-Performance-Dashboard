import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, Target, Users } from "lucide-react";

interface InsightsPanelProps {
  analytics: {
    totalStudents: number;
    averageScore: number;
    averageEngagement: number;
    topPerformers: number;
    needsSupport: number;
    correlations: Record<string, number>;
    personaDistribution: Record<string, number>;
  };
}

export function InsightsPanel({ analytics }: InsightsPanelProps) {
  const insights = [
    {
      type: "positive",
      icon: TrendingUp,
      title: "Strong Attention-Performance Link",
      description: `Attention shows the highest correlation (${analytics.correlations.attentionVsScore}) with assessment scores, indicating focused students perform better.`,
      color: "text-success"
    },
    {
      type: "warning", 
      icon: AlertTriangle,
      title: "Students Need Support",
      description: `${analytics.needsSupport} students (${Math.round((analytics.needsSupport / analytics.totalStudents) * 100)}%) scored below 60% and may benefit from additional learning support.`,
      color: "text-warning"
    },
    {
      type: "insight",
      icon: Target,
      title: "Comprehension Impact",
      description: `Comprehension skills show strong correlation (${analytics.correlations.comprehensionVsScore}) with performance, suggesting conceptual understanding is key.`,
      color: "text-primary"
    },
    {
      type: "demographic",
      icon: Users,
      title: "Learning Persona Distribution",
      description: `Most common personas: ${Object.entries(analytics.personaDistribution)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 2)
        .map(([persona, count]) => `${persona} (${count})`)
        .join(", ")}.`,
      color: "text-info"
    }
  ];

  const recommendations = [
    {
      title: "Focus Training Programs",
      description: "Implement attention and focus training for students with low attention scores",
      priority: "High"
    },
    {
      title: "Personalized Learning Paths", 
      description: "Create tailored learning experiences based on identified learning personas",
      priority: "Medium"
    },
    {
      title: "Comprehension Workshops",
      description: "Develop conceptual understanding workshops for students with low comprehension",
      priority: "High"
    },
    {
      title: "Engagement Strategies",
      description: "Investigate low engagement patterns and implement interactive learning methods",
      priority: "Medium"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-danger text-white";
      case "Medium": return "bg-warning text-white";
      case "Low": return "bg-success text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Insights */}
      <Card className="bg-surface border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
              <insight.icon className={`h-5 w-5 mt-0.5 ${insight.color}`} />
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-surface border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="flex items-start justify-between p-3 rounded-lg border border-border">
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{rec.title}</h4>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
              <Badge className={getPriorityColor(rec.priority)}>
                {rec.priority}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Learning Persona Breakdown */}
      <Card className="bg-surface border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Learning Persona Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(analytics.personaDistribution)
              .sort(([,a], [,b]) => b - a)
              .map(([persona, count]) => (
                <div key={persona} className="flex items-center justify-between">
                  <span className="text-foreground font-medium">{persona}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all duration-500"
                        style={{ width: `${(count / analytics.totalStudents) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {count} ({Math.round((count / analytics.totalStudents) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
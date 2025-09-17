import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Cell } from "recharts";
import { Student } from "@/data/studentData";

interface ChartsSectionProps {
  students: Student[];
  correlations: Record<string, number>;
}

export function ChartsSection({ students, correlations }: ChartsSectionProps) {
  // Prepare data for skill vs score chart
  const skillVsScore = [
    { skill: "Comprehension", correlation: correlations.comprehensionVsScore, avgSkill: Math.round(students.reduce((sum, s) => sum + s.comprehension, 0) / students.length) },
    { skill: "Attention", correlation: correlations.attentionVsScore, avgSkill: Math.round(students.reduce((sum, s) => sum + s.attention, 0) / students.length) },
    { skill: "Focus", correlation: correlations.focusVsScore, avgSkill: Math.round(students.reduce((sum, s) => sum + s.focus, 0) / students.length) },
    { skill: "Retention", correlation: correlations.retentionVsScore, avgSkill: Math.round(students.reduce((sum, s) => sum + s.retention, 0) / students.length) }
  ];

  // Scatter plot data (attention vs performance)
  const scatterData = students.map(s => ({
    attention: s.attention,
    score: s.assessment_score,
    name: s.name
  }));

  // Sample student for radar chart (top performer)
  const topStudent = students.reduce((prev, current) => 
    prev.assessment_score > current.assessment_score ? prev : current
  );

  const radarData = [
    { skill: "Comprehension", value: topStudent.comprehension, fullMark: 100 },
    { skill: "Attention", value: topStudent.attention, fullMark: 100 },
    { skill: "Focus", value: topStudent.focus, fullMark: 100 },
    { skill: "Retention", value: topStudent.retention, fullMark: 100 },
    { skill: "Assessment", value: topStudent.assessment_score, fullMark: 100 }
  ];

  const barColors = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--success))", "hsl(var(--warning))"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Skills Correlation Chart */}
      <Card className="bg-surface border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Skill vs Performance Correlation</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillVsScore}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="skill" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--surface))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="correlation" radius={[4, 4, 0, 0]}>
                {skillVsScore.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Attention vs Performance Scatter */}
      <Card className="bg-surface border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Attention vs Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={scatterData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="attention" 
                name="Attention" 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                dataKey="score" 
                name="Score" 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--surface))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                formatter={(value, name) => [value, name === "attention" ? "Attention" : "Score"]}
              />
              <Scatter fill="hsl(var(--primary))" fillOpacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Student Profile Radar */}
      <Card className="bg-surface border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Top Student Profile</CardTitle>
          <p className="text-sm text-muted-foreground">{topStudent.name}</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                dataKey="skill" 
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              />
              <Radar
                name="Skills"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
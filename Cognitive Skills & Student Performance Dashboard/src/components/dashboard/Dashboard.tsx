import { Brain, BarChart3 } from "lucide-react";
import { OverviewCards } from "./OverviewCards";
import { ChartsSection } from "./ChartsSection";
import { StudentTable } from "./StudentTable";
import { InsightsPanel } from "./InsightsPanel";
import { studentData, getAnalytics } from "@/data/studentData";

export function Dashboard() {
  const analytics = getAnalytics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Cognitive Skills Dashboard</h1>
                <p className="text-sm text-muted-foreground">Student Performance Analytics</p>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Live Analytics</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Overview Cards */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Performance Overview</h2>
          <OverviewCards analytics={analytics} />
        </section>

        {/* Charts Section */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Data Visualizations</h2>
          <ChartsSection students={studentData} correlations={analytics.correlations} />
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Student Table */}
          <div className="xl:col-span-2">
            <StudentTable students={studentData} />
          </div>

          {/* Insights Panel */}
          <div className="xl:col-span-1">
            <InsightsPanel analytics={analytics} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-surface/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Educational Analytics Platform • ML-Powered Insights • Student Performance Dashboard</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowUpDown } from "lucide-react";
import { Student } from "@/data/studentData";

interface StudentTableProps {
  students: Student[];
}

type SortField = keyof Student;
type SortDirection = 'asc' | 'desc';

export function StudentTable({ students }: StudentTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("assessment_score");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const filteredAndSortedStudents = useMemo(() => {
    // Filter students based on search term
    let filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.learning_persona?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort students
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [students, searchTerm, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getPersonaBadgeColor = (persona: string) => {
    switch (persona) {
      case "Focused Achiever": return "bg-success text-white";
      case "Deep Learner": return "bg-primary text-white";
      case "Needs Support": return "bg-danger text-white";
      case "Distracted Talent": return "bg-warning text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success font-semibold";
    if (score >= 70) return "text-warning font-semibold";
    if (score >= 60) return "text-foreground";
    return "text-danger font-semibold";
  };

  return (
    <Card className="bg-surface border-border">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <CardTitle className="text-foreground">Student Performance Data</CardTitle>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort("name")}
                    className="h-auto p-0 font-semibold text-foreground hover:text-primary"
                  >
                    Name <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </th>
                <th className="text-left p-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort("class")}
                    className="h-auto p-0 font-semibold text-foreground hover:text-primary"
                  >
                    Class <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </th>
                <th className="text-center p-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort("assessment_score")}
                    className="h-auto p-0 font-semibold text-foreground hover:text-primary"
                  >
                    Score <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </th>
                <th className="text-center p-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort("attention")}
                    className="h-auto p-0 font-semibold text-foreground hover:text-primary"
                  >
                    Attention <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </th>
                <th className="text-center p-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort("comprehension")}
                    className="h-auto p-0 font-semibold text-foreground hover:text-primary"
                  >
                    Comprehension <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </th>
                <th className="text-center p-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort("engagement_time")}
                    className="h-auto p-0 font-semibold text-foreground hover:text-primary"
                  >
                    Engagement <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </th>
                <th className="text-left p-3">
                  <span className="font-semibold text-foreground">Learning Persona</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedStudents.map((student) => (
                <tr key={student.student_id} className="border-b border-border hover:bg-card-hover transition-colors">
                  <td className="p-3">
                    <div>
                      <div className="font-medium text-foreground">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.student_id}</div>
                    </div>
                  </td>
                  <td className="p-3 text-foreground">{student.class}</td>
                  <td className="p-3 text-center">
                    <span className={getScoreColor(student.assessment_score)}>
                      {student.assessment_score}%
                    </span>
                  </td>
                  <td className="p-3 text-center text-foreground">{student.attention}</td>
                  <td className="p-3 text-center text-foreground">{student.comprehension}</td>
                  <td className="p-3 text-center text-foreground">{student.engagement_time}min</td>
                  <td className="p-3">
                    <Badge className={getPersonaBadgeColor(student.learning_persona!)}>
                      {student.learning_persona}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredAndSortedStudents.length} of {students.length} students
        </div>
      </CardContent>
    </Card>
  );
}
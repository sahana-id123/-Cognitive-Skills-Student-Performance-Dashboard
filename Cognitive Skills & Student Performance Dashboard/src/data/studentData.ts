export interface Student {
  student_id: string;
  name: string;
  class: string;
  comprehension: number;
  attention: number;
  focus: number;
  retention: number;
  assessment_score: number;
  engagement_time: number;
  learning_persona?: string;
}

// Generate synthetic student data
export const generateStudentData = (): Student[] => {
  const classes = ["Grade 8A", "Grade 8B", "Grade 9A", "Grade 9B", "Grade 10A", "Grade 10B"];
  const firstNames = [
    "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason", "Isabella", "William",
    "Mia", "James", "Charlotte", "Benjamin", "Amelia", "Lucas", "Harper", "Henry", "Evelyn", "Alexander",
    "Abigail", "Michael", "Emily", "Daniel", "Elizabeth", "Matthew", "Sofia", "Jackson", "Avery", "Sebastian",
    "Ella", "David", "Madison", "Carter", "Scarlett", "Wyatt", "Victoria", "Jayden", "Aria", "John"
  ];
  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"
  ];

  const students: Student[] = [];

  for (let i = 1; i <= 120; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const className = classes[Math.floor(Math.random() * classes.length)];
    
    // Create correlated cognitive skills (some randomness but realistic patterns)
    const baseAbility = 40 + Math.random() * 50; // Base cognitive ability
    const noise = () => (Math.random() - 0.5) * 20; // Random variation
    
    const comprehension = Math.max(0, Math.min(100, baseAbility + noise()));
    const attention = Math.max(0, Math.min(100, baseAbility * 0.9 + noise()));
    const focus = Math.max(0, Math.min(100, attention * 0.8 + noise()));
    const retention = Math.max(0, Math.min(100, comprehension * 0.7 + noise()));
    
    // Assessment score correlates with cognitive skills but has some randomness
    const cognitiveAverage = (comprehension + attention + focus + retention) / 4;
    const assessment_score = Math.max(0, Math.min(100, cognitiveAverage * 0.85 + noise()));
    
    // Engagement time correlates with attention and focus
    const engagement_time = Math.max(10, Math.min(180, (attention + focus) / 2 * 1.5 + noise()));

    students.push({
      student_id: `STU${i.toString().padStart(3, '0')}`,
      name: `${firstName} ${lastName}`,
      class: className,
      comprehension: Math.round(comprehension),
      attention: Math.round(attention),
      focus: Math.round(focus),
      retention: Math.round(retention),
      assessment_score: Math.round(assessment_score),
      engagement_time: Math.round(engagement_time)
    });
  }

  // Add learning personas based on cognitive patterns
  return students.map(student => {
    const { comprehension, attention, focus, retention } = student;
    let persona = "";
    
    if (attention >= 80 && focus >= 80) {
      persona = "Focused Achiever";
    } else if (comprehension >= 80 && retention >= 80) {
      persona = "Deep Learner";
    } else if (attention < 50 && focus < 50) {
      persona = "Needs Support";
    } else if (comprehension >= 70 && attention < 60) {
      persona = "Distracted Talent";
    } else {
      persona = "Balanced Learner";
    }
    
    return { ...student, learning_persona: persona };
  });
};

export const studentData = generateStudentData();

// Analytics calculations
export const getAnalytics = () => {
  const data = studentData;
  
  return {
    totalStudents: data.length,
    averageScore: Math.round(data.reduce((sum, s) => sum + s.assessment_score, 0) / data.length),
    averageEngagement: Math.round(data.reduce((sum, s) => sum + s.engagement_time, 0) / data.length),
    topPerformers: data.filter(s => s.assessment_score >= 85).length,
    needsSupport: data.filter(s => s.assessment_score < 60).length,
    
    // Correlation insights
    correlations: {
      attentionVsScore: calculateCorrelation(data.map(s => s.attention), data.map(s => s.assessment_score)),
      comprehensionVsScore: calculateCorrelation(data.map(s => s.comprehension), data.map(s => s.assessment_score)),
      focusVsScore: calculateCorrelation(data.map(s => s.focus), data.map(s => s.assessment_score)),
      retentionVsScore: calculateCorrelation(data.map(s => s.retention), data.map(s => s.assessment_score))
    },
    
    // Learning persona distribution
    personaDistribution: data.reduce((acc, student) => {
      acc[student.learning_persona!] = (acc[student.learning_persona!] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };
};

// Simple correlation calculation
function calculateCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  const sumX = x.reduce((sum, val) => sum + val, 0);
  const sumY = y.reduce((sum, val) => sum + val, 0);
  const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0);
  const sumX2 = x.reduce((sum, val) => sum + val * val, 0);
  const sumY2 = y.reduce((sum, val) => sum + val * val, 0);
  
  const correlation = (n * sumXY - sumX * sumY) / 
    Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  return Math.round(correlation * 100) / 100;
}
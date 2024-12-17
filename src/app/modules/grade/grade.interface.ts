export interface IGrade {
  _id?: string;
  grade: string; // e.g., "A+", "A", "B"
  minMarks: number; // Minimum marks required for this grade
  maxMarks: number; // Maximum marks
  gradePoint: number; // e.g., 5.0, 4.0
}

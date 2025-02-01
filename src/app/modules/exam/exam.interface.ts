export interface IExam {
  _id?: string;
  name: string; // e.g., "Midterm", "Final"
  year: number; // Academic year
  classLevel: number; // 1 to 12
  subjects: IExamSubject[];
}

export interface IExamSubject {
  subjectId: string;
  hasMCQ: boolean;
  hasCQ: boolean;
  hasPractical: boolean;
  mcqMarks?: number;
  cqMarks?: number;
  practicalMarks?: number;
  totalMarks: number;
}


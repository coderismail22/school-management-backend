export interface ISubject {
  _id?: string;
  name: string; // e.g., "Mathematics", "English"
  subjectCode: string;
  hasMCQ: boolean;
  hasCQ: boolean;
  hasPractical: boolean;
  mcqMarks?: number;
  cqMarks?: number;
  practicalMarks?: number;
  totalMarks: number;
  group?: string; // Science, Commerce, Arts
  classLevel: number; // 1 to 12
}

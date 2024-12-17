export interface IResult {
  _id?: string;
  studentId: string;
  examId: string;
  totalMarks: number;
  grade: string;
  gradePoint: number;
  subjectResults: ISubjectResult[];
}

export interface ISubjectResult {
  subjectId: string;
  marks: {
    mcq?: number;
    cq?: number;
    practical?: number;
    total: number;
  };
  grade: string;
  gradePoint: number;
}

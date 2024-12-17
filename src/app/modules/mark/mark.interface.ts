export interface IMark {
  _id?: string;
  studentId: string;
  examId: string;
  subjectId: string;
  teacherId: string;
  marks: {
    mcq?: number;
    cq?: number;
    practical?: number;
    total: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAssignment {
  _id?: string;
  teacherId: string;
  classId: string;
  section: string;
  group?: string; // Science, Commerce, Arts
  subjectId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

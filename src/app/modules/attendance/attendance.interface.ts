export interface IAttendance {
  _id?: string;
  date: string; // YYYY-MM-DD
  studentId: string;
  classLevel: number;
  section: string;
  subjectId: string;
  status: "Present" | "Absent" | "Late";
  recordedBy: string; // Teacher ID
  createdAt?: Date;
  updatedAt?: Date;
}

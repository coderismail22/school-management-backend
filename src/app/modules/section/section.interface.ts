// section.interface.ts
export interface ISection {
  _id?: string;
  classId: string; // Reference to class
  name: string; // e.g., "A", "B", "C"
  teacherId?: string; // Reference to a teacher, if needed
  students?: string[]; // List of student IDs in this section
  createdAt?: Date;
  updatedAt?: Date;
}

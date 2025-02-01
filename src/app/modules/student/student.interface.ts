export interface IStudent {
  _id?: string;
  name: string;
  studentId: string;
  roll: string;
  profileImg?: string;
  email: string;
  password: string;
  phone: string;
  guardianName: string;
  address: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  year: string; // Academic year as string (e.g., "2025")
  version: string;
  shift: "Morning" | "Day" | "Evening";
  class: string;
  section: string;
  group?: "Science" | "Commerce" | "Arts"; // Only for class 9-12
  createdAt?: Date;
  updatedAt?: Date;
}

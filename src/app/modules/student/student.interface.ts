export interface IStudent {
  _id?: string;
  name: string;
  rollNumber: string;
  classLevel: number; // 1 to 12
  section: string;
  shift?: string; // Morning/Evening
  group?: string; // Science, Commerce, Arts (9-12 only)
  year: number; // Academic year
  createdAt?: Date;
  updatedAt?: Date;
}

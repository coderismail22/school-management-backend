export interface ITeacher {
  _id?: string;
  name: string;
  teacherId: string;
  profileImg: string;
  email: string;
  address: string;
  phone: string;
  bloodGroup: string;
  salary: number;
  password: string;
  assignedSubjects: IAssignedSubject[];
  assignedClasses: IAssignedClass[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAssignedSubject {
  subjectId: string;
  subjectName: string;
  group?: string; // Science, Commerce, Arts (only for 9-12)
}

export interface IAssignedClass {
  classId: string;
  className: string;
  section: string;
  shift?: string; // Morning/Evening
}

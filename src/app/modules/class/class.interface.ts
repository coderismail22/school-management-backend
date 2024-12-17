export interface IClass {
    _id?: string;
    name: string; // e.g., "9", "10"
    hasGroups: boolean;
    groups?: string[]; // e.g., ["Science", "Commerce", "Arts"]
    sections: string[]; // e.g., ["A", "B"]
    shifts: string[]; // e.g., ["Morning", "Evening"]
    subjects: string[]; // Array of Subject IDs
  }
  
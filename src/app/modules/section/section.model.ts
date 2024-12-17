// section.model.ts
import { Schema, model } from 'mongoose';
import { ISection } from './section.interface';

const SectionSchema = new Schema<ISection>({
  classId: { type: String, required: true },
  name: { type: String, required: true },
  teacherId: { type: String, required: false },
  students: [{ type: String, required: false }], // Student IDs in this section
}, { timestamps: true });

export const Section = model<ISection>('Section', SectionSchema);

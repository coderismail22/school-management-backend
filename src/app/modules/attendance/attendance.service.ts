// src/modules/attendance/attendance.service.ts
import { Attendance } from "./attendance.model";
import { IAttendance } from "./attendance.interface";
import { Student } from "../student/student.model";

// 1) Update the interface to include `group`.
interface ILoadFilters {
  year: string;
  version: string;
  class: string;
  section: string;
  shift: string;
  date: string;
  group: string; // new
}

const loadAttendanceFromDB = async (filters: ILoadFilters) => {
  const {
    year,
    version,
    class: className,
    section,
    shift,
    date,
    group,
  } = filters;
  const dateObj = new Date(date);

  // 1) Find existing attendance for that day + group
  const existingAttendance = await Attendance.find({
    year,
    version,
    class: className,
    section,
    shift,
    group, // include group in the query
    date: dateObj,
  }).populate("student");

  // 2) Get all students in that class + group
  //    If you only want to filter by group if it's not "NA", you could do conditional logic.
  //    But here we assume group is always used:
  const students = await Student.find({
    year,
    version,
    shift,
    class: className,
    section,
    group, // also filter by group
  });

  // 3) Find which students already have attendance
  const existingStudentIds = existingAttendance.map((a) =>
    a.student._id.toString(),
  );

  // 4) Missing students = not in existingStudentIds
  const missingStudents = students.filter(
    (st) => !existingStudentIds.includes(st._id.toString()),
  );

  // 5) Build new default records
  const missingTransformed = missingStudents.map((st) => ({
    student: st._id,
    date: dateObj,
    year,
    version,
    shift,
    class: className,
    section,
    group, // attach group to the new attendance record
    status: "present",
    studentDoc: st, // for frontend
  }));

  // 6) Transform existing docs so `student` becomes just the ID + attach `studentDoc`
  const existingTransformed = existingAttendance.map((doc) => {
    const raw = doc.toObject();
    const studentObj = raw.student; // the populated doc
    return {
      ...raw,
      student: studentObj._id,
      studentDoc: studentObj,
    };
  });

  // 7) Combine them
  const combined = [...existingTransformed, ...missingTransformed];
  return combined;
};

const updateAttendanceInDB = async (attendances: IAttendance[]) => {
  const results = [];

  for (const att of attendances) {
    // 1) Build a filter that includes group
    const filter = {
      student: att.student,
      date: new Date(att.date),
      year: att.year,
      version: att.version,
      shift: att.shift,
      class: att.class,
      section: att.section,
      group: att.group, // newly included so we upsert by group
    };

    // 2) The only field we update is status (or you can update group if needed)
    const update = { status: att.status };

    // 3) Upsert
    const updated = await Attendance.findOneAndUpdate(filter, update, {
      upsert: true,
      new: true,
    }).populate("student");

    results.push(updated);
  }

  return results;
};

export const AttendanceServices = {
  loadAttendanceFromDB,
  updateAttendanceInDB,
};

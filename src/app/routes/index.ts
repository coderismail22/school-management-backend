import { Router } from "express";
import { SubjectRoutes } from "../modules/subject/subject.route";
import { StudentRoutes } from "../modules/student/student.route";
import { TeacherRoutes } from "../modules/teacher/teacher.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { NoticeRoutes } from "../modules/notice/notice.route";
import { EventRoutes } from "../modules/event/event.route";
import { AdministrationRoutes } from "../modules/administration/administration.route";
import { NoticeBannerRoutes } from "../modules/noticeBanner/noticeBanner.route";
import { AttendanceRoutes } from "../modules/attendance/attendance.route";
import { ExamRoutes } from "../modules/exam/exam.route";
import { ExamRegistrationRoutes } from "../modules/examRegistration/examRegistration.route";
import { ExamResultRoutes } from "../modules/examResult/examResult.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/teachers",
    route: TeacherRoutes,
  },
  {
    path: "/subjects",
    route: SubjectRoutes,
  },
  {
    path: "/exams",
    route: ExamRoutes,
  },
  {
    path: "/exam-registrations",
    route: ExamRegistrationRoutes,
  },
  {
    path: "/exam-results",
    route: ExamResultRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/notice",
    route: NoticeRoutes,
  },
  {
    path: "/event",
    route: EventRoutes,
  },
  {
    path: "/administration",
    route: AdministrationRoutes,
  },
  {
    path: "/noticebanner",
    route: NoticeBannerRoutes,
  },
  {
    path: "/attendance",
    route: AttendanceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

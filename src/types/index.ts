// ─── Enums / Union Types ──────────────────────────────────────────────────────

export type UserRole = "admin" | "teacher" | "student";

export type ClassStatus = "scheduled" | "present" | "absence" | "cancelled";
export type MaterialType = "reading" | "audio" | "video" | "worksheet" | "image" | "external";
export type StudentType = "vip" | "vip_kids" | "group" | "group_kids";
export type PackageStatus = "active" | "completed" | "pending";
export type NoticeCategory = "financeiro" | "agenda" | "materiais";
export type LessonStatus = "scheduled" | "completed" | "cancelled";
export type WaitingListStatus = "waiting" | "contacted" | "enrolled" | "declined";

// ─── User / Auth ──────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// ─── Student ──────────────────────────────────────────────────────────────────

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  studentType: StudentType;
  location: string;
  timezone: string;
  timezoneLabel: string;
  stage: string;
  teacher: string;
  teacherTimezone: string;
  teacherTimezoneLabel: string;
  modality: string;
  goal: string;
  reminderPreference: string;
  avatar?: string;
}

export interface StudentClass {
  id: number;
  startsAt: string;
  topic: string;
  teacher: string;
  meetingLabel: string;
  meetingUrl: string;
  status: ClassStatus;
}

export interface StudentMaterial {
  id: number;
  title: string;
  type: MaterialType;
  stage: string;
  topic: string;
  date: string;
  size: string;
  url?: string;
}

export interface StudentPackage {
  id: number;
  label: string;
  purchasedAt: string;
  classesTotal: number;
  amount: number;
  paymentMethod: string;
  status: PackageStatus;
}

export interface StudentNotice {
  id: number;
  title: string;
  message: string;
  category: NoticeCategory;
  createdAt: string;
  read: boolean;
}

// ─── Teacher ──────────────────────────────────────────────────────────────────

export interface Teacher {
  id: string;
  name: string;
  email: string;
  timezone: string;
  avatar?: string;
}

export interface Lesson {
  id: number;
  studentId: string;
  studentName: string;
  startsAt: string;
  topic: string;
  status: LessonStatus;
  meetingUrl?: string;
  notes?: string;
}

export interface PostClassNote {
  lessonId: number;
  summary: string;
  homework?: string;
  nextTopic?: string;
  attendanceStatus: ClassStatus;
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export interface AdminStudent {
  id: string;
  name: string;
  email: string;
  studentType: StudentType;
  stage: string;
  teacherId: string;
  teacherName: string;
  packageStatus: PackageStatus;
  enrolledAt: string;
  active: boolean;
}

export interface WaitingListEntry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  preferredStudentType: StudentType;
  requestedAt: string;
  status: WaitingListStatus;
  notes?: string;
}

export interface FinanceSummary {
  totalRevenue: number;
  pendingPayments: number;
  overduePayments: number;
  activePackages: number;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  dueDate: string;
  paidAt?: string;
  status: PackageStatus;
  method?: string;
}

// ─── Shared ───────────────────────────────────────────────────────────────────

export interface Material {
  id: number;
  title: string;
  type: MaterialType;
  stage: string;
  topic: string;
  uploadedAt: string;
  size: string;
  url?: string;
  uploadedBy: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

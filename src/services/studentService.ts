import { api } from "./api";
import type {
  StudentProfile,
  StudentClass,
  StudentMaterial,
  StudentPackage,
  StudentNotice,
} from "@/types";

export const studentService = {
  // ─── Profile ───────────────────────────────────────────────────────────────

  async getProfile(studentId: string): Promise<StudentProfile> {
    return api.get<StudentProfile>(`/students/${studentId}/profile`);
  },

  async updateProfile(
    studentId: string,
    data: Partial<StudentProfile>
  ): Promise<StudentProfile> {
    return api.patch<StudentProfile>(`/students/${studentId}/profile`, data);
  },

  // ─── Classes ───────────────────────────────────────────────────────────────

  async getClasses(studentId: string): Promise<StudentClass[]> {
    return api.get<StudentClass[]>(`/students/${studentId}/classes`);
  },

  // ─── Materials ─────────────────────────────────────────────────────────────

  async getMaterials(studentId: string): Promise<StudentMaterial[]> {
    return api.get<StudentMaterial[]>(`/students/${studentId}/materials`);
  },

  // ─── Packages / Payments ───────────────────────────────────────────────────

  async getPackages(studentId: string): Promise<StudentPackage[]> {
    return api.get<StudentPackage[]>(`/students/${studentId}/packages`);
  },

  // ─── Notices ───────────────────────────────────────────────────────────────

  async getNotices(studentId: string): Promise<StudentNotice[]> {
    return api.get<StudentNotice[]>(`/students/${studentId}/notices`);
  },

  async markNoticeAsRead(noticeId: number): Promise<void> {
    return api.patch<void>(`/notices/${noticeId}/read`);
  },
};

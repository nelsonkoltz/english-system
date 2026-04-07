import { api } from "./api";
import type { Lesson, PostClassNote, AdminStudent, Material } from "@/types";

export const teacherService = {
  // ─── Schedule ──────────────────────────────────────────────────────────────

  async getSchedule(teacherId: string): Promise<Lesson[]> {
    return api.get<Lesson[]>(`/teachers/${teacherId}/schedule`);
  },

  async getLessonById(lessonId: number): Promise<Lesson> {
    return api.get<Lesson>(`/lessons/${lessonId}`);
  },

  // ─── Students ──────────────────────────────────────────────────────────────

  async getStudents(teacherId: string): Promise<AdminStudent[]> {
    return api.get<AdminStudent[]>(`/teachers/${teacherId}/students`);
  },

  // ─── Post-class Notes ──────────────────────────────────────────────────────

  async postClassNote(note: PostClassNote): Promise<void> {
    return api.post<void>(`/lessons/${note.lessonId}/notes`, note);
  },

  async updateClassNote(lessonId: number, note: Partial<PostClassNote>): Promise<void> {
    return api.patch<void>(`/lessons/${lessonId}/notes`, note);
  },

  // ─── Materials ─────────────────────────────────────────────────────────────

  async getMaterials(teacherId: string): Promise<Material[]> {
    return api.get<Material[]>(`/teachers/${teacherId}/materials`);
  },

  async uploadMaterial(data: FormData): Promise<Material> {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000"}/materials`,
      {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: data,
      }
    );
    if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);
    return response.json() as Promise<Material>;
  },

  async deleteMaterial(materialId: number): Promise<void> {
    return api.delete<void>(`/materials/${materialId}`);
  },
};

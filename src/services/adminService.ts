import { api } from "./api";
import type {
  AdminStudent,
  WaitingListEntry,
  FinanceSummary,
  Payment,
  Material,
  StudentType,
  WaitingListStatus,
} from "@/types";

// ─── Payload types ────────────────────────────────────────────────────────────

interface CreateStudentPayload {
  name: string;
  email: string;
  studentType: StudentType;
  stage: string;
  teacherId: string;
}

interface UpdateWaitingListPayload {
  status: WaitingListStatus;
  notes?: string;
}

// ─── Service ─────────────────────────────────────────────────────────────────

export const adminService = {
  // ─── Students ──────────────────────────────────────────────────────────────

  async getStudents(): Promise<AdminStudent[]> {
    return api.get<AdminStudent[]>("/admin/students");
  },

  async createStudent(data: CreateStudentPayload): Promise<AdminStudent> {
    return api.post<AdminStudent>("/admin/students", data);
  },

  async updateStudent(
    studentId: string,
    data: Partial<AdminStudent>
  ): Promise<AdminStudent> {
    return api.patch<AdminStudent>(`/admin/students/${studentId}`, data);
  },

  async deactivateStudent(studentId: string): Promise<void> {
    return api.patch<void>(`/admin/students/${studentId}/deactivate`);
  },

  // ─── Waiting List ──────────────────────────────────────────────────────────

  async getWaitingList(): Promise<WaitingListEntry[]> {
    return api.get<WaitingListEntry[]>("/admin/waiting-list");
  },

  async updateWaitingListEntry(
    entryId: string,
    data: UpdateWaitingListPayload
  ): Promise<WaitingListEntry> {
    return api.patch<WaitingListEntry>(`/admin/waiting-list/${entryId}`, data);
  },

  // ─── Finance ───────────────────────────────────────────────────────────────

  async getFinanceSummary(): Promise<FinanceSummary> {
    return api.get<FinanceSummary>("/admin/finance/summary");
  },

  async getPayments(): Promise<Payment[]> {
    return api.get<Payment[]>("/admin/finance/payments");
  },

  async markPaymentAsPaid(paymentId: string): Promise<Payment> {
    return api.patch<Payment>(`/admin/finance/payments/${paymentId}/paid`);
  },

  // ─── Materials ─────────────────────────────────────────────────────────────

  async getMaterials(): Promise<Material[]> {
    return api.get<Material[]>("/admin/materials");
  },

  async deleteMaterial(materialId: number): Promise<void> {
    return api.delete<void>(`/admin/materials/${materialId}`);
  },
};

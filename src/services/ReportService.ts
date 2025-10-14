import type { ReportFormData } from "../pages/ContactUs";
import API from "./api";

export const createReport = (email: string, report: ReportFormData) => {
  return API.post(`admin/reports/user/${email}`, report);
};

export const getReportsByUser = (userId: number, page=0, size=5) => {
  return API.get(`admin/reports/user/${userId}?page=${page}&size=${size}`);
};

export const getAllReports = (page : number =0, size : number=5) => {
  return API.get(`admin/reports?page=${page}&size=${size}`);
};

export const updateReportStatus = (reportId: number, status: string) => {
  return API.put(`admin/reports/${reportId}/status?status=${status}`);
};

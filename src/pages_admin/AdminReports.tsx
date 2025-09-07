import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllReports } from "../services/ReportService";
import TaskPagination from "../components/TaskPagination";

export type ReportStatus = "OPEN" | "IN_REVIEW" | "RESOLVED";

export interface Report {
  id: number;
  title: string;
  description: string;
  phoneNumber: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
  userEmail : string
}

const AdminReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [filterStatus, setFilterStatus] = useState<ReportStatus | "ALL">("ALL");

const fetchReports = React.useCallback(async () => {
  try {
    const res = await getAllReports(page, size); // do NOT pass status yet
    setReports(res.data.content);
    setTotalPages(res.data.totalPages);
  } catch (err) {
    console.log("Got error: ", err);
  }
}, [page, size]);

useEffect(() => {
  fetchReports();
}, [fetchReports]);


  const handleResolve = async (id: number) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/reports/${id}/status`, "RESOLVED", {
        headers: { "Content-Type": "application/json" },
      });
      fetchReports(); // Refresh after updating
    } catch (err) {
      console.error("Failed to update report status", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Reports</h1>

      {/* Filter */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as ReportStatus | "ALL")}
          className="border px-2 py-1 rounded"
        >
          <option value="ALL">All</option>
          <option value="OPEN">OPEN</option>
          <option value="IN_REVIEW">IN REVIEW</option>
          <option value="RESOLVED">RESOLVED</option>

        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Updated At</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.length !== 0 ? (
               reports.map((r) => (
              <tr key={r.id} className="text-center">
                <td className="p-2 border">{r.id}</td>
                <td className="p-2 border">{r.title}</td>
                <td className="p-2 border">{r.description}</td>
                <td className="p-2 border">{r.userEmail}</td>
                <td className="p-2 border">{r.phoneNumber}</td>
                <td className="p-2 border">{r.status}</td>
                <td className="p-2 border">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="p-2 border">{new Date(r.updatedAt).toLocaleString()}</td>
                <td className="p-2 border">
                  {r.status === "OPEN" && (
                    <button
                      onClick={() => handleResolve(r.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))) : (
                <tr><td colSpan={8}  className="p-2 border text-center">Hurray ! No reports at present</td></tr>
            )} 
          </tbody>
        </table>
      </div>

      {/* Pagination */}
        <TaskPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
    </div>
  );
};

export default AdminReports;

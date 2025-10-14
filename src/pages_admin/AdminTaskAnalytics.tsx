import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

interface AnalyticsData {
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
}

const AdminTaskAnalytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token"); // token saved after login
        const res = await axios.get("http://localhost:8080/api/admin/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      }
    };
      fetchAnalytics();
    }, []);


  if (!data) return <div className="text-center mt-10">Loading analytics...</div>;

  const chartData = [
    { name: "Pending", value: data.pendingTasks },
    { name: "In Progress", value: data.inProgressTasks },
    { name: "Completed", value: data.completedTasks },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Task Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Tasks" value={data.totalTasks} color="bg-blue-500" />
        <Card title="Pending Tasks" value={data.pendingTasks} color="bg-red-500" />
        <Card title="In Progress Tasks" value={data.inProgressTasks} color="bg-yellow-500" />
        <Card title="Completed Tasks" value={data.completedTasks} color="bg-green-500" />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Tasks Status Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Card: React.FC<{ title: string; value: number; color: string }> = ({ title, value, color }) => (
  <div className={`${color} text-white p-6 rounded-xl shadow`}>
    <p className="text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminTaskAnalytics;

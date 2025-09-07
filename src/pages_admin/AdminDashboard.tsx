import AdminUserAnalytics from "./AdminUserAnalytics";
import AdminReportAnalysis from "./AdminReportAnalysis";
import AdminTaskAnalytics from "./AdminTaskAnalytics";

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <AdminUserAnalytics />
        <AdminTaskAnalytics />
        <AdminReportAnalysis />
      </div>
    </div>
  );
};

export default AdminDashboard;
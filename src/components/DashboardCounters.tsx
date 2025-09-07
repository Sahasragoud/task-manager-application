import React from "react";

type CounterProps = {
  total: number;
  inProgress: number;
  completed: number;
  pending: number;
};

const DashboardCounters: React.FC<CounterProps> = ({ total, inProgress, completed, pending }) => {
  const stats = [
    { label: "Total Tasks", value: total, color: "bg-blue-500" },
    { label: "In Progress", value: inProgress, color: "bg-yellow-500" },
    { label: "Completed", value: completed, color: "bg-green-500" },
    { label: "Pending", value: pending, color: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`rounded-2xl shadow-md p-6 text-white ${stat.color} animate-slideUp`}
        >
          <h3 className="text-lg font-semibold">{stat.label}</h3>
          <p className="text-3xl font-bold mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCounters;

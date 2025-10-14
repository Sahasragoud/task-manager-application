import { ChevronUp, ChevronDown } from "lucide-react";

type TaskControlsProps = {
  size: number;
  setSize: (val: number) => void;
  sortField: string;
  setSortField: (val: string) => void;
  sortDirection: string;
  setSortDirection: (val: string) => void;
};

const TaskControls: React.FC<TaskControlsProps> = ({
  size,
  setSize,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
}) => {
  return (
    <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-xl">
      {/* Sorting */}
      <div className="flex items-center gap-3">
        <label className="text-gray-600 font-medium">Sort by:</label>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="title">Title</option>
          <option value="description">Description</option>
          <option value="dueDate">Due Date</option>
          <option value="status">Status</option>
        </select>

        <button
          onClick={() =>
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
          }
          className="flex items-center gap-1 px-3 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {sortDirection === "asc" ? (
            <>
              <ChevronUp className="w-4 h-4" /> Asc
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" /> Desc
            </>
          )}
        </button>
      </div>

      {/* Rows per page */}
      <div className="flex items-center gap-2">
        <label className="text-gray-600 font-medium">Rows per page:</label>
        <select
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default TaskControls;

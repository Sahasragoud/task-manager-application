type TaskPaginationProps = {
  page: number;
  setPage: (val: number) => void;
  totalPages: number;
};

const TaskPagination: React.FC<TaskPaginationProps> = ({
  page,
  setPage,
  totalPages,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="flex justify-center mt-4">
      <div className="flex items-center gap-2">
        {/* Prev button */}
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className={`px-3 py-1 rounded-lg border transition 
            ${page === 0 
              ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
              : "bg-blue-500 text-white hover:bg-blue-600"}
          `}
        >
          Prev
        </button>

        {/* Page numbers */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded-full transition border
              ${p === page
                ? "bg-blue-600 text-white font-semibold"
                : "bg-white hover:bg-blue-100"}
            `}
          >
            {p + 1}
          </button>
        ))}

        {/* Next button */}
        <button
          disabled={page + 1 === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-3 py-1 rounded-lg border transition 
            ${page + 1 === totalPages 
              ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
              : "bg-blue-500 text-white hover:bg-blue-600"}
          `}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskPagination;

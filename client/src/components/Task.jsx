// Task.jsx
import { format } from "date-fns";

function Task({
  todo,
  handleCompleted,
  handleDelete,
  handleEdit,
  getPriorityColor,
  showActions = true,
}) {
  const isOverdue = new Date(todo.dueDate) < new Date() && todo.status !== "completed";
  const priorityColors = getPriorityColor(todo.priority);

  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ${
        todo.status === "completed" ? "opacity-75" : ""
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3
                className={`text-lg font-semibold ${
                  todo.status === "completed" ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {todo.title}
              </h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors}`}>
                {todo.priority.toUpperCase()}
              </span>
              {isOverdue && todo.status !== "completed" && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
                  OVERDUE
                </span>
              )}
            </div>

            {todo.description && (
              <p
                className={`text-gray-600 mb-3 ${
                  todo.status === "completed" ? "line-through" : ""
                }`}
              >
                {todo.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Due: {format(new Date(todo.dueDate), "MMM dd, yyyy")}</span>
              </div>
              {todo.createdAt && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Created: {format(new Date(todo.createdAt), "MMM dd, yyyy")}</span>
                </div>
              )}
            </div>
          </div>

          {showActions && (
            <div className="flex gap-2">
              {todo.status !== "completed" && (
                <button
                  onClick={() => handleCompleted(todo._id)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Mark as complete"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={() => handleEdit(todo._id)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit task"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(todo._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete task"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Task;

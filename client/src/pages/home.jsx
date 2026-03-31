import { useEffect, useState } from "react";
import Task from "../components/Task";
import Tabs from "../components/Tabs";
import axios from "axios";

function TaskManager() {
  const [todos, setTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [dueTodos, setDueTodos] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const [activeBtn, setActiveBtn] = useState("pending");
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchTodos = async () => {
    try {
      let res = await axios.get("http://localhost:3000/api/todos", { withCredentials: true });
      // console.log(res.data);
      setTodos(res.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    setCompletedTodos(todos.filter((t) => t.status === "completed"));
    setPendingTodos(todos.filter((t) => t.status === "pending"));
    setDueTodos(todos.filter((t) => new Date(t.dueDate) < new Date()));
  }, [todos]);

  const validateForm = () => {
    const newErrors = {};

    if (!task.title.trim()) {
      newErrors.title = "Title is required";
    } else if (task.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (task.title.length > 100) {
      newErrors.title = "Title cannot exceed 100 characters";
    }

    if (!task.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else {
      const selectedDate = new Date(task.dueDate);
      if (isNaN(selectedDate)) {
        newErrors.dueDate = "Invalid date";
      }
    }

    if (task.description && task.description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      await axios.post("http://localhost:3000/api/todos", task, {
        withCredentials: true,
      });

      resetForm();
      await fetchTodos();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const resetForm = () => {
    setTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });
    setIsEditing(false);
    setErrors({});
  };

  const handleCompleted = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/todos/${id}`,
        { status: "completed" },
        { withCredentials: true },
      );
      await fetchTodos();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this task?")) {
        await axios.delete(`http://localhost:3000/api/todos/${id}`, { withCredentials: true });
        await fetchTodos();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const handleEdit = (id) => {
    const todo = todos.find((todo) => todo._id === id);
    if (todo) {
      // Format date for input field
      const formattedDueDate = todo.dueDate
        ? new Date(todo.dueDate).toISOString().split("T")[0]
        : "";
      setTask({ ...todo, dueDate: formattedDueDate });
      setIsEditing(true);
      setErrors({});
    }
  };

  const handleSave = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      await axios.put(`http://localhost:3000/api/todos/${task._id}`, task, {
        withCredentials: true,
      });
      await fetchTodos();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">Stay organized and boost your productivity</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:col-span-1">
            <form onSubmit={isEditing ? (e) => e.preventDefault() : handleSubmit}>
              {/* Title Input */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Task Title <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleInput}
                    placeholder="e.g. Finish UI redesign, Call client, Submit report..."
                    className={`w-full px-4 py-3 pr-10 rounded-xl border 
      bg-gray-50 focus:bg-white 
      focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm text-gray-800 placeholder-gray-400
      ${errors.title ? "border-red-500" : "border-gray-200 focus:border-purple-500"}`}
                    autoFocus
                  />

                  {/* Icon */}
                  <div className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    ✏️
                  </div>
                </div>

                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>

              {/* Description Input */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>

                <div className="relative">
                  <textarea
                    name="description"
                    value={task.description}
                    onChange={handleInput}
                    rows="4"
                    placeholder="Add more details... e.g. include files, meeting notes, or specific steps to complete this task"
                    className={`w-full px-4 py-3 pr-10 rounded-xl border 
      bg-gray-50 focus:bg-white 
      focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm text-gray-800 placeholder-gray-400 resize-none
      ${errors.description ? "border-red-500" : "border-gray-200 focus:border-purple-500"}`}
                  />

                  {/* Icon */}
                  <div className="absolute top-3 right-3 text-gray-400">📝</div>
                </div>

                {/* Footer row */}
                <div className="flex justify-between items-center mt-1">
                  {errors.description ? (
                    <p className="text-sm text-red-500">{errors.description}</p>
                  ) : (
                    <span />
                  )}

                  <p className="text-xs text-gray-400">{task.description.length}/500</p>
                </div>
              </div>

              {/* Priority and Due Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                {/* Priority */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Priority</label>

                  <div className="relative">
                    <select
                      name="priority"
                      value={task.priority}
                      onChange={handleInput}
                      className="w-full appearance-none px-4 py-3 pr-10 rounded-xl 
        border border-gray-200 bg-gray-50 
        focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 
        focus:border-purple-500 transition-all shadow-sm text-gray-700"
                    >
                      <option value="low">🟢 Low Priority</option>
                      <option value="medium">🟡 Medium Priority</option>
                      <option value="high">🔴 High Priority</option>
                    </select>

                    {/* Custom dropdown icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Due Date */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Due Date <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      type="date"
                      name="dueDate"
                      value={task.dueDate}
                      onChange={handleInput}
                      className={`w-full px-4 py-3 rounded-xl border 
        bg-gray-50 focus:bg-white 
        focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm text-gray-700
        ${errors.dueDate ? "border-red-500" : "border-gray-200 focus:border-purple-500"}`}
                    />

                    {/* Calendar icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                      📅
                    </div>
                  </div>

                  {errors.dueDate && <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={isEditing ? handleSave : handleSubmit}
                className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md ${
                  isEditing
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                }`}
              >
                {isEditing ? "✏️ Update Task" : "➕ Add Task"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full mt-3 py-3 rounded-lg font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
                >
                  Cancel Editing
                </button>
              )}
            </form>
          </div>

          <div className="space-y-4">
            {/* Tabs */}
            <div className="mb-6">
              <Tabs activeBtn={activeBtn} setActiveBtn={setActiveBtn} />
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {activeBtn === "pending" && pendingTodos.length === 0 && (
                <div className="bg-white rounded-xl p-8 text-center">
                  <p className="text-gray-500">No pending tasks. Add a new task to get started!</p>
                </div>
              )}
              {activeBtn === "pending" &&
                pendingTodos.map((todo) => (
                  <Task
                    key={todo._id}
                    todo={todo}
                    handleCompleted={handleCompleted}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    getPriorityColor={getPriorityColor}
                  />
                ))}

              {activeBtn === "completed" && completedTodos.length === 0 && (
                <div className="bg-white rounded-xl p-8 text-center">
                  <p className="text-gray-500">
                    No completed tasks yet. Complete some tasks to see them here!
                  </p>
                </div>
              )}
              {activeBtn === "completed" &&
                completedTodos.map((todo) => (
                  <Task
                    key={todo._id}
                    todo={todo}
                    handleCompleted={handleCompleted}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    getPriorityColor={getPriorityColor}
                    showActions={false}
                  />
                ))}

              {activeBtn === "due" && dueTodos.length === 0 && (
                <div className="bg-white rounded-xl p-8 text-center">
                  <p className="text-gray-500">No overdue tasks. Great job staying on track!</p>
                </div>
              )}
              {activeBtn === "due" &&
                dueTodos.map((todo) => (
                  <Task
                    key={todo._id}
                    todo={todo}
                    handleCompleted={handleCompleted}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    getPriorityColor={getPriorityColor}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskManager;

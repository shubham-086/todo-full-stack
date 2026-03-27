import { Router } from "express";
import {
  createNewTodo,
  deleteTododById,
  getAllTodos,
  getTodoById,
  partiallyUpdateTodoById,
  updateTodoById,
} from "../controllers/todo-controllers.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
const router = Router();

// Get all todos
router.get("/", authMiddleware, getAllTodos);

// Get a single todo by ID
router.get("/:id", authMiddleware, getTodoById);

// Create a new todo
router.post("/", authMiddleware, createNewTodo);

// Update a todo by ID
router.put("/:id", authMiddleware, updateTodoById);

// Partially update a todo by ID
router.patch("/:id", authMiddleware, partiallyUpdateTodoById);

// Delete a todo by ID
router.delete("/:id", authMiddleware, deleteTododById);

export default router;

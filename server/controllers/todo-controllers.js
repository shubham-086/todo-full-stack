import { Todo } from "../models/todo-model.js";

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ created_by: req.user.id });
    res.status(200).send(todos);
  } catch (error) {
    console.log("Internal Server Error:", error);
    res.status(500).send("Internal Server Error.");
  }
};

export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(404).send({ error: "Todo not found" });
    }

    res.status(200).send(todo);
  } catch (error) {
    console.log("Internal Server Error:", error);
    res.status(500).send("Internal Server Error.");
  }
};

export const createNewTodo = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const newTodo = new Todo({
      title,
      description,
      priority,
      dueDate,
      created_by: req.user.id,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const updateTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, status, priority, dueDate },
      { new: true },
    );
    res.status(200).send(updatedTodo);
  } catch (error) {
    console.log("Internal Server Error:", error);
    res.status(500).send("Internal Server Error.");
  }
};

export const partiallyUpdateTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, status, priority, dueDate },
      { new: true },
    );
    res.status(200).send(updatedTodo);
  } catch (error) {
    console.log("Internal Server Error:", error);
    res.status(500).send("Internal Server Error.");
  }
};

export const deleteTododById = async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete(id);
    res.status(200).send("Successfully Deleted");
  } catch (error) {
    console.log("Internal Server Error:", error);
    res.status(500).send("Internal Server Error.");
  }
};

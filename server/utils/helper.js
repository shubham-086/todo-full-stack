import fs from "fs";

export const readTodos = () => {
  try {
    const data = fs.readFileSync("./static/data.json", "utf-8");
    return JSON.parse(data) || [];
  } catch (err) {
    console.error("Error reading file:", err);
  }
};

export const writeTodos = (todos) => {
  try {
    fs.writeFileSync("./static/data.json", JSON.stringify(todos), "utf-8");
  } catch (err) {
    console.error("Error writing file:", err);
  }
};

export const readUsers = () => {
  try {
    const data = fs.readFileSync("./static/users.json", "utf-8");
    return JSON.parse(data) || [];
  } catch (err) {
    console.error("Error reading file:", err);
  }
};

export const writeUsers = (users) => {
  try {
    fs.writeFileSync("./static/users.json", JSON.stringify(users), "utf-8");
  } catch (err) {
    console.error("Error writing file:", err);
  }
};

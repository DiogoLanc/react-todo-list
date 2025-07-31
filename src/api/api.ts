import { Form, Comment } from "../types/types";

const API_URL = "http://localhost:3001/tasks";

export const getTasksAPI = async (): Promise<Comment[]> => {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  const data = await res.json();
  return data;
};

export const createTaskAPI = async (
  task: Form,
  lastId: number
): Promise<Comment> => {
  const newTask = { ...task, id: lastId + 1 };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });

  const data = await res.json();
  return data;
};

export const updateTaskAPI = async (
  id: number,
  task: Form
): Promise<Comment> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task, id: Number(id) }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update task: ${text}`);
  }

  const data = await res.json();
  return data;
};

export const deleteTaskAPI = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

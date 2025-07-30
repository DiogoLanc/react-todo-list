import { Form, Comment } from "../types/types";

const API_URL = "https://jsonplaceholder.typicode.com/comments";

export const getTasksAPI = async (): Promise<Comment[]> => {
  const res = await fetch(`${API_URL}s?_limit=5`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  const data = await res.json();
  return data;
};

export const createTaskAPI = async (task: Form): Promise<Comment> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
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
    body: JSON.stringify(task),
  });

  const data = await res.json();
  return data;
};

export const deleteTaskAPI = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

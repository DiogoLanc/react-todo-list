import { Priority } from "../types/types";

export const formatDate = (iso?: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

export const isOverdue = (iso?: string, completed?: boolean) => {
  if (!iso || completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(iso);
  return due < today;
};

export const isDueToday = (iso?: string) => {
  if (!iso) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(iso);
  due.setHours(0, 0, 0, 0);
  return due.getTime() === today.getTime();
};

export const getDueDateBg = (completed: boolean, dueDate?: string) => {
  if (completed) return "#00a100ff";
  if (!dueDate) return "#b1b1b1ff";
  if (isOverdue(dueDate)) return "#e20000ff";
  if (isDueToday(dueDate)) return "#fc9700ff";
  return "#4db8ffff";
};

export const getDueDateInfo = (dueDate?: string, completed?: boolean) => {
  if (completed) return "Task completed!";
  if (!dueDate) return "No due date";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffTime = due.getTime() - today.getTime();

  // convert ms to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0)
    return `Overdue by ${Math.abs(diffDays)} day${
      Math.abs(diffDays) !== 1 ? "s" : ""
    }`;
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  return `${diffDays} days remaining`;
};

export const getPriorityStyles = (priority: Priority) => {
  switch (priority) {
    case "high":
      return { bg: "#ff5353ff", fg: "#ffffff" };
    case "medium":
      return { bg: "#e6ab37ff", fg: "#ffffffff" };
    default:
      return { bg: "#55aaffff", fg: "#ffffffff" };
  }
};

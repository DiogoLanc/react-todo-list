export type Comment = {
  body: string;
  email: string;
  id: number;
  name: string;
  postID?: number;
  completed: boolean;
  dueDate?: string;
  priority: Priority;
};

export type Form = Omit<Comment, "id" | "postID">;

export type Priority = "low" | "medium" | "high";

export type PriorityFilter = Priority | "all";

export type CompletionFilter = "all" | "completed" | "incomplete";

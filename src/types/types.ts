export type Comment = {
  body: string;
  email: string;
  id: number;
  name: string;
  postID?: number;
  completed: boolean;
  dueDate?: string;
};

export type Form = Omit<Comment, "id" | "postID">;

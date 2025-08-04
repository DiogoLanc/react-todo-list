export type Comment = {
  body: string;
  email: string;
  id: number;
  name: string;
  postID?: number;
  completed: boolean;
};

export type Form = Omit<Comment, "id" | "postID">;

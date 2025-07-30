import { Comment } from "../types/types";

type TaskItemProps = Comment & {
  onDelete: () => void;
  onEdit: () => void;
};

export const TaskItem: React.FC<TaskItemProps> = (props) => {
  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "2em",
        padding: "2em",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p>Id: {props.id}</p>
      <p>Task: {props.body}</p>
      <p>Name: {props.name}</p>
      <p>Email: {props.email}</p>
      <div style={{ display: "flex", gap: "10px", justifyContent: "right" }}>
        <button onClick={props.onEdit} className="button-edit">
          Edit
        </button>
        <button onClick={props.onDelete} className="button-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

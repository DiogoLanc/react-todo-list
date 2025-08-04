import { Comment } from "../types/types";

type TaskItemProps = Comment & {
  onDelete: () => void;
  onEdit: () => void;
  onToggleComplete: () => void;
};

export const TaskItem: React.FC<TaskItemProps> = (props) => {
  const backgroundColor = props.completed ? "#d1f7d1c0" : "#fff8baff";
  return (
    <div
      style={{
        backgroundColor,
        border: "1px solid black",
        borderRadius: "2em",
        padding: "2em",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          flexGrow: 1,
          textAlign: "center",
          margin: 0,
          fontSize: "1.25rem",
        }}
      >
        Task {props.id}
      </h2>

      <p>
        <strong>To-Do: </strong>
        {props.body}
      </p>
      <p>
        <strong>Name: </strong> {props.name}
      </p>
      <p>
        <strong>Email: </strong>
        {props.email}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
          <span style={{ fontWeight: 500 }}>Completed</span>
          <input
            type="checkbox"
            checked={props.completed}
            onChange={props.onToggleComplete}
            style={{ width: "15px", height: "15px", cursor: "pointer" }}
          />
        </label>

        <div style={{ display: "flex", gap: ".75rem" }}>
          <button onClick={props.onEdit} className="button-edit">
            Edit
          </button>
          <button onClick={props.onDelete} className="button-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

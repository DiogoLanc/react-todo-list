import { Comment, Priority } from "../types/types";

const formatDate = (iso?: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

const isOverdue = (iso?: string, completed?: boolean) => {
  if (!iso || completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(iso);
  return due < today;
};

const isDueToday = (iso?: string) => {
  if (!iso) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(iso);
  due.setHours(0, 0, 0, 0);
  return due.getTime() === today.getTime();
};

const getDueDateBg = (completed: boolean, dueDate?: string) => {
  if (completed) return "#d1f7d1";
  if (!dueDate) return "#e0e0e0";
  if (isOverdue(dueDate)) return "#ffb3b3";
  if (isDueToday(dueDate)) return "#ffd699";
  return "#b3ffcc";
};

const getPriorityStyles = (priority: Priority) => {
  switch (priority) {
    case "high":
      return { bg: "#ff4d4d", fg: "#ffffff" };
    case "medium":
      return { bg: "#ffcc66", fg: "#553a00" };
    default:
      return { bg: "#66b3ff", fg: "#003a66" };
  }
};

type TaskItemProps = Comment & {
  onDelete: () => void;
  onEdit: () => void;
  onToggleComplete: () => void;
};

export const TaskItem: React.FC<TaskItemProps> = (props) => {
  const backgroundColor = props.completed ? "#d1f7d1c0" : "#fff8baff";
  const dueDateBg = getDueDateBg(props.completed, props.dueDate);
  const priorityStyles = getPriorityStyles(props.priority as Priority);

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
      <p style={{ marginTop: 8 }}>
        <strong>Due date:</strong>{" "}
        <span
          style={{
            background: dueDateBg,
            padding: "6px",
            borderRadius: "6px",
          }}
        >
          {props.dueDate ? formatDate(props.dueDate) : "no due date"}
        </span>
      </p>

      <p style={{ marginTop: 8 }}>
        <strong>Priority:</strong>{" "}
        <span
          style={{
            padding: "6px",
            borderRadius: "6px",
            background: priorityStyles.bg,
            color: priorityStyles.fg,
          }}
        >
          {props.priority}
        </span>
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

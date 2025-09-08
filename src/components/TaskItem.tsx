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
  if (completed) return "#00a100ff";
  if (!dueDate) return "#b1b1b1ff";
  if (isOverdue(dueDate)) return "#e20000ff";
  if (isDueToday(dueDate)) return "#fc9700ff";
  return "#4db8ffff";
};

const getPriorityStyles = (priority: Priority) => {
  switch (priority) {
    case "high":
      return { bg: "#ff5353ff", fg: "#ffffff" };
    case "medium":
      return { bg: "#e6ab37ff", fg: "#ffffffff" };
    default:
      return { bg: "#55aaffff", fg: "#ffffffff" };
  }
};

type TaskItemProps = Comment & {
  onDelete: () => void;
  onEdit: () => void;
  onToggleComplete: () => void;
};

export const TaskItem: React.FC<TaskItemProps> = (props) => {
  const backgroundColor = props.completed ? "#c0ffbeff" : "#fff8baff";
  const dueDateBg = getDueDateBg(props.completed, props.dueDate);
  const priorityStyles = getPriorityStyles(props.priority as Priority);

  const pStyle = { marginBottom: "1.5rem" };

  return (
    <div
      style={{
        backgroundColor,

        maxWidth: "750px",
        margin: "1rem auto",

        border: "3px solid #ffffffff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.14)",
        borderRadius: "1rem",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          margin: 0,
          fontSize: "1.5rem",
        }}
      >
        Task {props.id}
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left Column */}
        <div>
          <p style={pStyle}>
            <strong>To-Do: </strong>
            {props.body}
          </p>
          <p style={pStyle}>
            <strong>Name: </strong> {props.name}
          </p>
          <p style={{ ...pStyle, marginBottom: 0 }}>
            {" "}
            <strong>Email: </strong>
            {props.email}
          </p>
        </div>

        {/* Right Column */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          {" "}
          <p style={pStyle}>
            <strong>Due date:</strong>{" "}
            <span
              style={{
                background: dueDateBg,
                padding: "6px",
                borderRadius: "6px",
                color: "#ffffffff",
              }}
            >
              {props.dueDate ? formatDate(props.dueDate) : "no due date"}
            </span>
          </p>
          <p style={pStyle}>
            <strong>Priority:</strong>{" "}
            <span
              style={{
                padding: "6px",
                borderRadius: "6px",
                background: priorityStyles.bg,
                color: priorityStyles.fg,
                fontWeight: "500",
              }}
            >
              {props.priority}
            </span>
          </p>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".5em",
              justifyContent: "flex-end",
            }}
          >
            <span style={{ fontWeight: 500 }}>Completed</span>
            <input
              type="checkbox"
              checked={props.completed}
              onChange={props.onToggleComplete}
              style={{ width: "15px", height: "15px", cursor: "pointer" }}
            />
          </label>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: ".75rem" }}>
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

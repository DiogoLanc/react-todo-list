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

  return (
    <div className="task-item-container" style={{ backgroundColor }}>
      <h2 className="task-item-title">Task {props.id}</h2>
      <div className="task-item-row">
        <div className="task-item-left">
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
        </div>
        <div
          className="task-item-right"
          style={{ textAlign: "right", flexShrink: 0 }}
        >
          <p>
            <strong>Due date:</strong>{" "}
            <span className="task-item-due" style={{ background: dueDateBg }}>
              {props.dueDate ? formatDate(props.dueDate) : "no due date"}
            </span>
          </p>
          <p>
            <strong>Priority:</strong>{" "}
            <span
              className="task-item-priority"
              style={{
                background: priorityStyles.bg,
                color: priorityStyles.fg,
              }}
            >
              {props.priority}
            </span>
          </p>
          <label className="task-item-completed-label">
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
      <div className="task-item-actions">
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

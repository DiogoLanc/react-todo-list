import {
  formatDate,
  getDueDateBg,
  getPriorityStyles,
} from "../helpers/taskItemHelpers";
import { Comment, Priority } from "../types/types";

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

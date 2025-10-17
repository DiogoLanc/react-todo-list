import { Comment } from "../types/types";
import { TaskItem } from "./TaskItem";

type TaskListProps = {
  toDos: Comment[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
};

export const TaskList: React.FC<TaskListProps> = ({
  toDos,
  onEdit,
  onDelete,
  onToggleComplete,
}) => (
  <ul style={{ listStyle: "none", padding: 0, alignItems: "center" }}>
    {toDos.map((toDo) => (
      <li key={toDo.id} style={{ padding: "10px", fontSize: "18px" }}>
        <TaskItem
          {...toDo}
          onEdit={() => onEdit(toDo.id)}
          onDelete={() => onDelete(toDo.id)}
          onToggleComplete={() => onToggleComplete(toDo.id)}
        />
      </li>
    ))}
  </ul>
);

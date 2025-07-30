import { Comment } from "../types/types";
import { TaskItem } from "./TaskItem";

type TaskListProps = {
  toDos: Comment[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export const TaskList: React.FC<TaskListProps> = ({
  toDos,
  onEdit,
  onDelete,
}) => (
  <ul style={{ listStyle: "none", padding: 0, alignItems: "center" }}>
    {toDos.map((toDo) => (
      <li
        key={toDo.id}
        style={{ marginBottom: "30px", padding: "20px", fontSize: "18px" }}
      >
        <TaskItem
          {...toDo}
          onEdit={() => onEdit(toDo.id)}
          onDelete={() => onDelete(toDo.id)}
        />
      </li>
    ))}
  </ul>
);

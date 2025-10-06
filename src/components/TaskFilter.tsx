import React from "react";
import { PriorityFilter } from "../types/types";
import "./TaskFilter.css";

export type Filter = {
  completed: string;
  name: string;
  id: string;
  priority: PriorityFilter;
};

type TaskFilterProps = {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

export const TaskFilter = ({ filter, setFilter }: TaskFilterProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        padding: "10px",
      }}
    >
      <select
        value={filter.completed}
        onChange={(e) =>
          setFilter((f) => ({ ...f, completed: e.target.value }))
        }
        className="filter-input"
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>

      <input
        type="text"
        placeholder="Filter by name"
        value={filter.name}
        onChange={(e) => setFilter((f) => ({ ...f, name: e.target.value }))}
        className="filter-input"
        style={{ width: "130px" }}
      />

      <input
        type="number"
        placeholder="Filter by ID"
        value={filter.id}
        onChange={(e) => {
          const val = e.target.value;
          if (
            val === "" ||
            (Number(val) > 0 && Number.isInteger(Number(val)))
          ) {
            setFilter((f) => ({ ...f, id: val }));
          }
        }}
        className="filter-input"
        style={{ width: "100px" }}
      />

      <select
        value={filter.priority}
        onChange={(e) =>
          setFilter((f) => ({
            ...f,
            priority: e.target.value as PriorityFilter,
          }))
        }
        className="filter-input"
      >
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
};

export default TaskFilter;

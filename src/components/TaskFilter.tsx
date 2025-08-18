import React from "react";

type Filter = {
  completed: string;
  name: string;
  id: string;
};

type TaskFilterProps = {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

export const TaskFilter = ({ filter, setFilter }: TaskFilterProps) => {
  const filterStyle: React.CSSProperties = {
    padding: "8px ",
    borderRadius: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    background: "#fff",
  };

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
        style={filterStyle}
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
        style={{ ...filterStyle, width: "130px" }}
      />

      <input
        type="number"
        placeholder="Filter by ID"
        min={1}
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
        style={{ ...filterStyle, width: "100px" }}
      />
    </div>
  );
};

export default TaskFilter;

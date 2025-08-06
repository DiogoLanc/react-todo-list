import "./App.css";
import { useState, useEffect } from "react";
import { AddButton } from "./components/AddButton";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { Form, Comment } from "./types/types";
import {
  createTaskAPI,
  deleteTaskAPI,
  getTasksAPI,
  updateTaskAPI,
} from "./api/api";

const App = () => {
  const [toDos, setToDos] = useState<Comment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Form | null>(null);

  const [error, setError] = useState("");
  const [showAddButton, setShowAddButton] = useState(true);
  const [editingTask, setEditingTask] = useState<
    (Comment & { index: number }) | null
  >(null);

  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const [filter, setFilter] = useState({
    completed: "all", // "all", "completed", "incomplete"
    name: "",
    id: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const data = await getTasksAPI();
        setToDos(data);
      } catch (err) {
        console.error("Error fetching tasks", err);
        setFetchError("Failed to load tasks.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = () => {
    setFormData({ body: "", email: "", name: "", completed: false });
    setShowForm(true);
    setError("");
    setShowAddButton(false);
  };

  const validateEmail = (email: string) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const cancelTask = () => {
    setShowForm(false);
    setShowAddButton(true);
    setEditingTask(null);
    setFormData(null);
    setError("");
  };

  const editTask = (id: number) => {
    // let taskEditIndex = -1;
    // const taskEdit = toDos.find((task, index) => {
    //   if (task.id === id) {
    //     taskEditIndex = index;
    //     return true;
    //   }
    // });

    const taskEdit = toDos.find((task) => task.id === id);
    const index = toDos.findIndex((task) => task.id === id);

    if (!taskEdit) return;

    setFormData({
      body: taskEdit.body,
      email: taskEdit.email,
      name: taskEdit.name,
      completed: taskEdit.completed,
    });

    setShowForm(true);
    setShowAddButton(false);

    setEditingTask({ ...taskEdit, index });
  };

  const deleteTask = async (id: number) => {
    try {
      await deleteTaskAPI(id);
      setToDos(toDos.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const saveTask = async (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    ev.preventDefault();

    if (!formData) return;

    if (!formData.body || !formData.email || !formData.name) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      if (editingTask) {
        const updatedTask = await updateTaskAPI(editingTask.id, formData);
        const updatedToDos = [...toDos];
        updatedToDos[editingTask.index] = updatedTask;
        setToDos(updatedToDos);
        setEditingTask(null);
      } else {
        const lastId =
          toDos.length > 0 ? Math.max(...toDos.map((t) => Number(t.id))) : 0;
        const newTask = await createTaskAPI(formData, lastId);

        setToDos([...toDos, newTask]);
      }

      setShowForm(false);
      setFormData({ body: "", email: "", name: "", completed: false });
      setShowAddButton(true);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const toggleCompleteBgColor = async (id: number) => {
    const index = toDos.findIndex((task) => task.id === id);
    if (index === -1) return;

    const task = toDos[index];
    const updatedTask = { ...task, completed: !task.completed };

    try {
      await updateTaskAPI(id, updatedTask);
      const newToDos = [...toDos];
      newToDos[index] = updatedTask;
      setToDos(newToDos);
    } catch (error) {
      console.error("Failed to toggle completion:", error);
    }
  };

  const filteredToDos = toDos.filter((task) => {
    if (filter.completed !== "all") {
      if (filter.completed === "completed" && !task.completed) return false;
      if (filter.completed === "incomplete" && task.completed) return false;
    }

    if (
      filter.name &&
      !task.name.toLowerCase().includes(filter.name.toLowerCase())
    ) {
      return false;
    }

    if (filter.id && String(task.id) !== String(filter.id)) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>To-Do List</h1>
      {isLoading ? (
        <p style={{ textAlign: "center", fontSize: "20px", marginTop: "80px" }}>
          Loading tasks...
        </p>
      ) : fetchError ? (
        <p
          style={{
            color: "red",
            textAlign: "center",
            fontSize: "20px",
            marginTop: "80px",
          }}
        >
          {fetchError}
        </p>
      ) : showForm && formData ? (
        <TaskForm
          formData={formData}
          setFormData={setFormData}
          onCancel={cancelTask}
          onSave={saveTask}
          error={error}
        />
      ) : (
        <>
          {showAddButton && <AddButton onClick={addTask} />}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              padding: "5px",
            }}
          >
            <select
              value={filter.completed}
              onChange={(e) =>
                setFilter((f) => ({ ...f, completed: e.target.value }))
              }
              style={{
                padding: "8px",
                borderRadius: "6px",
                fontSize: "16px",
                border: "1px solid #ccc",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
            <input
              type="text"
              placeholder="Filter by name"
              value={filter.name}
              onChange={(e) =>
                setFilter((f) => ({ ...f, name: e.target.value }))
              }
              style={{
                padding: "8px",
                borderRadius: "6px",
                fontSize: "16px",
                width: "180px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="number"
              placeholder="Filter by ID"
              min={1}
              value={filter.id}
              onChange={(e) => {
                // Only allow positive numbers or empty string
                const val = e.target.value;
                if (
                  val === "" ||
                  (Number(val) > 0 && Number.isInteger(Number(val)))
                ) {
                  setFilter((f) => ({ ...f, id: val }));
                }
              }}
              style={{
                padding: "8px",
                borderRadius: "6px",
                fontSize: "16px",
                width: "110px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <TaskList
            toDos={filteredToDos}
            onEdit={editTask}
            onDelete={deleteTask}
            onToggleComplete={toggleCompleteBgColor}
          />
        </>
      )}
    </div>
  );
};

export default App;

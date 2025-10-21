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
import TaskFilter, { Filter } from "./components/TaskFilter";
import { DeleteTaskModal } from "./modals/DeleteTaskModal";
import { Toaster } from "./toasters/Toaster";

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

  const [filter, setFilter] = useState<Filter>({
    completed: "all", // "all", "completed", "incomplete"
    name: "",
    id: "",
    priority: "all",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

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
    setFormData({
      body: "",
      email: "",
      name: "",
      completed: false,
      dueDate: "",
      priority: "medium",
    });
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
    const taskEdit = toDos.find((task) => task.id === id);
    const index = toDos.findIndex((task) => task.id === id);

    if (!taskEdit) return;

    setFormData({
      body: taskEdit.body,
      email: taskEdit.email,
      name: taskEdit.name,
      completed: taskEdit.completed,
      dueDate: taskEdit.dueDate || "",
      priority: taskEdit.priority,
    });

    setShowForm(true);
    setShowAddButton(false);

    setEditingTask({ ...taskEdit, index });
  };

  const requestDeleteTask = (id: number) => {
    setTaskToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteTask = async () => {
    if (taskToDelete !== null) {
      await deleteTask(taskToDelete);
      setShowDeleteModal(false);
      showToaster(`Task ${taskToDelete} was deleted successfully!`);
      setTaskToDelete(null);
    }
  };

  const cancelDeleteTask = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
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
      setError("Some required fields are missing.");
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
        showToaster(`Task ${updatedTask.id} was updated successfully!`);
      } else {
        const newTask = await createTaskAPI(formData);
        setToDos([...toDos, newTask]);
        showToaster(`Task ${newTask.id} was created successfully!`);
      }

      setShowForm(false);
      setFormData({
        body: "",
        email: "",
        name: "",
        completed: false,
        dueDate: "",
        priority: "medium",
      });
      setShowAddButton(true);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const showToaster = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
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

    if (filter.priority !== "all" && task.priority !== filter.priority) {
      return false;
    }

    return true;
  });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>My To-Do List</h1>
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
          <TaskFilter filter={filter} setFilter={setFilter} />

          <TaskList
            toDos={filteredToDos}
            onEdit={editTask}
            onDelete={requestDeleteTask}
            onToggleComplete={toggleCompleteBgColor}
          />
        </>
      )}
      <DeleteTaskModal
        open={showDeleteModal}
        onConfirm={confirmDeleteTask}
        onCancel={cancelDeleteTask}
      />
      <Toaster
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default App;

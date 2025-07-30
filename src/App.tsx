import "./App.css";
import { useState, useEffect } from "react";
import { AddButton } from "./components/AddButton";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { Form, Comment } from "./types/types";

const App = () => {
  const [toDos, setToDos] = useState<Comment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Form | null>(null);

  const [error, setError] = useState("");
  const [showAddButton, setShowAddButton] = useState(true);
  const [editingTask, setEditingTask] = useState<
    (Comment & { index: number }) | null
  >(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?_limit=3")
      .then((res) => res.json())
      .then((data) => setToDos(data))
      .catch((err) => console.error("Error fetching data", err));
  }, []);

  const addTask = () => {
    setFormData({ body: "", email: "", name: "" });
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
    });

    setShowForm(true);
    setShowAddButton(false);

    setEditingTask({ ...taskEdit, index });
  };

  const deleteTask = (id: number) => {
    fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setToDos(toDos.filter((toDo) => toDo.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
      });
  };

  const saveTask = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

    if (editingTask) {
      const updatedToDo: Comment = {
        ...formData,
        id: editingTask.id,
      };

      fetch(`https://jsonplaceholder.typicode.com/comments/${editingTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedToDo),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedToDos = [...toDos];
          updatedToDos[editingTask.index] = data;
          setToDos(updatedToDos);
          setEditingTask(null);
        });
    } else {
      const newToDo: Form = {
        ...formData,
      };

      fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newToDo),
      })
        .then((res) => res.json())
        .then((data) => {
          const maxId =
            toDos.length > 0 ? Math.max(...toDos.map((t) => t.id)) : 0;

          const finalToDo: Comment = {
            ...data,
            id: maxId + 1,
          };

          setToDos([...toDos, finalToDo]);
        });
    }

    setShowForm(false);
    setFormData({ body: "", email: "", name: "" });
    setShowAddButton(true);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>To-Do List</h1>

      {showForm && formData ? (
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
          <TaskList toDos={toDos} onEdit={editTask} onDelete={deleteTask} />
        </>
      )}
    </div>
  );
};

export default App;

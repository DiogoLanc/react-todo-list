import { Form, Priority } from "../types/types";
import "./TaskForm.css";

type TaskFormProps = {
  formData: Form;
  setFormData: React.Dispatch<React.SetStateAction<Form | null>>;
  onCancel: () => void;
  onSave: (ev: React.FormEvent<HTMLFormElement>) => void;
  error: string;
};

export const TaskForm = ({
  formData,
  setFormData,
  onCancel,
  onSave,
  error,
}: TaskFormProps) => {
  return (
    <form className="form-container" onSubmit={onSave}>
      {error && <p className="form-error">{error}</p>}
      <label className="form-label">
        To-Do
        <input
          type="text"
          placeholder="e.g. Do something useful"
          value={formData.body}
          required
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          className="form-input"
          maxLength={75}
        />
        <small style={{ color: "#666", fontSize: "14px" }}>
          {formData.body.length}/75 characters
        </small>
      </label>
      <label className="form-label">
        Email
        <input
          type="text"
          placeholder="e.g. amilcar@gmail.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="form-input"
        />
      </label>
      <label className="form-label">
        Name
        <input
          type="text"
          placeholder="e.g. Amilcar"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="form-input"
          maxLength={25}
        />
      </label>
      <label className="form-label">
        Due Date
        <input
          type="date"
          value={formData.dueDate || ""}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
          className="form-input"
        />
      </label>
      <label className="form-label">
        Priority
        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value as Priority })
          }
          className="form-input"
        >
          <option value="low" style={{ fontSize: "18px" }}>
            Low
          </option>
          <option value="medium" style={{ fontSize: "18px" }}>
            Medium
          </option>
          <option value="high" style={{ fontSize: "18px" }}>
            High
          </option>
        </select>
      </label>
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="button-cancel">
          Cancel
        </button>
        <button type="submit" className="button-save">
          Save Task
        </button>
      </div>
    </form>
  );
};

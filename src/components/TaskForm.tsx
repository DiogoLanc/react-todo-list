import { Form } from "../types/types";

type TaskFormProps = {
  formData: Form;
  setFormData: React.Dispatch<React.SetStateAction<Form | null>>;
  onCancel: () => void;
  onSave: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  error: string;
};

export const TaskForm = ({
  formData,
  setFormData,
  onCancel,
  onSave,
  error,
}: TaskFormProps) => {
  const inputStyle: React.CSSProperties = {
    borderRadius: "8px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "40px",
      }}
    >
      {error && (
        <p style={{ color: "red", textAlign: "center", fontSize: "20px" }}>
          {error}
        </p>
      )}
      <input
        type="text"
        placeholder="Task Body"
        value={formData.body}
        required
        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        style={inputStyle}
      />
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          fontWeight: "bold",
          gap: "6px",
        }}
      >
        Due Date
        <input
          type="date"
          value={formData.dueDate || ""}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
          style={inputStyle}
        />
      </label>

      <div
        style={{
          display: "flex",
          justifyContent: "right",
          marginTop: "30px",
          gap: "20px",
        }}
      >
        <button onClick={onCancel} className="button-cancel">
          Cancel
        </button>
        <button onClick={onSave} className="button-save">
          Save Task
        </button>
      </div>
    </div>
  );
};

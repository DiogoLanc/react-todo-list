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
      />
      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          marginTop: "30px",
          gap: "40px",
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

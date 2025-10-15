import React from "react";

type DeleteTaskModalProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#ffffffff",
          padding: "32px ",
          borderRadius: "12px",
        }}
      >
        <h3 style={{ margin: "0 0 16px 0" }}>
          Are you sure you want to delete this task?
        </h3>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={onCancel}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#888",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            No
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#e74c3c",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

import React from "react";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  message,
  confirmText = "Yes",
  cancelText = "No",
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
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#ffffffff",
          padding: "32px ",
          borderRadius: "12px",
        }}
      >
        {title && <h2 style={{ margin: "0 0 16px 0" }}>{title}</h2>}
        <h3 style={{ margin: "0 0 20px 0", fontWeight: "500" }}>{message}</h3>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
          }}
        >
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
            {confirmText}
          </button>
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
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";

type DeleteToasterProps = {
  show: boolean;
  message: string;
  onClose: () => void;
};

const TOAST_DURATION = 5000; // 5s

export const DeleteTaskToaster = ({
  show,
  message,
  onClose,
}: DeleteToasterProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (show) {
      setProgress(100);
      const start = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const percent = Math.max(100 - (elapsed / TOAST_DURATION) * 100, 0);
        setProgress(percent);
      }, 50);

      const timer = setTimeout(onClose, TOAST_DURATION);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "5px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#00be0aff",
        color: "#ffffffff",
        padding: "8px",
        borderRadius: "8px",
        fontWeight: "bold",
      }}
    >
      {message}
      <div
        style={{
          marginTop: "10px",
          height: "4px",
          background: "rgba(250, 250, 250, 0.39)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "#fff",
          }}
        />
      </div>
    </div>
  );
};

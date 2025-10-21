import React, { useState } from "react";

type PopoverProps = {
  trigger: React.ReactNode;
  message: React.ReactNode;
};

export const Popover = ({ trigger, message }: PopoverProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {trigger}
      {isVisible && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: "8px",
            background: "#333",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "0.9rem",
            whiteSpace: "nowrap",
          }}
        >
          {message}

          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #333",
            }}
          />
        </div>
      )}
    </div>
  );
};

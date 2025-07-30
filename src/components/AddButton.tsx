type AddButtonProps = {
  onClick: () => void;
};

export const AddButton: React.FC<AddButtonProps> = ({ onClick }) => (
  <div
    style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}
  >
    <button className="button-add" onClick={onClick}>
      Add Task
    </button>
  </div>
);

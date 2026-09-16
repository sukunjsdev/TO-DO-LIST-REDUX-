import { useState, useEffect } from "react";
import "./add.css";
import { useDispatch, useSelector } from "react-redux";

export const AddBtn = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const editIndex = useSelector((state) => state.editIndex);
  const isEditing = editIndex !== null;

  useEffect(() => {
    if (isEditing) {
      setTask(tasks[editIndex].text);
    } else {
      setTask("");
    }
  }, [editIndex, tasks, isEditing]);

  const handleClose = () => {
    setTask("");

    dispatch({
      type: "CLOSE_ADD",
    });
  };

  const handleApply = () => {
    if (task.trim() === "") return;

    if (isEditing) {
      dispatch({
        type: "UPDATE_TASK",
        payload: {
          index: editIndex,
          task: task.trim(),
        },
      });
    } else {
      dispatch({
        type: "ADD_TASK",
        payload: {
          text: task.trim(),
          completed: false,
        },
      });
    }

    setTask("");
  };

  return (
    <div className="modal-overlay">
      <div className="add">
        <div className="top-add">
          <h1 className="heading-add">NEW NOTE</h1>
          <input
            className="input-add"
            type="text"
            placeholder="Input your note..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="bottom-add">
          <button className="btn-cancel" onClick={handleClose}>
            CANCEL
          </button>
          <button className="btn-apply" onClick={handleApply}>
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

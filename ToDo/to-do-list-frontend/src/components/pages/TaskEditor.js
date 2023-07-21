import React, { useState } from "react";

const TaskEditor = ({ task, updateTask }) => {
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleUpdate = () => {
    updateTask(task.taskId, editedDescription);
  };

  return (
    <div className="task-editor">
      <h3>Edit Task</h3>
      <input
        type="text"
        value={editedDescription}
        onChange={handleDescriptionChange}
        placeholder="Enter updated task description"
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default TaskEditor;
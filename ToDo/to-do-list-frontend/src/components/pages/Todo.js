import { useState, useEffect } from "react";
import { AuthData } from "../../auth/AuthWrapper";
import "./Todo.css"; 
import TaskEditor from "./TaskEditor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

export const Todo = () => {
  const { user } = AuthData();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false); 
  const [newTaskDescription, setNewTaskDescription] = useState(""); 
  const [taskToBeAdded, setTaskToBeAdded] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    if (!user.isAuthenticated) {
      setError("User is not authenticated");
      setIsLoading(false);
      return;
    }

    const url = `http://localhost:8080/users/${user.name}`;
    const token = user.token;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      setUserData(userData);
      setIsLoading(false);
    } catch (error) {
      setError("Failed to fetch user data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, [user]);

  const openAddTask = () => {
    setIsAddTaskOpen(true);
  };

  const closeAddTask = () => {
    setIsAddTaskOpen(false);
    setNewTaskDescription(""); 
  };

  const handleTaskDescriptionChange = (event) => {
    setNewTaskDescription(event.target.value);
  };

  const handleTaskToBeAddedChange = (event) => {
    setTaskToBeAdded(event.target.value);
  };

  const addTask = async () => {
    const url = `http://localhost:8080/tasks/add/${user.name}`;

    const token = user.token;

    const currentTime = new Date();

    const formattedTime = currentTime.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const formattedDate = currentTime.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const dateComponents = formattedDate.split("/");
    const day = dateComponents[1];
    const month = dateComponents[0];
    const year = dateComponents[2];

    const formattedDateTime = `${formattedTime} ${day}-${month}-${year}`;

    const taskData = {
      title: taskToBeAdded,
      description: newTaskDescription,
      dateOfExpiration: formattedDateTime,
      isFinished: false,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      getUserData();
      closeAddTask();
    } catch (error) {
      setError("Failed to add task");
    }
  };

  const deleteTask = async (taskId) => {
    const url = `http://localhost:8080/tasks/${taskId}`;

    const token = user.token;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      getUserData(); 
    } catch (error) {
      setError("Failed to delete task");
    }
  };

  const updateTask = async (taskId, updatedDescription) => {
    const url = `http://localhost:8080/tasks/${taskId}`;

    const token = user.token;

    const updatedTaskData = {
      description: updatedDescription,
    };

    try {
      const response = await fetch(url, {
        method: "PUT", 
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTaskData),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      getUserData(); 
    } catch (error) {
      setError("Failed to update task");
    }
  };

  const handleEdit = (taskId) => {
    setEditingTaskId(taskId);
  };



  return (
    <div className="page">
    <h2 className="heading">Your Todos</h2>
    <button onClick={openAddTask}>
      <FontAwesomeIcon icon={faPlus} /> Add Task
    </button> {/* Add Task button */}
    {isAddTaskOpen && (
      <div className="add-task-popup">
        <h3>Add Task</h3>
        <input
          type="text"
          value={newTaskDescription}
          onChange={handleTaskDescriptionChange}
          placeholder="Enter task description"
        />
        <input
          type="text"
          value={taskToBeAdded}
          onChange={handleTaskToBeAddedChange}
          placeholder="Enter title"
        />
        <button onClick={addTask}>
          <FontAwesomeIcon icon={faPlus} /> Submit
        </button>
        <button onClick={closeAddTask}>
          <FontAwesomeIcon icon={faEdit} /> Close
        </button>
      </div>
    )}
    {userData ? (
      <table className="todo-table">
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Time of Creation</th>
            <th>Date of Last Expiration</th>
            <th>Date of Last Update</th>
            <th>Finished</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData?.tasks.map((task) => (
            <tr key={task.taskId}>
              <td>{task.taskId}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.timeOfCreation}</td>
              <td>{task.dateOfExpiration}</td>
              <td>{task.dateOfLastUpdate}</td>
              <td>{task.finished ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => deleteTask(task.taskId)}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
                <button onClick={() => handleEdit(task.taskId)}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : null}
    {editingTaskId && (
      <TaskEditor
        task={userData.tasks.find((task) => task.taskId === editingTaskId)}
        updateTask={updateTask}
      />
    )}
  </div>
  );
};

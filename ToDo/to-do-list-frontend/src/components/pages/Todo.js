import { useState, useEffect } from "react";
import { AuthData } from "../../auth/AuthWrapper";
import "./Todo.css"; // Import the CSS file for styling

export const Todo = () => {
  const { user } = AuthData();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false); // State for controlling the visibility of the add task mini page
  const [newTaskDescription, setNewTaskDescription] = useState(""); // State for storing the new task description
  const [taskToBeAdded, setTaskToBeAdded] = useState("")


  const getUserData = async () => {
    if (!user.isAuthenticated) {
      setError("User is not authenticated");
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
    } catch (error) {
      setError("Failed to fetch user data");
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
    setNewTaskDescription(""); // Reset the new task description when closing the add task mini page
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
   
     // Format time (hh:mm)
     const formattedTime = currentTime.toLocaleString("en-US", {
       hour: "2-digit",
       minute: "2-digit",
       hour12: false,
     });
   
     // Format date (day-month-year)
     const formattedDate = currentTime.toLocaleString("en-US", {
       day: "2-digit",
       month: "2-digit",
       year: "numeric",
     });
   
     // Split the date into components
     const dateComponents = formattedDate.split("/");
     const day = dateComponents[1];
     const month = dateComponents[0];
     const year = dateComponents[2];
   
     // Create the formatted date string
     const formattedDateTime = `${formattedTime} ${day}-${month}-${year}`;
   
     const taskData = {
       title: taskToBeAdded,
       description: newTaskDescription,
       dateOfExpiration: formattedDateTime, // Concatenate time and date with a space in between
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
   
       console.log(taskData);
   
       if (!response.ok) {
         throw new Error("Failed to add task");
       }
   
       console.log(taskData);
   
       // Refresh the user data after adding the task
       getUserData();
       closeAddTask();
     } catch (error) {
       setError("Failed to add task");
     }
   };
   const deleteTask = async (taskId) => {
     const url = `http://localhost:8080/tasks/delete/${user.name}/${taskId}`;
   
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
   
       // Refresh the user data after deleting the task
       getUserData();
     } catch (error) {
       setError("Failed to delete task");
     }
   };
   

  return (
    <div className="page">
      <h2 className="heading">Your Todos</h2>
      <button onClick={openAddTask}>Add Task</button> {/* Add Task button */}
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
          value = {taskToBeAdded}
          onChange={handleTaskToBeAddedChange}
          placeholder="Enter title"/>
          <button onClick={addTask}>Submit</button>
          <button onClick={closeAddTask}>Close</button>
        </div>
      )}
      {userData ? (
        <table className="todo-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Time of Creation</th>
              <th>Date of Last Expiration</th>
              <th>Date of Last Update</th>
              <th>Finished</th>
            </tr>
          </thead>
          <tbody>
  {userData?.tasks.map((task, index) => (
    <tr key={index}>
      <td>{task.description}</td>
      <td>{task.timeOfCreation}</td>
      <td>{task.dateOfExpiration}</td>
      <td>{task.dateOfLastUpdate}</td>
      <td>{task.finished ? "Yes" : "No"}</td>
      <td>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      ) : null}
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
};

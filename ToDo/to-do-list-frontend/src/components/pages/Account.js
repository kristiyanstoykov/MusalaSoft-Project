import { useState, useEffect } from "react";
import { AuthData } from "../../auth/AuthWrapper";

export const Account = () => {
  const { user } = AuthData();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserByUsername = async () => {
      if (!user.isAuthenticated) {
        setError("User is not authenticated");
        return;
      }

      console.log(user.name);

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

    getUserByUsername();
  }, [user]);

  return (
    <div className="page">
      <h2>Your Account</h2>
      {userData && (
        <div>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p></p>
          <p>Username: {userData.username}</p>
          <p>Todo:</p>
          <ul>
            {userData.tasks.map((task, index) => (
              <li key={index}>
                <p>Description: {task.description}</p>
                <p>Date and Time of Creation: {task.dateAndTimeOfCreation}</p>
                <p>Date of last update: {task.dateOfExpiration}</p>
                <p>Date of last update: {task.dateOfLastUpdate}</p>

                <p>Finished: {task.finished ? "Yes" : "No"}</p>

              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

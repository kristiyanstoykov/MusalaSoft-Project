import { useState, useEffect } from "react";
import { AuthData } from "../../auth/AuthWrapper";
import './Account.css';

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
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
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
      
      {userData && (
        <div className="userCard">
          <h1>Your Account</h1>
           
          <h2>First Name: </h2>
          <h3>{userData.firstName}</h3>

          <h2>Last Name: </h2>
          <h3>{userData.lastName}</h3>

          <h2>Username: </h2>
          <h3>{userData.username}</h3>

          <h2>E-mail: </h2>
          <h3>{userData.email}</h3>
        </div>
        
      )}
          <footer className='footer'>
                 Make by TU Team 2
          </footer>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

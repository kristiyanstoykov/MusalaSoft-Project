import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    dateOfBirth: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formattedDate = new Date(user.dateOfBirth);
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const year = formattedDate.getFullYear();
    const formattedDOB = `${day}-${month}-${year}`;
  
    const updatedUser = { ...user, dateOfBirth: formattedDOB };
  
    console.log('User:', updatedUser);
  
    axios
      .post('http://localhost:8080/users/register', updatedUser)
      .then((response) => {
        console.log('User registered successfully:', response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };
  

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.form}>
          <h2 style={styles.heading}>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                style={styles.input}
                value={user.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                style={styles.input}
                value={user.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                style={styles.input}
                value={user.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                style={styles.input}
                value={user.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>E-Mail:</label>
              <input
                type="email"
                name="email"
                style={styles.input}
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                style={styles.input}
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" style={styles.button}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  form: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center', 
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default SignUp;

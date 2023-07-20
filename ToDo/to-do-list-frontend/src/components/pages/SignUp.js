import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from 'react-bootstrap';


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
  
    // Convert the date format to "DD-MM-YYYY"
    const formattedDate = new Date(user.dateOfBirth);
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const year = formattedDate.getFullYear();
    const formattedDOB = `${day}-${month}-${year}`;
  
    // Update the user object with the formatted date
    const updatedUser = { ...user, dateOfBirth: formattedDOB };
  
    // Console.log the updated user object
    console.log('User:', updatedUser);
  
    // Send the POST request
    axios
      .post('http://localhost:8080/users/register', updatedUser)
      .then((response) => {
        console.log('User registered successfully:', response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        // Add your desired error handling logic
      });
  };
  

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form className="p-4 border rounded bg-white" onSubmit={handleSubmit}>
        <h2 className="text-center mb-3">Sign Up</h2>
        
        <Form.Group className="mb-3">
          <Form.Label>First Name:</Form.Label>
          <Form.Control 
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control 
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control 
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control 
            type="date"
            name="dateOfBirth"
            value={user.dateOfBirth}
            onChange={handleChange}
          />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>E-Mail:</Form.Label>
          <Form.Control 
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control 
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Group>
  
        <Button type="submit" variant="success" className="w-100">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default SignUp;

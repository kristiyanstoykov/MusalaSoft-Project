import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import { Button, Container, Form, Alert } from 'react-bootstrap';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = AuthData();
  const [formData, setFormData] = useReducer(
    (formData, newItem) => {
      return { ...formData, ...newItem };
    },
    { userName: "", password: "" }
  );
  const [errorMessage, setErrorMessage] = useState(null);

  const doLogin = async () => {
    try {
      await login(formData.userName, formData.password);
      navigate("/account");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form className="p-3 border rounded bg-white">
        <h2 className="text-center mb-3">Login page</h2>
        <Form.Group className="mb-3">
          <Form.Control 
            value={formData.userName} 
            onChange={(e) => setFormData({ userName: e.target.value })} 
            type="text"
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            value={formData.password} 
            onChange={(e) => setFormData({ password: e.target.value })} 
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button onClick={doLogin} variant="success" className="w-100">
          Log in
        </Button>
        {errorMessage && <Alert variant='danger' className="mt-3">{errorMessage}</Alert>}
      </Form>
    </Container>
  );
};

import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";

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
     backgroundColor: "#4CAF50",
     color: "#fff",
     padding: "10px 20px",
     border: "none", 
     borderRadius: "4px",
     cursor: "pointer",
     outline: "none",
    },
    error: {
      color: 'red',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.heading}>Login page</h2>
        <div className="inputs">
          <div className="input">
            <input
              value={formData.userName}
              onChange={(e) => setFormData({ userName: e.target.value })}
              type="text"
              style={styles.input}
            />
          </div>
          <div className="input">
            <input
              value={formData.password}
              onChange={(e) => setFormData({ password: e.target.value })}
              type="password"
              style={styles.input}
            />
          </div>
          <div className="button">
            <button onClick={doLogin} style={styles.button}>
              Log in
            </button>
          </div>
          {errorMessage ? (
            <div className="error" style={styles.error}>
              {errorMessage}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

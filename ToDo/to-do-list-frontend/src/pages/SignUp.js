import React from 'react';
import Navigationbar from '../components/NavigationBar';

function SignUp() {
  return (
    <>
      <Navigationbar />

      <div style={styles.container}>
        <div style={styles.form}>
          <h2 style={styles.heading}>Sign Up</h2>
          <form>
            <div>
              <label>Username</label>
              <input type="text" style={styles.input} />
            </div>
            <div>
              <label>Mail</label>
              <input type="text" style={styles.input} />
            </div>
            <div>
              <label>Password</label>
              <input type="password" style={styles.input} />
            </div>
            <button type="submit" style={styles.button}>Sign Up</button>
          </form>
        </div>
      </div>
    </>
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
    textAlign: 'center', // Center align the text
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

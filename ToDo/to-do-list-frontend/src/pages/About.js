import React from 'react';
import Navigationbar from '../components/NavigationBar';
import './About.css'; // Import the CSS file for styling

function About() {
  return (

    <>
      <Navigationbar />
    
    <div className="about-container">
      <div className="about-content">
        <h1>About</h1>
        <p>Project is still in progress.</p>
        <p>
          For more information, please visit{' '}
          <a href="https://github.com/kristiyanstoykov/MusalaSoft-Project">
            this link
          </a>
          .
        </p>
      </div>
    </div>
    </>

  );
}

export default About;

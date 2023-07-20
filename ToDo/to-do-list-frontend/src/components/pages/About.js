import React from 'react';
import './About.css';

export const About = () => {

     return (
          <div>
          <div className="about-container">
            <div className="about-content">
            <div class="about-section">
            <h1>About Us Page</h1>
            <p>We are a group of young software engineers that aim to make the world easier</p>
            <p>Down bellow you can see all our team members who have contributed to our project</p>
          </div>
          
          <h2 className='title'>Our Team</h2><br/>
      
            <div className="column">
            <div className="card">
              <div className="container">
                <h2 className="title">Zahari</h2>
                <p >Software Engineer</p>
                <p>mike@example.com</p>
                <p><button className="button">Contact</button></p>
              </div>
            </div>
          </div>
      
          <div className="column">
          <div className="card">
            <div className="container">
              <h2 className="title">Stanislav</h2>
              <p >Software Engineer</p>
              <p>mike@example.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>
      
        <div className="column">
            <div className="card">
              <div className="container">
                <h2 className="title">David</h2>
                <p >Software Engineer</p>
                <p>mike@example.com</p>
                <p><button className="button">Contact</button></p>
              </div>
            </div>
          </div>
      
          <div className="column">
            <div className="card">
              <div className="container">
                <h2 className="title">Stoyan</h2>
                <p >Software Engineer</p>
                <p>mike@example.com</p>
                <p><button className="button">Contact</button></p>
              </div>
            </div>
          </div>
          
            <div className="column">
              <div className="card">
                <div className="container">
                  <h2 className="title">Kristyan</h2>
                  <p>Software Engineer</p>
                  <p>mike@example.com</p>
                  <p><button className="button">Contact</button></p>
                </div>
              </div>
            </div>
          
            <div className="column">
              <div className="card">
                <div className="container">
                  <h2 className="title">Marko</h2>
                  <p>Software Engineer</p>
                  <p>john@example.com</p>
                  <p><button className="button">Contact</button></p>
                </div>
              </div>
            </div>
      
            <div>
              <footer className='footer'>
                Make by TU Team 2
              </footer>
            </div>
      
            </div>
          </div>
          </div>
      
        );
}
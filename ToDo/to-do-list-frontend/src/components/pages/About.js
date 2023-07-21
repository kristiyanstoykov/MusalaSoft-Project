import React from 'react';
import './About.css';
export const About = () => {
  return (
    <>
      <div className="about-section custom-width">
        <h1>About Us</h1>
        <p>We are a group of young software engineers that aim to make the world easier</p>
        <p>Down below you can see all our team members who have contributed to our project</p>
      </div>
      <div className="container">

        <h2 className="title">TU Team 2</h2><br />

        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="title">Zahari</h2>
                <p className="card-text">Software Engineer</p>
                <p className="card-text">znikiforov33@gmail.com</p>
                <button className="btn btn-dark">Contact</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="title">Stanislav</h2>
                <p className="card-text">Software Engineer</p>
                <p className="card-text">stanislav2177@gmail.com</p>
                <button className="btn btn-dark ">Contact</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="title">David</h2>
                <p className="card-text">Software Engineer</p>
                <p className="card-text">david.nikiforov@abv.bg</p>
                <button className="btn btn-dark">Contact</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="title">Stoyan</h2>
                <p className="card-text">Software Engineer</p>
                <p className="card-text">stoianstoikov@gmail.com</p>
                <button className="btn btn-dark">Contact</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="title">Kristyan</h2>
                <p className="card-text">Software Engineer</p>
                <p className="card-text">krisistoikov@gmail.com</p>
                <button className="btn btn-dark">Contact</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="title">Marko</h2>
                <p className="card-text">Software Engineer</p>
                <p className="card-text">marko.pejcic12321@gmail.com</p>
                <button className="btn btn-dark">Contact</button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div>
        <section className="section-above-footer">
          Made by TU Team 2
        </section>
      </div>
    </>
  );
};

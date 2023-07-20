import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
  return (
    <footer className="text-center text-lg-start text-white" style={{backgroundColor: '#1c2331'}}>

      <section className="p-2 ">
        <div className="container text-center text-md-start mt-5 ">
          <div className="row mt-3">
          <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4 d-flex justify-content-center align-items-center">
            <a href="/"><img src="/ToDo_logo-transparent-cropped.png" alt="Logo ToDo" style={{maxWidth: "75px"}}/></a>
          </div>


            <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4 d-flex flex-column align-items-center">
              <h6 className="text-uppercase fw-bold">Useful links</h6>
              <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px', backgroundColor: '#7c4dff', height: '2px'}}/>
              <p>
                <a href="/" className="text-white">Home</a>
              </p>
              <p>
                <a href="/about" className="text-white">About</a>
              </p>
              <p>
                <a href="/contact" className="text-white">Contact</a>
              </p>
            </div>

            <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4 d-flex flex-column align-items-center">
              {/* Links */}
              <h6 className="text-uppercase fw-bold">Contact</h6>
              <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px', backgroundColor: '#7c4dff', height: '2px'}}/>
              <p><FontAwesomeIcon icon={faHome} className="mr-3" /> 8 "Kliment Ohridski" Blvd, Sofia</p>
              <p><FontAwesomeIcon icon={faEnvelope} className="mr-3" /> ToDo@tu-sofia.bg</p>
              <p><FontAwesomeIcon icon={faPhone} className="mr-3" /> + 01 234 567 88</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
        © {new Date().getFullYear()} Copyright - {' '}
        <a className="text-white" href="/">ToDo</a>
      </div>

    </footer>
  );
}

export default Footer;

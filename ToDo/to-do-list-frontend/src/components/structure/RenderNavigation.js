import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import { nav } from "./navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export const RenderRoutes = () => {
  const { user } = AuthData();

  return (

     <>
    
    <Routes>
      {nav.map((r, i) => {
        if (r.isPrivate && user.isAuthenticated) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else if (!r.isPrivate) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else return false;
      })}
    </Routes>
    </>
  );
  
};

export const RenderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const { user, logout } = AuthData();
  const navigate = useNavigate();

  const MenuItem = ({ r }) => {
    return (
        <Link 
          className="nav-link"
          to={r.path}>{r.name}
        </Link>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className={`navbar-toggler ${isOpen ? '' : 'collapsed'}`} type="button" onClick={toggle}
                aria-expanded={isOpen} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <div className="navbar-nav me-auto mb-2 mb-lg-0">
            {nav.map((r, i) => {
              if (!r.isPrivate && r.isMenu) {
                return <MenuItem key={i} r={r} onClick={close} />;
              } else if (user.isAuthenticated && r.isMenu) {
                return <MenuItem key={i} r={r} onClick={close} />;
              } else return false;
            })}
          </div>
          <div className="navbar-nav">
            {user.isAuthenticated ? (
              <Link className="nav-link" to={"#"} onClick={() => { logout(); close(); }}>
                Log out
              </Link>
            ) : (
              <Link className="nav-link" to={"/login"} onClick={close}>Log in</Link>
            )}
            {!user.isAuthenticated && (
              <Link className="nav-link"
                    to={"/signup"}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/signup");
                      close();
                    }}
              >
                Signup
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
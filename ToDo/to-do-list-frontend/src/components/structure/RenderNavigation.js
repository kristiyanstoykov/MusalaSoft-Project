import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate, NavLink } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import { nav } from "./navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const MenuItem = ({ r, onClick }) => (
  <NavLink 
    className="nav-link" 
    to={r.path} 
    activeClassName="active"
    onClick={onClick}
    exact
  >
    {r.name}
  </NavLink>
)

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
      <NavLink
        className="nav-link"
        onClick={close} 
        activeClassName="active"
        to={r.path}>{r.name}
      </NavLink>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">MusalaSoft-Project</a>
        <button className={`navbar-toggler ${isOpen ? '' : 'collapsed'}`} type="button" onClick={toggle}
                aria-expanded={isOpen} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <div className="navbar-nav d-flex flex-grow-1 mb-2 mb-lg-0">
            {nav.map((r, i) => {
              if (!r.isPrivate && r.isMenu) {
                return <MenuItem key={i} r={r} onClick={close} />;
              } else if (user.isAuthenticated && r.isMenu) {
                return <MenuItem key={i} r={r} onClick={close} />;
              } else return false;
            })}
            {user.isAuthenticated ? (
              <NavLink 
                className="nav-link" 
                to={"#"} 
                onClick={() => 
                  { 
                    logout(); 
                    close();
                  }
                }
                activeClassName="active">
                Log out
              </NavLink>
            ) : (
              <NavLink 
                className="nav-link"
                to={"/login"} 
                onClick={close} 
                activeClassName="active">
                  Log in
                </NavLink>
            )}
            {!user.isAuthenticated && (
              <NavLink className="nav-link"
                    to={"/signup"}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/signup");
                      close();
                    }}
                    activeClassName="active"
              >
                Signup
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
import { Route, Routes, useNavigate, NavLink } from "react-router-dom";
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
  const { user, logout } = AuthData();
  const navigate = useNavigate();

  const MenuItem = ({ r }) => {
    return (
      <NavLink className="text-white"
        to={r.path}>{r.name}
      </NavLink>
    );
  };

  return (
    <p>
      {nav.map((r, i) => {
        if (!r.isPrivate && r.isMenu) {
          return <MenuItem key={i} r={r} />;
        } else if (user.isAuthenticated && r.isMenu) {
          return <MenuItem key={i} r={r} />;
        } else return false;
      })}
      {user.isAuthenticated ? (
        <NavLink className="text-white"
          to={"#"} 
          onClick={ logout() }
        >
          Log out
        </NavLink>
      ) : (
        <NavLink className="text-white"
          to={"/login"}
        >
          Log in
        </NavLink>
      )}
      {!user.isAuthenticated && (
        <NavLink className="text-white"
          to={"/signup"}
          onClick={(e) => {
            e.preventDefault();
            navigate("/signup");
          }}
        >
          Signup
        </NavLink>
      )}
    </p>
  );
};
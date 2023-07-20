import { createContext, useContext, useState } from "react";
import { RenderHeader } from "../components/structure/Header";
import { RenderMenu, RenderRoutes } from "../components/structure/RenderNavigation";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);
export const AuthWrapper = () => {
     const [user, setUser] = useState({ name: "", isAuthenticated: false });
   
const login = (userName, password) => {
  // Make a call to the authentication API to get the JWT token
  return fetch("http://localhost:8080/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: userName, password }),
  })
    .then((response) => {
      if (response.ok) {
          console.log(userName)
        return response.json();
      } else {
        throw new Error("Authentication failed");
      }
    })
    .then((data) => {
      const token = data.token;
      setUser({ name: userName,  isAuthenticated: true, token });
      return "success";
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

   
     const logout = () => {
       setUser({ ...user, isAuthenticated: false });
     };
   
     return (
       <AuthContext.Provider value={{ user, login, logout }}>
         <>
           <RenderHeader />
           <RenderMenu />
           <RenderRoutes />
         </>
       </AuthContext.Provider>
     );
   };
   
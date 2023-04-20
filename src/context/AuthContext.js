import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
 
 
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);


 const authenticateUser = () => {
   const token = localStorage.getItem("authToken");

   if (token) {
     axios
       .get(`${baseUrl}/auth/verify`, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       })
       .then((results) => {
         console.log("Are we logged in?", results.data);
         setUser(results.data);
       })
       .catch((err) => {
         console.log(err.message);
       });
   }
 };

   const logout = () => {
     localStorage.clear();
     console.log("we've logged out");
     setUser(null);
    
   };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser, authenticateUser, logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);


  let user = sessionStorage.getItem("user");

  useEffect(() => {
    user = sessionStorage.getItem("user");
    if (user && !currentUser) {
      axios
        .get("/api/users/me", { withCredentials: true })
        .then(({ data }) => {
          setCurrentUser(data);
        })
        .catch((error) => {
          swal("Oops!", error.toString());
        });
    }
  }, [currentUser, user]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

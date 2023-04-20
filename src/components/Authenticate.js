import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Authenticate = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return true ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default Authenticate;

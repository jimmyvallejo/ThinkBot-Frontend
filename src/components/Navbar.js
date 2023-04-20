import { useState, useContext, useEffect, } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Button from "./Buttton";
import { colors } from "../styles/colors";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";






const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate()
  
  const {setShowChat, setSubject, role} = useContext(ChatContext)

const handleSignout = () => {
  setShowChat(null)
  setSubject(null)
  navigate('/')
  logout();
  
};


  const handleChange = () => {
    setShowChat(null);
    setSubject(null);
    console.log(user)
  };

  if (location.pathname === "/login" || location.pathname === "/register" || location.pathname === '/' || location.pathname === '/teacher-dashboard')
    return null;

  return (
    <nav>
     <div className="navstart">
      <Link className="navName" to={"/"}>
        <img className="Robot" src="./Robot.png"></img>
        <h3>AI Tutor</h3>
      </Link>
            {location.pathname === "/tutor" &&<Button style={{background: colors.whites[500], color: colors.blues[500], fontSize: "20px", marginTop:"40px"}} onClick={() => handleChange()}> + New Chat</Button>}
            </div>
      <div className="navdiv">
        {role === "student" && (
          <Link className="navItem" to={"/tutor"}>
            Tutor
          </Link>
        )}
        {role === "teacher" && (
          <Link className="navItem" to={"/dashboard"}>
            Dashboard
          </Link>
        )}
        {!user && (
          <Link className="navItem" to={"/login"}>
            Login
          </Link>
        )}
        {!user && (
          <Link className="navItem" to={"/register"}>
            Signup
          </Link>
        )}
        {user && (
          <Button className="navItem" onClick={handleSignout}>
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

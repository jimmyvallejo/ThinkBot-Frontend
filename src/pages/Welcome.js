import * as React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { colors } from "../styles/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

export default function Welcome() {
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));


  const { user, authenticateUser } = useContext(AuthContext);

  const [studentDemo, setStudentDemo] = useState({
    email: "mary",
    password: "123",
  });

  const [teacherDemo, setTeacherDemo] = useState({
    email: "msadams",
    password: "123",
  });

  const blueColor = `rgba(30, 84, 183, 1)`;

  const but_style = {
    width: isSmallScreen ? "100px" : "274px",
    height: "60px",
    fontSize: isSmallScreen ? "18px" : "24px",
    marginBottom: 20,
   
  };

  const but2_style = {
    width: isSmallScreen ? "120px" : "174px",
    height: isSmallScreen ? "50px" : "40px",
    fontSize:  isSmallScreen ? "14px" :" 20px",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: isSmallScreen ? "1rem" : "80px",
  };
  const handleStudent = async () => {
    const login = {
      email: studentDemo.email,
      password: studentDemo.password,
    };

    try {
      const results = await axios.post(`${baseUrl}/auth/login`, login);

      localStorage.setItem("authToken", results.data.token);
      await authenticateUser();
    } catch (e) {
      console.error(e);
    }
  };

  const handleTeacher = async () => {
    try {
      const results = await axios.post(`${baseUrl}/auth/login`, teacherDemo);

      localStorage.setItem("authToken", results.data.token);
      await authenticateUser();
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "student") {
        navigate("/tutor");
      } else if (user.role === "teacher") {
        navigate(`/teacher-dashboard`);
      }
    }
  }, [user]);





  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid
        item
        xs={6}
        style={{
          background:
            "linear-gradient(180deg, #7B7B87 0%, #DFEFF1 33.33%, #1E54B7 66.67%, #23408F 100%)",
          height: "100%",
          textAlign: "center",
          paddingTop: "4.3rem",
        }}
      >
        <img className="logoImg" src="./logo.svg" />
        <Typography
          variant="h1"
          align="center"
          style={{
            fontSize: isSmallScreen ? "34px" : "64px",
            fontWeight: 700,
            color: "white",
            paddingTop: isSmallScreen ? "3rem" : "0",
          }}
        >
          Thinkbot
        </Typography>
        <Typography
          variant="h3"
          align="center"
          style={{
            fontSize: "24px",
            fontWeight: 500,
            marginTop: "1rem",
            color: "white",
          }}
        >
          Personal Student AI Tutor
        </Typography>
        <img
          style={{
            marginTop: "3rem",
            width: isSmallScreen ? "110px" : "175px",
          }}
          src="./mdc.svg"
        />
      </Grid>
      <Grid
        item
        xs={6}
        style={{
          background: isSmallScreen
            ? "linear-gradient(180deg, #7B7B87 0%, #DFEFF1 33.33%, #1E54B7 66.67%, #23408F 100%)"
            : "white",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            style={{
              marginBottom: "2rem",
              fontSize: "64px",
              fontWeight: 700,
            }}
          >
            {isSmallScreen ? "" : "Welcome to"}
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            style={{
              marginBottom: "2rem",
              fontSize: 50,
              fontWeight: 900,
              color: colors.blues[500],
            }}
          >
            {isSmallScreen ? "" : "ThinkBot"}
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            style={{
              marginBottom: "2rem",
              fontSize: 50,
              fontWeight: 500,
            }}
          >
            {isSmallScreen ? "" : "Your personal AI tutor"}
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            style={{
              marginBottom: "2rem",
              fontSize: 30,
              color: blueColor,
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            {isSmallScreen
              ? ""
              : "Giving our students the world with the help of AI"}
          </Typography>
          <div className="firstButtons">
            <Button style={but_style} onClick={() => navigate("/register")}>
              Sign Up
            </Button>
            <Button
              style={{ ...but_style, background: "white", color: "black" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </Box>
        <div className="demos">
          <Button style={but2_style} onClick={() => handleStudent()}>
            Student Demo
          </Button>
          <Button
            style={{ ...but2_style, background: "white", color: "black" }}
            onClick={() => handleTeacher()}
          >
            Teacher Demo
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

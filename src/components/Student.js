import { useState, useContext } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Grid, Typography, MenuItem } from "@mui/material";
import { css } from "@emotion/react";
import TextInput from "./TextInput";
import { AuthContext } from "../context/AuthContext";
import { post } from "../utils/api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Buttton";

const underlineStyle = {
  textDecoration: "underline",
  fontWeight: 800,
};

function Student({ history }) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");

  const [error, setError] = useState(null);

  const age_options = [5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18];

  const handleRegister = async (e) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );

      if (userCredential.user) {
        const user = {
          username,
          email,
          password,
          age,
          uid: userCredential.user.uid,
          role,
        };

        await post("/user", user);
        context.setUser(user);
      }
    } catch (e) {
      console.error(e);
    }
  };

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
        <img src="./logo.svg" />
        <Typography
          variant="h1"
          align="center"
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "white",
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
          Personal Student AI Robot Tutor
        </Typography>
        <img style={{ marginTop: "3rem" }} src="./mdc.svg" />
      </Grid>
      <Grid item xs={6} style={{ paddingTop: "9rem" }}>
        <Typography
          variant="h1"
          align="center"
          style={{
            fontSize: "64px",
            fontWeight: 700,
          }}
        >
          Create an Account
        </Typography>
        <Typography
          variant="h3"
          align="center"
          style={{
            fontSize: "24px",
            fontWeight: 300,
          }}
        >
          Are you a <span style={underlineStyle}>student</span> or a{" "}
          <span style={underlineStyle}>teacher?</span>
        </Typography>

        <Grid item xs={12} style={{ textAlign: "center", marginTop: "4rem" }}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "60%" }}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center", marginTop: "1rem" }}>
          <TextInput
            label="Username"
            placeholder="Create username"
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "60%" }}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center", marginTop: "1rem" }}>
          <TextInput
            label="Password"
            placeholder="Create password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "60%" }}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center", marginTop: "1rem" }}>
          <TextInput
            label="Role"
            placeholder="Pick Role"
            select
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "60%" }}
          >
            <MenuItem key="student" value="student">
              Student
            </MenuItem>
            <MenuItem key="teacher" value="teacher">
              Teacher
            </MenuItem>
          </TextInput>
        </Grid>

        {role === "student" && (
          <Grid item xs={12} style={{ textAlign: "center", marginTop: "1rem" }}>
            <TextInput
              label="Age"
              placeholder="Select age"
              select
              onChange={(e) => setRole(e.target.value)}
              style={{ width: "60%" }}
            >
              {age_options.map((age) => (
                <MenuItem key={age} value={age}>
                  {age}{" "}
                </MenuItem>
              ))}
            </TextInput>
          </Grid>
        )}

        <Grid style={{ marginTop: "1rem", textAlign: "center" }} item xs={12}>
          <Button onClick={handleRegister}>Sign up</Button>
        </Grid>

        <Typography
          variant="body1"
          style={{ marginTop: "1rem", fontWeight: 700, textAlign: "center" }}
        >
          Already have login?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              textDecoration: "underline",
              fontWeight: 600,
              color: "blue",
              cursor: "pointer",
            }}
          >
            click here
          </span>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Student;

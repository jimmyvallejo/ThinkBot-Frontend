import { useState, useEffect } from "react";
import { Grid, Typography, MenuItem } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextInput from "../components/TextInput";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

const underlineStyle = {
  textDecoration: "underline",
  fontWeight: 800,
};

function Register() {
  const navigate = useNavigate();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
 
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState("");
  const [fullname, setFullName] = useState("");
  const [profile_image, setProfileImage] = useState("");

  const age_options = [5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await axios.get(`${baseUrl}/users`);

        console.log(result.data);
        result.data.map((elem) => {
          console.log(elem);
          if (elem.role === "teacher") {
            setUsers((prevItems) => [...prevItems, elem]);
          }
        });
        console.log(users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleRegister = async (e) => {
    setLoading(true);
    try {
      const user = {
        username,
        email,
        password,
        age,
        role,
        teacher,
        fullname,
        profile_image,
      };
      console.log(user);
      await axios.post(`${baseUrl}/auth/signup`, user);
      setLoading(false);
      navigate("/login");
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const handleFileSubmit = (e) => {
    let fileUpload = new FormData();
    fileUpload.append("profile_image", e.target.files[0]);
    axios
      .post(`${baseUrl}/auth/add-picture`, fileUpload)
      .then((result) => {
        console.log(result.data);
        setProfileImage(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid encType="multipart/form-data" container style={{ height: "100vh" }}>
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
            fontSize: isSmallScreen ? "32px" : "64px",
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
        <img
          className="logoImg"
          style={{ marginTop: "3rem" }}
          src="./mdc.svg"
        />
      </Grid>
      <Grid item xs={6} style={{ paddingTop: isSmallScreen ? "3rem" : "7rem" }}>
        <Typography
          variant="h1"
          align="center"
          style={{
            fontSize: "64px",
            fontWeight: 700,
          }}
        >
          {isSmallScreen ? "" : "Create an Account"}
        </Typography>
        <Typography
          variant="h3"
          align="center"
          style={{
            fontSize: isSmallScreen ? "18px" : "24px",
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
            label="Full Name"
            placeholder="Full Name"
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            style={{ width: "60%" }}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center", marginTop: "1rem" }}>
          <TextInput
            label="Profile Picture"
            type="file"
            onChange={(e) => handleFileSubmit(e)}
            style={{ width: isSmallScreen ? "58.5%" : "60%" }}
            InputLabelProps={{
              shrink: true,
              classes: { root: "file-input-placeholder" },
            }}
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
              onChange={(e) => setAge(e.target.value)}
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

        {role === "student" && (
          <Grid item xs={12} style={{ textAlign: "center", marginTop: "1rem" }}>
            <TextInput
              label="Teacher"
              select
              onChange={(e) => setTeacher(e.target.value)}
              style={{ width: "60%" }}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}{" "}
                </MenuItem>
              ))}
            </TextInput>
          </Grid>
        )}

        <Grid style={{ marginTop: "1rem", textAlign: "center" }} item xs={12}>
          {loading && <CircularProgress />}
          {!loading && <Button onClick={handleRegister}>Sign up</Button>}
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

export default Register;

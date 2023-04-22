import React, { useContext, useEffect, useState } from "react";
import { Button, SwipeableDrawer, Avatar, Box, Grid } from "@mui/material";
import "../styles/teacher_dashboard.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

Chart.register();

const TeacherDashboard = ({}) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [teacherDashboardData, setTeacherDashboardData] = useState([]);
  const [studentData, setStudentData] = useState(null);

  const [mathCounter, setMathCounter] = useState(0);
  const [scienceCounter, setScienceCounter] = useState(0);
  const [historyCounter, setHistoryCounter] = useState(0);
  const [literatureCounter, setliteratureCounter] = useState(0);

  useEffect(() => {
    if (studentData) {
      console.log("studentData has been updated:", studentData);
    }
  }, [studentData]);

  const fetchStudents = async () => {
    try {
      const result = await axios.get(`${baseUrl}/users`);
      result.data.map((student) => {
        if (student.teacher === user._id) {
          setTeacherDashboardData((prevData) => [...prevData, student]);
        }
      });
      console.log("id:", user);
    } catch {}
  };

  useEffect(() => {
    if (user) {
      fetchStudents();
    }
  }, []);

  useEffect(() => {
    console.log("Result:", teacherDashboardData);
    console.log(user);
  }, [teacherDashboardData]);

  useEffect(() => {
    teacherDashboardData?.map((student) => {
      student?.liked?.forEach((like) => {
        if (like.subject === "math") {
          setMathCounter((prev) => prev + 1);
          return;
        }
        if (like.subject === "science") {
          setScienceCounter((prev) => prev + 1);
          return;
        }
        if (like.subject === "history") {
          setHistoryCounter((prev) => prev + 1);
          return;
        }
        if (like.subject === "literature") {
          setliteratureCounter((prev) => prev + 1);
        }
      });
    });
  }, [teacherDashboardData]);

  const handleSignout = () => {
    navigate("/");
    logout();
  };

  return (
    <Box sx={{ paddingLeft: 3, paddingRight: 3 }}>
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        style={{ height: "100%", marginTop: "20px" }}
      >
        <Grid item>
          <Button
            variant="outlined"
            color="error"
            sx={{ height: 34 }}
            onClick={() => handleSignout()}
            className="closeButton"
            style={{ marginRight: "40px" }}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
      <div className="teacher-dashboard-content__student-questions">
        <h1>Welcome back, {user.name}</h1>

        <div className="dashboard__low-improving-subjects">
          <div className="dashboard__low-improving-subjects__item">
            <div className="dashboard__low-improving-subjects__item__left">
              <h3 style={{ fontSize: 24, marginBottom: 6, marginLeft: "30px" }}>
                Literature
              </h3>
              <h1
                style={{
                  color: "#FD0404",
                  fontSize: 31,
                  fontWeight: "bolder",
                  marginBottom: "10px",
                }}
              >
                {literatureCounter.toString()} Questions
              </h1>
              <div className="specContainer">
                <u>
                  <h5
                    style={{
                      color: "#77A52D",
                      fontSize: 18,
                      marginBottom: 6,
                    }}
                  >
                    Specific Topics
                  </h5>
                </u>
                <p>1. Reading</p>
                <p>2. Writing</p>
                <p>3. Poetry</p>
              </div>
            </div>

            <div className="dashboard__low-improving-subjects__item__right">
              <h3 style={{ fontSize: 24, marginTop: "15px" }}>
                More Resources
              </h3>

              <h5>View More Details</h5>
            </div>
          </div>
          <div className="dashboard__low-improving-subjects__item">
            <div className="dashboard__low-improving-subjects__item__left">
              <h3 style={{ fontSize: 24, marginBottom: 6, marginLeft: "40px" }}>
                Science
              </h3>
              <h1
                style={{
                  color: "#FD0404",
                  fontSize: 31,
                  fontWeight: "bolder",
                  marginBottom: "10px",
                }}
              >
                {scienceCounter} Questions
              </h1>
              <div className="specContainer">
                <u>
                  <h5
                    style={{
                      color: "#77A52D",
                      fontSize: 18,
                      marginBottom: 6,
                    }}
                  >
                    Specific Topics
                  </h5>
                </u>
                <p>1. Chemistry</p>
                <p>2. General Biology</p>
                <p>3. Omissions</p>
              </div>
            </div>
            <div className="dashboard__low-improving-subjects__item__right">
              <h3 style={{ fontSize: 24, marginTop: "15px" }}>
                More Resources
              </h3>
              <h5>View More Details</h5>
            </div>
          </div>
          <div className="dashboard__low-improving-subjects__item">
            <div className="dashboard__low-improving-subjects__item__left">
              <h3 style={{ fontSize: 24, marginBottom: 6, marginLeft: "40px" }}>
                History
              </h3>
              <h1
                style={{
                  color: "#FD0404",
                  fontSize: 31,
                  fontWeight: "bolder",
                  marginBottom: "10px",
                }}
              >
                {historyCounter} Questions
              </h1>
              <div className="specContainer">
                <u>
                  <h5
                    style={{
                      color: "#77A52D",
                      fontSize: 18,
                      marginBottom: 6,
                    }}
                  >
                    Specific Topics
                  </h5>
                </u>
                <p>1. Early History</p>
                <p>2. Medieval History</p>
                <p>3. Modern History</p>
              </div>
            </div>
            <div className="dashboard__low-improving-subjects__item__right">
              <h3 style={{ fontSize: 24, marginTop: "15px" }}>
                More Resources
              </h3>
              <h5>View More Details</h5>
            </div>
          </div>

          <div className="dashboard__low-improving-subjects__item">
            <div className="dashboard__low-improving-subjects__item__left">
              <h3 style={{ fontSize: 24, marginBottom: 6, marginLeft: "55px" }}>
                Math
              </h3>
              <h1
                style={{
                  color: "#FD0404",
                  fontSize: 31,
                  fontWeight: "bolder",
                  marginBottom: "10px",
                }}
              >
                {mathCounter.toString()} Questions
              </h1>
              <div className="specContainer">
                <u>
                  <h5
                    style={{
                      color: "#77A52D",
                      fontSize: 18,
                      marginBottom: 6,
                    }}
                  >
                    Specific Topics
                  </h5>
                </u>
                <p>1. Calculus</p>
                <p>2. Geometry</p>
                <p>3. Arithmetic</p>
              </div>
            </div>
            <div className="dashboard__low-improving-subjects__item__right">
              <h3 style={{ fontSize: 24, marginTop:"15px" }}>More Resources</h3>
              <h5>View More Details</h5>
            </div>
          </div>
        </div>
      </div>
      <SwipeableDrawer open={openDrawer}>
        <div className="teacher-dashbaord-container">
          <Avatar
            alt="profile image"
            src="https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?s=612x612&w=0&k=20&c=Dw1nKFtnU_Bfm2I3OPQxBmSKe9NtSzux6bHqa9lVZ7A="
            sx={{ height: 75, width: 75 }}
          />
          <div className="teacher-dashbaord-container__button-items">
            <Button>Home</Button>
            <Button>Students</Button>
            <Button>Questions</Button>
            <Button
              className="teacher-dashbaord-container__button-items__signout"
              color="error"
              variant="contained"
            >
              Sign out
            </Button>
          </div>
        </div>
      </SwipeableDrawer>

      <div className="teacher-dashboard-content">
        <div className="teacher-dashboard-content__header">
          {/* <Button onClick={() => setOpenDrawer(true)} sx={{ height: 50 }}>Open Dashboard</Button> */}
        </div>

        <div className="teacher-dashboard-content__items">
          <div className="teacher-dashboard-content__student-roster">
            <h3>Liked Responses</h3>

            {teacherDashboardData &&
              teacherDashboardData.map((student, index) => {
                return (
                  <div className="teacher-dashboard-content__student-roster__item">
                    <div className="teacher-dashboard-content__student-roster__item__userInfo">
                      <Avatar
                        sx={{ height: 55, width: 55 }}
                        imgProps={{ style: { objectFit: "contain" } }}
                        src={student.profile_image}
                      />
                      <h4>{student.name}</h4>
                    </div>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ height: 34 }}
                      onClick={() =>
                        setStudentData({
                          liked: student.liked,
                          img: student.profile_image,
                        })
                      }
                    >
                      View Questions
                    </Button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {studentData && (
        <>
          <div
            className="teacher-dashboard-content__student-questions"
            style={{
              marginTop: 10,
              background: "transparent",
              borderWidth: 2,
              borderColor: "#9797971A",
              borderStyle: "solid",
            }}
          >
            <h3>Questions Asked</h3>
            {studentData.liked.map((pair, index) => {
              console.log(pair);
              return (
                <div className="questionContainer">
                  <div className="teacher-dashboard-content__student-question__item ">
                    <div className="teacher-dashboard-content__student-question__userInfo">
                      <div
                        className="teacher-dashboard-content__student-roster__item"
                        style={{ padding: 0 }}
                      >
                        <div className="teacher-dashboard-content__student-roster__item__userInfo">
                          <Avatar
                            sx={{ height: 55, width: 55 }}
                            src={studentData.img}
                            imgProps={{ style: { objectFit: "contain" } }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="questionsDiv">
                      <h3 className="pairHeader">Question {index + 1}</h3>
                      <h3 className="pairQuestion">{pair.question}</h3>
                    </div>
                    <div>
                      <h3 className="pairHeader2">Answer {index + 1}</h3>
                      <h3 className="pairAnswer">{pair.answer}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: "100%", marginBottom: "30px" }}
          >
            <Grid item>
              <Button
                variant="outlined"
                color="error"
                sx={{ height: 34 }}
                onClick={() => setStudentData("")}
                className="closeButton"
              >
                Close Questions
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default TeacherDashboard;

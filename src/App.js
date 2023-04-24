import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/ChatPage";
import Navbar from "./components/Navbar";
import Welcome from "./pages/Welcome";


import TeacherDashboard from "./pages/Teacher-Dashboard";



const theme = createTheme({
  typography: {
    fontFamily: ["Nunito", "Inter", "sans-serif"].join(","),
  },
});

function App() {


  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Navbar />
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/tutor" element={<Chat />} />
              <Route exact path="/" element={<Welcome />} />
              <Route
                exact
                path="/teacher-dashboard"
                element={<TeacherDashboard />}
              />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

export default App;

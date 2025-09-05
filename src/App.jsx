import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

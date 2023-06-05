import { BrowserRouter as Router, Routes, Route, Switch, Redirect } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./Home_pages/Home";
import { Login } from "./Home_pages/Login";
import { Navbar } from "./Navbar";
import { AboutUs } from "./Home_pages/AboutUs";
import { SignUp } from "./Home_pages/SignUp";
import { PatientDashboard } from "./Patient_Pages/PatientDashboard";
import { WellnessFrom } from "./Patient_Pages/WellnessForm";
import { Assignment } from "./Patient_Pages/Assignment";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About Us" element={<AboutUs />} />
          <Route path="/Sign Up" element={<SignUp />} />
          <Route path="/Patient Dashboard" element={<PatientDashboard />} />
          <Route path="/Wellness Form" element={<WellnessFrom />} />
          <Route path="/Assignment" element={<Assignment />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

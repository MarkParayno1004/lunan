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
import { WeeklyForm } from "./Patient_Pages/WeeklyForm";
import { WellnessGuide } from "./Patient_Pages/WellnessGuide";
import { Schedule } from "./Patient_Pages/Schedule";
import { SupervisorDashboard } from "./Supervisor_Pages/SupervisorDashboard"
import { AddCounselor } from "./Supervisor_Pages/AddCounselor"
import { AllCounselors } from "./Supervisor_Pages/AllCounselors"
import { AllPatients } from "./Supervisor_Pages/AllPatients"
import { NewPatients } from "./Supervisor_Pages/NewPatients"

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
          <Route path="/Supervisor Dashboard" element={<SupervisorDashboard />} />
          <Route path="/All Patients" element={<AllPatients />} />
          <Route path="/New Patients" element={<NewPatients />} />
          <Route path="/All Counselors" element={<AllCounselors />} />
          <Route path="/Add Counselors" element={<AddCounselor />} />
          <Route path="/Wellness Form" element={<WellnessFrom />} />
          <Route path="/Assignment" element={<Assignment />} />
          <Route path="/Weekly Form" element={<WeeklyForm />} />
          <Route path="/Wellness Guide" element={<WellnessGuide />} />
          <Route path="/Schedule" element={<Schedule />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
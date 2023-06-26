import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./Home_pages/Home";
import { Login } from "./Home_pages/Login";
import { AboutUs } from "./Home_pages/AboutUs";
import { SignUp } from "./Home_pages/SignUp";
import { PatientDashboard } from "./Patient_Pages/PatientDashboard";
import { WellnessForm } from "./Patient_Pages/WellnessForm";
import { PatientAssignment } from "./Patient_Pages/PatientAssignment";
import { WeeklyForm } from "./Patient_Pages/WeeklyForm";
import { WellnessGuide } from "./Patient_Pages/WellnessGuide";
import { Schedule } from "./Patient_Pages/Schedule";
import { SupervisorDashboard } from "./Supervisor_Pages/SupervisorDashboard";
import { AddCounselor } from "./Supervisor_Pages/AddCounselor";
import { AllCounselors } from "./Supervisor_Pages/AllCounselors";
import { AllPatients } from "./Supervisor_Pages/AllPatients";
import { NewPatients } from "./Supervisor_Pages/NewPatients";
import { CounselorDashboard } from "./Counselor_Pages/CounselorDashboard";
import { ViewAssignments } from "./Counselor_Pages/ViewAssignments";
import { PatientList } from "./Counselor_Pages/PatientList";
import { PatientInfo } from "./Counselor_Pages/PatientInfo";
import { ViewCaseNotes } from "./Counselor_Pages/ViewCaseNotes";
import { CreateCaseNotes } from "./Counselor_Pages/CreateCaseNotes";
import { PatientWeeklyForms } from "./Counselor_Pages/PatientWeeklyForms";
import { PatientWellnessForms } from "./Counselor_Pages/PatientWellnessForms";
import CounselorScheduler from "./Counselor_Pages/CounselorScheduler";
import { FAQ } from "./Home_pages/FAQ";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About Us" element={<AboutUs />} />
          <Route path="/Sign Up" element={<SignUp />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/Patient Dashboard" element={<PatientDashboard />} />
          <Route
            path="/Supervisor Dashboard"
            element={<SupervisorDashboard />}
          />
          <Route path="Counselor Dashboard" element={<CounselorDashboard />} />
          <Route path="/All Patients" element={<AllPatients />} />
          <Route path="/New Patients" element={<NewPatients />} />
          <Route path="/All Counselors" element={<AllCounselors />} />
          <Route path="/Add Counselors" element={<AddCounselor />} />
          <Route path="/WellnessForm" element={<WellnessForm />} />
          <Route path="/Assignment" element={<PatientAssignment />} />
          <Route path="/Weekly Form" element={<WeeklyForm />} />
          <Route path="/Wellness Guide" element={<WellnessGuide />} />
          <Route path="/Schedule" element={<Schedule />} />
          <Route
            path="/View Patients Assignment"
            element={<ViewAssignments />}
          />
          <Route path="/View Patient List" element={<PatientList />} />
          <Route path="/View Patient Info" element={<PatientInfo />} />
          <Route path="/View Case Notes" element={<ViewCaseNotes />} />
          <Route path="/Create Case Notes" element={<CreateCaseNotes />} />
          <Route path="/Counselor Scheduler" element={<CounselorScheduler />} />
          <Route path="/Patient Weekly Form" element={<PatientWeeklyForms />} />
          <Route
            path="/Patient Wellness Form"
            element={<PatientWellnessForms />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./Home_pages/Home";
import { Login } from "./Home_pages/Login";
import { AboutUs } from "./Home_pages/AboutUs";
import { SignUp } from "./Home_pages/SignUp";
import { SupervisorDashboard } from "./Supervisor_Pages/SupervisorDashboard";
import { CounselorDashboard } from "./Counselor_Pages/CounselorDashboard";
import { FAQ } from "./Home_pages/FAQ";
import { ReactApp } from "./video";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* 
          //!Home Pages Routes 
          */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About Us" element={<AboutUs />} />
          <Route path="/Sign Up" element={<SignUp />} />
          <Route path="/FAQ" element={<FAQ />} />

          {/* 
          //!Pages Dashboards Routes
          */}
          <Route
            path="/Supervisor Dashboard"
            element={<SupervisorDashboard />}
          />
          <Route path="/Counselor Dashboard" element={<CounselorDashboard />} />
          <Route path="/VideoTest" element={<ReactApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

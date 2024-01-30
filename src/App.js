import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { SupervisorDashboard } from "./Supervisor_Pages/SupervisorDashboard";
import { CounselorDashboard } from "./Counselor_Pages/CounselorDashboard";
import { ReactApp } from "./video";

import { Home } from "./Home/Pages/Home";
import { Login } from "./Home/Pages/Login";
import { AboutUs } from "./Home/Pages/AboutUs";
import { SignUp } from "./Home/Pages/SignUp";
import { FAQ } from "./Home/Pages/FAQ";

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

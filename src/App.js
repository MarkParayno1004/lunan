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
import { SupervisorDashboard } from "./Supervisor_Pages/SupervisorDashboard";
import { CounselorDashboard } from "./Counselor_Pages/CounselorDashboard";
import { FAQ } from "./Home_pages/FAQ";
import { Provider } from "react-redux";
import { store } from "./chat/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            {/* 
          //!Home Pages Routes 
          /}
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/About Us" element={<AboutUs />} />
            <Route path="/Sign Up" element={<SignUp />} />
            <Route path="/FAQ" element={<FAQ />} />

            {/ 
          //!Pages Dashboards Routes
          */}
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/About Us" element={<AboutUs />} />
            <Route path="/Sign Up" element={<SignUp />} />
            <Route path="/FAQ" element={<FAQ />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

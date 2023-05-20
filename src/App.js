import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./Home_pages/Home";
import { Login } from "./Home_pages/Login";
import { Navbar } from "./Navbar";
import { AboutUs } from "./Home_pages/AboutUs";
import { SignUp } from "./Home_pages/SignUp";
import { SignUpPageTwo } from "./Home_pages/SignUpQuestions.js/SignUp_Page2";
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
          <Route path="/Sign Up=Page Two" element={<SignUpPageTwo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

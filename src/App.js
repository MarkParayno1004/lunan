import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Navbar } from "./Navbar";
import { AboutUs } from "./pages/AboutUs";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About Us" element={<AboutUs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

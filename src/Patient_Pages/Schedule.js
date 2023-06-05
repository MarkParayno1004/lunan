import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/Schedule.css";
export const Schedule = () => {
  return (
    <div
      className="container-fluid d-flex justify-content-center"
      id="ScheduleBG"
    >
      <div>
        <h1>Schedule Page</h1>
        <div className="mt-3">
          <Link to="/Patient Dashboard" style={{ textDecoration: "none" }}>
            <Button
              className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
              id="WellnessButton"
            >
              Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

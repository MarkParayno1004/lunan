import "../css/WellnessForm.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
export const WellnessFrom = () => {
  const [getRangeQ1, setRangeQ1] = useState(1);
  const [getRangeQ2, setRangeQ2] = useState(1);
  const [getRangeQ3, setRangeQ3] = useState(1);
  const [getRangeQ4, setRangeQ4] = useState(1);

  return (
    <div class="container-fluid d-flex justify-content-center " id="WellnessBG">
      <div
        class="container-lg mt-3 mb-3 rounded-4 fw-normal d-flex justify-content-center"
        id="WellnessForm"
      >
        <div className="container-fluid">
          <h1 className="fw-light ">The Subjective Happiness Scale</h1>
          <p
            className="fw-light"
            style={{ fontSize: 23 + "px" }}
            id="SHSDescription"
          >
            The SHS is a 4-item scale of global subjective happiness. Two items
            ask respondents to characterize themselves using both absolute
            ratings and ratings relative to peers, whereas the other two items
            offer brief descriptions of happy and unhappy individuals and ask
            respondents the extent to which each characterization describes
            them.
            <br />
            <br />
            Lyubomirsky, S., & Lepper, H. S. (1999). A measure of subjective
            happiness: Preliminary reliability and construct validation. Social
            Indicators Research, 46, 137-155.
          </p>

          {/* 1 IN GENERAL */}
          <div className="container-fluid">
            <span className="fw-light" style={{ fontSize: 20 + "px" }}>
              For each of the following statements and/or questions, please
              range the point on the scale that you feel is most appropriate in
              describing you.
              <br />
              <span className="fw-semibold" style={{ color: "red" }}>
                (scale range to 1-7. 1 is the lowest that means you're not a
                happy person thus 7 is the highest that means you're a happy
                person)
              </span>
            </span>

            <label for="customRange2" class="form-label fs-5 fw-light mt-3">
              1. In general, I consider myself:
            </label>
            <div>
              <input
                id="slider"
                type="range"
                class="form-range"
                name="General"
                min="1"
                max="7"
                value={getRangeQ1}
                onChange={(e) => {
                  setRangeQ1(e.target.value);
                }}
              ></input>
              {getRangeQ1 === "1" ? (
                <h5>Not a very happy person</h5>
              ) : (
                getRangeQ1 === "7" && <h5>A very happy person</h5>
              )}
            </div>
          </div>

          {/* 2 Compared to most of my peers */}
          <div className="container-fluid">
            <label for="customRange2" class="form-label fs-5 fw-light mt-3">
              2. Compared to most of my peers, I consider myself:
            </label>
            <div>
              <input
                id="slider"
                type="range"
                class="form-range"
                name="Compared"
                min="1"
                max="7"
                value={getRangeQ2}
                onChange={(e) => {
                  setRangeQ2(e.target.value);
                }}
              ></input>

              {getRangeQ2 === "1" ? (
                <h5>Less happy</h5>
              ) : (
                getRangeQ2 === "7" && <h5>More happy</h5>
              )}
            </div>
          </div>

          {/* 3 Some people are generally very happy */}
          <div className="container-fluid">
            <label for="customRange2" class="form-label fs-5 fw-light mt-3">
              3. Some people are generally very happy. They enjoy life
              regardless of what is going on, getting the most out of
              everything. To what extent does this characterization describe
              you?
            </label>
            <div>
              <input
                id="slider"
                type="range"
                class="form-range"
                name="Compared"
                min="1"
                max="7"
                value={getRangeQ3}
                onChange={(e) => {
                  setRangeQ3(e.target.value);
                }}
              ></input>

              {getRangeQ3 === "1" ? (
                <h5>Not at all</h5>
              ) : (
                getRangeQ3 === "7" && <h5>A great deal</h5>
              )}
            </div>
          </div>

          {/* 4. Some people are generally not very happy */}
          <div className="container-fluid">
            <label for="customRange2" class="form-label fs-5 fw-light mt-3">
              4. Some people are generally not very happy. Although they are not
              depressed, they never seem as happy as they might be. To what
              extent does this characterization describe you?
            </label>
            <div>
              <input
                id="slider"
                type="range"
                class="form-range"
                name="Compared"
                min="1"
                max="7"
                value={getRangeQ4}
                onChange={(e) => {
                  setRangeQ4(e.target.value);
                }}
              ></input>

              {getRangeQ4 === "1" ? (
                <h5>Not at all</h5>
              ) : (
                getRangeQ4 === "7" && <h5>A great deal</h5>
              )}
            </div>
          </div>
          <p className="mt-3">
            Scoring: Compute the mean across responses to all four questions;
            item #4 is reverse coded.
          </p>
          <div className="container-fluid mb-3">
            <div className="row">
              <div className="col-sm">
                <div className="d-flex justify-content-start">
                  <Link to="/Patient Dashboard" style={{ textDecoration: "none" }}>
                    <Button
                      className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
                      id="buttonCard"
                    >
                      Back
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="col-sm">
                <div className="d-flex justify-content-end">
                    <Button
                      className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
                      id="buttonCard"
                    >
                      Submit
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

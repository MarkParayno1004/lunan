import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../css/WeeklyForm.css";
export const WeeklyForm = () => {
  //! Value of radio button
  const [getRadio5, setRadio5] = useState();
  const [getRadio4, setRadio4] = useState();
  const [getRadio3, setRadio3] = useState();
  const [getRadio2, setRadio2] = useState();
  const [getRadio1, setRadio1] = useState();
  return (
    <div
      className="container-fluid d-flex justify-content-center "
      id="WeeklyBG"
    >
      <div
        class="container-lg mt-3 mb-3 rounded-4 fw-normal d-flex justify-content-center"
        id="WeekForm"
      >
        <div className="table-responsive mt-5">
          <div>
            <h2 className="fw-semibold">
              WHO (Five) Well-Being Index (1998 version)
            </h2>
            <p className="fs-4 fw-light mb-3">
              Please indicate for each of the five statements which is closest
              to how you have been feeling over the last two weeks. Notice that
              higher numbers mean better well-being.
              <br />
              <br />
              Example: If you have felt cheerful and in good spirits more than
              half of the time during the last two weeks, put a tick in the box
              with the number 3 in the upper right corner.
            </p>
          </div>
          <table class="table table-sm table-success table-bordered align-middle table-hover">
            <thead>
              <tr className="align-top ">
                <th scope="col">Over the last two weeks:</th>
                <th scope="col">All the time</th>
                <th scope="col">
                  Most of <br />
                  the time
                </th>
                <th scope="col">
                  More than half
                  <br /> of the time
                </th>
                <th scope="col">
                  Less than half
                  <br /> of the time
                </th>
                <th scope="col">
                  Some of <br />
                  the time
                </th>
                <th scope="col">At no time</th>
              </tr>
            </thead>

            <tbody className="table-group-divider">
              {/* For question number 1*/}
              <tr className="align-middle">
                <th scope="row">
                  1. I have felt cheerful <br />
                  and in good spirits.
                </th>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion1 "
                      value={5}
                      onChange={(e) => {
                        setRadio1(e.target.value);
                      }}
                      id="flexRadioQueNumber1"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber1"
                  >
                    5
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion1 "
                      value={4}
                      onChange={(e) => {
                        setRadio1(e.target.value);
                      }}
                      id="flexRadioQueNumber1"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center "
                    for="flexRadioNumber1"
                  >
                    4
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion1 "
                      value={3}
                      onChange={(e) => {
                        setRadio1(e.target.value);
                      }}
                      id="flexRadioNumber1"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center "
                    for="flexRadioNumber1"
                  >
                    3
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion1 "
                      value={2}
                      onChange={(e) => {
                        setRadio1(e.target.value);
                      }}
                      id="flexRadioNumber1"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center "
                    for="flexRadioNumber1"
                  >
                    2
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion1 "
                      value={1}
                      onChange={(e) => {
                        setRadio1(e.target.value);
                      }}
                      id="flexRadioNumber1"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber1"
                  >
                    1
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input "
                      type="radio"
                      name="flexRadioQuestion1 "
                      value={0}
                      onChange={(e) => {
                        setRadio1(e.target.value);
                      }}
                      id="flexRadioNumber1"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber1"
                  >
                    0
                  </label>
                </td>
              </tr>

              {/* For question number 2*/}
              <tr>
                <th scope="row" className="">
                  2. I have felt calm and relaxed
                </th>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion2 "
                      value={5}
                      onChange={(e) => {
                        setRadio2(e.target.value);
                      }}
                      id="flexRadioQueNumber2"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber2"
                  >
                    5
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion2 "
                      value={4}
                      onChange={(e) => {
                        setRadio2(e.target.value);
                      }}
                      id="flexRadioQueNumber2"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber2"
                  >
                    4
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion2 "
                      value={3}
                      onChange={(e) => {
                        setRadio2(e.target.value);
                      }}
                      id="flexRadioQueNumber2"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber2"
                  >
                    3
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion2 "
                      value={2}
                      onChange={(e) => {
                        setRadio2(e.target.value);
                      }}
                      id="flexRadioQueNumber2"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber2"
                  >
                    2
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion2 "
                      value={1}
                      onChange={(e) => {
                        setRadio2(e.target.value);
                      }}
                      id="flexRadioQueNumber2"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber2"
                  >
                    1
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion2 "
                      value={0}
                      onChange={(e) => {
                        setRadio2(e.target.value);
                      }}
                      id="flexRadioQueNumber2"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber2"
                  >
                    0
                  </label>
                </td>
              </tr>

              {/* For question number 3*/}
              <tr>
                <th scope="row">3. I have felt active and vigorous</th>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion3 "
                      value={5}
                      onChange={(e) => {
                        setRadio3(e.target.value);
                      }}
                      id="flexRadioQueNumber3"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber3"
                  >
                    5
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion3 "
                      value={4}
                      onChange={(e) => {
                        setRadio3(e.target.value);
                      }}
                      id="flexRadioQueNumber3"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber3"
                  >
                    4
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion3 "
                      value={3}
                      onChange={(e) => {
                        setRadio3(e.target.value);
                      }}
                      id="flexRadioQueNumber3"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber3"
                  >
                    3
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion3 "
                      value={2}
                      onChange={(e) => {
                        setRadio3(e.target.value);
                      }}
                      id="flexRadioQueNumber3"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber3"
                  >
                    2
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion3 "
                      value={1}
                      onChange={(e) => {
                        setRadio3(e.target.value);
                      }}
                      id="flexRadioQueNumber3"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber3"
                  >
                    1
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion3 "
                      value={0}
                      onChange={(e) => {
                        setRadio3(e.target.value);
                      }}
                      id="flexRadioQueNumber3"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber3"
                  >
                    0
                  </label>
                </td>
              </tr>

              {/* For question number 4*/}
              <tr>
                <th scope="row">4. I woke up feeling fresh and rested</th>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion4 "
                      value={5}
                      onChange={(e) => {
                        setRadio4(e.target.value);
                      }}
                      id="flexRadioQueNumber4"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber4"
                  >
                    5
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion4 "
                      value={4}
                      onChange={(e) => {
                        setRadio4(e.target.value);
                      }}
                      id="flexRadioQueNumber4"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber4"
                  >
                    4
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion4 "
                      value={3}
                      onChange={(e) => {
                        setRadio4(e.target.value);
                      }}
                      id="flexRadioQueNumber4"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber4"
                  >
                    3
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion4 "
                      value={2}
                      onChange={(e) => {
                        setRadio4(e.target.value);
                      }}
                      id="flexRadioQueNumber4"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber4"
                  >
                    2
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion4 "
                      value={1}
                      onChange={(e) => {
                        setRadio4(e.target.value);
                      }}
                      id="flexRadioQueNumber4"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber4"
                  >
                    1
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion4 "
                      value={0}
                      onChange={(e) => {
                        setRadio4(e.target.value);
                      }}
                      id="flexRadioQueNumber4"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber4"
                  >
                    0
                  </label>
                </td>
              </tr>

              {/* For question number 5*/}
              <tr>
                <th scope="row">
                  My daily life has been filled <br />
                  with things that interest me
                </th>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion5 "
                      value={5}
                      onChange={(e) => {
                        setRadio5(e.target.value);
                      }}
                      id="flexRadioQueNumber5"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber5"
                  >
                    5
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion5 "
                      value={4}
                      onChange={(e) => {
                        setRadio5(e.target.value);
                      }}
                      id="flexRadioQueNumber5"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber5"
                  >
                    4
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion5 "
                      value={3}
                      onChange={(e) => {
                        setRadio5(e.target.value);
                      }}
                      id="flexRadioQueNumber5"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber5"
                  >
                    3
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion5 "
                      value={2}
                      onChange={(e) => {
                        setRadio5(e.target.value);
                      }}
                      id="flexRadioQueNumber5"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber5"
                  >
                    2
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion5 "
                      value={1}
                      onChange={(e) => {
                        setRadio5(e.target.value);
                      }}
                      id="flexRadioQueNumber5"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber5"
                  >
                    1
                  </label>
                </td>
                <td>
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioQuestion5 "
                      value={0}
                      onChange={(e) => {
                        setRadio5(e.target.value);
                      }}
                      id="flexRadioQueNumber5"
                    />
                  </div>
                  <label
                    class="form-check-label d-flex justify-content-center"
                    for="flexRadioNumber5"
                  >
                    0
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <p className="fs-4 fw-light mt-3">
              <h5 className="fw-semibold">Scoring:</h5>
              The raw score is calculated by totaling the figures of the five
              answers. The raw score ranges from 0 to 25, 0 represent- ing worst
              possible and 25 representing best possible quality of life.
              <br />
              <br />
              To obtain a percentage score ranging from 0 to 100, the raw score
              is multiplied by 4. A percentage score of 0 represents worst
              possible, whereas a score of 100 represents best possible quality
              of life.
              <br />
              <br />
              <h5 className="fw-semibold">Interpretation:</h5>
              It is recommended to administer the Major Depression (ICD-10)
              Inventory if the raw score is below 13 or if the patient has
              answered 0 to 1 to any of the five items. A score below 13
              indicates poor wellbeing and is an indication for testing for
              depression under ICD-10.
              <br />
              <br />
              <h5 className="fw-semibold">Monitoring change:</h5>
              In order to monitor possible changes in wellbeing, the percentage
              score is used. A 10% difference indicates a significant change
              (ref. John Ware, 1995).
            </p>
          </div>
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

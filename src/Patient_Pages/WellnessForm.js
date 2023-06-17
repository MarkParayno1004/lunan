import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase-config";
import Scale from "../Patient_Pages/img/wellnessScale.png";
import Swal from "sweetalert2";
import "../css/WellnessForm.css";

export const WellnessForm = () => {
  const [getRangeQ1, setRangeQ1] = useState("1");
  const [getRangeQ2, setRangeQ2] = useState("1");
  const [getRangeQ3, setRangeQ3] = useState("1");
  const [getRangeQ4, setRangeQ4] = useState("1");
  const [getRangeQ1Text, setRangeQ1Text] = useState("");
  const [getRangeQ2Text, setRangeQ2Text] = useState("");
  const [getRangeQ3Text, setRangeQ3Text] = useState("");
  const [getRangeQ4Text, setRangeQ4Text] = useState("");
  const wellnessFormRef = collection(firestore, "WellnessForm");

  const upload = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        // User not logged in, handle this case accordingly
        return;
      }

      const newAnswer = {
        UID: user.uid,
        WellnessQ1: getRangeQ1Text,
        WellnessQ2: getRangeQ2Text,
        WellnessQ3: getRangeQ3Text,
        WellnessQ4: getRangeQ4Text,
        DateAnswered: new Date().toISOString().split("T")[0],
      };
      console.log("New User Data:", newAnswer);

      // Add the document to Firestore
      await addDoc(wellnessFormRef, newAnswer);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
    Swal.fire({
      position: "center",
      icon: "success",
      background: "#7db9b6",
      title: "Successfully Submitted",
      color: "white",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const updateRangeQ1Text = (value) => {
    setRangeQ1(value);
    setRangeQ1Text(getRangeText(value));
  };

  const updateRangeQ2Text = (value) => {
    setRangeQ2(value);
    setRangeQ2Text(getRangeText(value));
  };

  const updateRangeQ3Text = (value) => {
    setRangeQ3(value);
    setRangeQ3Text(getRangeText(value));
  };

  const updateRangeQ4Text = (value) => {
    setRangeQ4(value);
    setRangeQ4Text(getRangeText(value));
  };

  const getRangeText = (value) => {
    switch (value) {
      case "1":
        return "Not a very happy person";
      case "2":
        return "Not a happy person";
      case "3":
        return "Somewhat happy";
      case "4":
        return "A moderately happy person";
      case "5":
        return "A happy person";
      case "6":
        return "A very happy person";
      case "7":
        return "A very happy and joyful person";
      default:
        return "";
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center" id="WellBG">
      <div
        className="container-lg mt-3 mb-3 rounded-4 fw-normal d-flex justify-content-center"
        id="WellnessForm"
      >
        <div className="container-fluid">
          <h1 className="fw-light">The Subjective Happiness Scale</h1>
          <p
            className="fw-light"
            style={{ fontSize: "23px" }}
            id="SHSDescription"
          >
            The SHS is a 4-item scale of global subjective happiness. Two items
            ask respondents to characterize themselves using both absolute
            ratings and ratings relative to peers, whereas the other two items
            offer brief descriptions of happy and unhappy individuals and ask
            respondents the extent to which each characterization describes
            them.
          </p>

          <div className="container-fluid">
            <span className="fw-light" style={{ fontSize: "20px" }}>
              For each of the following statements and/or questions, please
              range the point on the scale that you feel is most appropriate in
              describing you.
            </span>
            <div class="container text-center">
              <div class="row">
                <div class="col-sm-4 ">
                  <img src={Scale} style={{ height: 500 + "px" }} />
                </div>
                <div class="col-8">
                  {/* 1 IN GENERAL */}
                  <div className="container-fluid ">
                    <label
                      htmlFor="customRange2"
                      className="form-label fs-5 fw-light mt-3 d-flex justify-content-start"
                    >
                      1. In general, I consider myself:
                    </label>
                    <div>
                      <input
                        id="slider"
                        type="range"
                        className="form-range"
                        name="WellnessQ1"
                        min="1"
                        max="7"
                        value={getRangeQ1}
                        onChange={(e) => {
                          updateRangeQ1Text(e.target.value);
                        }}
                      />
                      {getRangeQ1Text}
                    </div>
                  </div>

                  {/* 2 Compared to most of my peers */}
                  <div className="container-fluid ">
                    <label
                      htmlFor="customRange2"
                      className="form-label fs-5 fw-light mt-3 d-flex justify-content-start"
                    >
                      2. Compared to most of my peers, I consider myself:
                    </label>
                    <div>
                      <input
                        id="slider"
                        type="range"
                        className="form-range"
                        name="WellnessQ2"
                        min="1"
                        max="7"
                        value={getRangeQ2}
                        onChange={(e) => {
                          updateRangeQ2Text(e.target.value);
                        }}
                      />
                      {getRangeQ2Text}
                    </div>
                  </div>

                  {/* 3 Some people are generally very happy */}
                  <div className="container-fluid">
                    <label
                      htmlFor="customRange2"
                      className="form-label fs-5 fw-light mt-3 me-5 d-flex justify-content-start"
                    >
                      3. Some people are generally very happy. They enjoy life
                      regardless of what is going on, getting the most out of
                      everything. To what extent does this characterization
                      describe you?
                    </label>
                    <div>
                      <input
                        id="slider"
                        type="range"
                        className="form-range"
                        name="WellnessQ3"
                        min="1"
                        max="7"
                        value={getRangeQ3}
                        onChange={(e) => {
                          updateRangeQ3Text(e.target.value);
                        }}
                      />
                      {getRangeQ3Text}
                    </div>
                  </div>

                  {/* 4. Some people are generally not very happy */}
                  <div className="container-fluid">
                    <label
                      htmlFor="customRange2"
                      className="form-label fs-5 fw-light mt-3 d-flex justify-content-start"
                    >
                      4. Some people are generally not very happy. Although they
                      are not depressed, they never seem as happy as they might
                      be. To what extent does this characterization describe
                      you?
                    </label>
                    <div>
                      <input
                        id="slider"
                        type="range"
                        className="form-range"
                        name="WellnessQ4"
                        min="1"
                        max="7"
                        value={getRangeQ4}
                        onChange={(e) => {
                          updateRangeQ4Text(e.target.value);
                        }}
                      />
                      {getRangeQ4Text}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

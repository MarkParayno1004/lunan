import { useState } from "react";

import { auth, firestore } from "../firebase/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import "../css/WeeklyForm.css";
import Swal from "sweetalert2";

export const WeeklyForm = () => {
  const [getRadio5, setRadio5] = useState();
  const [getRadio4, setRadio4] = useState();
  const [getRadio3, setRadio3] = useState();
  const [getRadio2, setRadio2] = useState();
  const [getRadio1, setRadio1] = useState();
  const weeklyFormRef = collection(firestore, "WeeklyForm");

  const upload = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        // User not logged in, handle this case accordingly
        return;
      }

      const newAnswer = {
        UID: user.uid,
        WellnessQ1: getRadio1,
        WellnessQ2: getRadio2,
        WellnessQ3: getRadio3,
        WellnessQ4: getRadio4,
        WellnessQ5: getRadio5,
        DateAnswered: new Date().toISOString().split("T")[0],
      };
      console.log("New User Data:", newAnswer);

      // Add the document to Firestore
      await addDoc(weeklyFormRef, newAnswer);
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

  const [getRangeQ1, setRangeQ1] = useState("1");
  const [getRangeQ2, setRangeQ2] = useState("1");
  const [getRangeQ3, setRangeQ3] = useState("1");
  const [getRangeQ4, setRangeQ4] = useState("1");
  const [getRangeQ5, setRangeQ5] = useState("1");
  const [getRangeQ1Text, setRangeQ1Text] = useState("");
  const [getRangeQ2Text, setRangeQ2Text] = useState("");
  const [getRangeQ3Text, setRangeQ3Text] = useState("");
  const [getRangeQ4Text, setRangeQ4Text] = useState("");
  const [getRangeQ5Text, setRangeQ5Text] = useState("");

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

  const updateRangeQ5Text = (value) => {
    setRangeQ5(value);
    setRangeQ5Text(getRangeText(value));
  };

  const getRangeText = (value) => {
    switch (value) {
      case "1":
        return "All the time";
      case "2":
        return "Most of the time";
      case "3":
        return "More than half of the time";
      case "4":
        return "Less than half of the time";
      case "5":
        return "Some of the time";
      case "6":
        return "At no time";
      default:
        return "";
    }
  };
  return (
    <div
      className="container-lg mt-5 pb-5 pt-3 pb-4 ps-4 pe-3 rounded-4 fw-normal d-flex justify-content-center"
      id="WeekForm"
    >
      <div className="container-fluid">
        <div
          className="rounded-5 mt-4 ms-3 me-3 pt-3 pb-3 ps-3 pe-3"
          id="bgHeader"
        >
          <h3 className="fw-light">
            WHO (Five) Well-Being Index (1998 version)
          </h3>
          <p className="fs-4 fw-light mb-3" style={{ fontSize: 50 + "px" }}>
            Please indicate for each of the five statements which is closest to
            how you have been feeling over the last two weeks. Notice that
            higher numbers mean better well-being.
          </p>
          <p className="fs-4 fw-light mb-3" style={{ fontSize: 5 + "px" }}>
            Example: If you have felt cheerful and in good spirits "More Than
            Half of the Time" during the last two weeks, slide the bar to choose
            "More Than Half of the Time".
          </p>
        </div>
        <div
          className="rounded-5 mt-4 ms-3 me-3 pt-3 pb-3 ps-3 pe-3"
          id="bgCol"
        >
          {/* 1. I have felt cheerful and in good spirits. */}
          <div className="container-fluid">
            <label
              htmlFor="customRange2"
              className="form-label fs-5 fw-light mt-3 d-flex justify-content-start"
            >
              1. I have felt cheerful and in good spirits.
              <span className="fw-semibold ms-3">{getRangeQ1Text}</span>
            </label>
            <div className="fs-5">
              <input
                id="slider"
                type="range"
                className="form-range"
                name="WellnessQ1"
                min="1"
                max="6"
                value={getRangeQ1}
                onChange={(e) => {
                  updateRangeQ1Text(e.target.value);
                }}
              />
            </div>
          </div>

          {/* 2. I have felt calm and relaxed. */}
          <div className="container-fluid ">
            <label
              htmlFor="customRange2"
              className="form-label fs-5 fw-light mt-3 d-flex justify-content-start"
            >
              2. I have felt calm and relaxed.{" "}
              <span className="fw-semibold ms-3"> {getRangeQ2Text}</span>
            </label>
            <div className="fs-5">
              <input
                id="slider"
                type="range"
                className="form-range"
                name="WellnessQ2"
                min="1"
                max="6"
                value={getRangeQ2}
                onChange={(e) => {
                  updateRangeQ2Text(e.target.value);
                }}
              />
            </div>
          </div>

          {/* 3. I have felt active and vigorous. */}
          <div className="container-fluid">
            <label
              htmlFor="customRange2"
              className="form-label fs-5 fw-light mt-3 me-5 d-flex justify-content-start"
            >
              3. I have felt active and vigorous.
              <span className="fw-semibold ms-3">{getRangeQ3Text}</span>
            </label>
            <div className="fs-5">
              <input
                id="slider"
                type="range"
                className="form-range"
                name="WellnessQ3"
                min="1"
                max="6"
                value={getRangeQ3}
                onChange={(e) => {
                  updateRangeQ3Text(e.target.value);
                }}
              />
            </div>
          </div>

          {/* 4. I woke up feeling fresh and rested.*/}
          <div className="container-fluid">
            <label
              htmlFor="customRange2"
              className="form-label fs-5 fw-light mt-3 d-flex justify-content-start"
            >
              4. I woke up feeling fresh and rested.{" "}
              <span className="fw-semibold ms-3"> {getRangeQ4Text}</span>
            </label>
            <div className="fs-5">
              <input
                id="slider"
                type="range"
                className="form-range"
                name="WellnessQ4"
                min="1"
                max="6"
                value={getRangeQ4}
                onChange={(e) => {
                  updateRangeQ4Text(e.target.value);
                }}
              />
            </div>
          </div>

          {/* 5. My daily life has been filled with things that interest me.*/}
          <div className="container-fluid">
            <label
              htmlFor="customRange2"
              className="form-label fs-5 fw-light mt-3 d-flex justify-content-start"
            >
              5. My daily life has been filled with things that interest me.{" "}
              <span className="fw-semibold ms-3"> {getRangeQ5Text}</span>
            </label>
            <div className="fs-5">
              <input
                id="slider"
                type="range"
                className="form-range"
                name="WellnessQ5"
                min="1"
                max="6"
                value={getRangeQ5}
                onChange={(e) => {
                  updateRangeQ5Text(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

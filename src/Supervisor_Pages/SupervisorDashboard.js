import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { firestore, auth } from "../firebase/firebase-config";
import { AllPatients } from "./AllPatients";
import { NewPatients } from "./NewPatients";
import { AllCounselors } from "./AllCounselors";
import SideLogo from "../img/BLOOMFIELDS_LOGO-03.png";
import { DefaultPageSupervisor } from "./DefaultPageSupervisor";
import "../css/SupervisorDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import SupervisorScheduler from "./SupervisorScheduler";

export const SupervisorDashboard = () => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const UID = user.uid;
          const usersCollection = collection(firestore, "Users");
          const q = query(usersCollection, where("UID", "==", UID));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const adminData = querySnapshot.docs[0].data();
            if (adminData && adminData.Name) {
              setAdminName(adminData.Name);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching admin name:", error);
      }
    };

    fetchAdminName();
  }, []);

  const [activeComponent, setActiveComponent] = useState("default");

  return (
    <div className=" d-flex align-items-start" id="sdBG">
      <div class="d-flex flex-column flex-shrink-0 p-3 " id="sideBarSuperVisor">
        <span class="fs-4">
          <div className="d-flex justify-content-center">
            <img src={SideLogo} style={{ width: 13 + "rem" }} />
          </div>
          <h5>Welcome {adminName}</h5>
        </span>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li
            className={`d-flex justify-content-start ${
              activeComponent === "default" ? "active" : ""
            }`}
          >
            <button
              id="hoverList"
              onClick={() => {
                setActiveComponent("default");
              }}
            >
              Dashboard
            </button>
          </li>
          <div className="ms-2 mt-1">
            <li
              className={`d-flex justify-content-start ${
                activeComponent === "patient" ? "active" : ""
              }`}
            >
              <button
                id="hoverList"
                onClick={() => {
                  setActiveComponent("patient");
                }}
              >
                All Patient List
              </button>
            </li>
            <li
              className={`d-flex justify-content-start ${
                activeComponent === "Counselors" ? "active" : ""
              }`}
            >
              <button
                id="hoverList"
                onClick={() => {
                  setActiveComponent("Counselors");
                }}
              >
                All Counselor
              </button>
            </li>
            <li
              className={`d-flex justify-content-start ${
                activeComponent === "new" ? "active" : ""
              }`}
            >
              <button
                id="hoverList"
                onClick={() => {
                  setActiveComponent("new");
                }}
              >
                New Patient
              </button>
            </li>
            <li
              className={`d-flex justify-content-start ${
                activeComponent === "schedule" ? "active" : ""
              }`}
            >
              <button
                id="hoverList"
                onClick={() => {
                  setActiveComponent("schedule");
                }}
              >
                Scheduler
              </button>
            </li>
          </div>
        </ul>
        <div className="d-flex justify-content-start">
          <Link to="/Login" style={{ textDecoration: "none" }}>
            <button
              className="btn rounded-5"
              style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <div className="container-fluid">
        {activeComponent === "default" ? (
          <DefaultPageSupervisor />
        ) : activeComponent === "patient" ? (
          <AllPatients />
        ) : activeComponent === "Counselors" ? (
          <AllCounselors />
        ) : activeComponent === "new" ? (
          <NewPatients />
        ) : activeComponent === "schedule" ? (
          <SupervisorScheduler />
        ) : null}
      </div>
      <div
        className="me-5 d-flex align-items-end"
        style={{ height: 95 + "vh" }}
      >
        <div>
          <button style={{ border: "none", background: "none" }}>
            <FontAwesomeIcon
              className="fa-3x"
              icon={faComment}
              flip="horizontal"
              color={"#4d455d"}
              size={32}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

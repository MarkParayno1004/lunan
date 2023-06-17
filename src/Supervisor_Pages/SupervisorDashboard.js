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

  const [showComponent, setComponent] = useState("default");

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
          <li className="d-flex justify-content-start">
            <button
              id="hoverList"
              onClick={() => {
                setComponent("default");
              }}
            >
              Dashboard
            </button>
          </li>
          <div className="ms-2 mt-1">
            <li>
              <button
                id="hoverList"
                onClick={() => {
                  setComponent("patient");
                }}
              >
                All Patient List
              </button>
            </li>
            <li>
              <button
                id="hoverList"
                onClick={() => {
                  setComponent("Counselors");
                }}
              >
                All Counselor
              </button>
            </li>
            <li>
              <button
                id="hoverList"
                onClick={() => {
                  setComponent("new");
                }}
              >
                New Patient
              </button>
            </li>
          </div>
        </ul>
      </div>
      <div className="container-fluid">
        {showComponent === "default" ? (
          <DefaultPageSupervisor />
        ) : showComponent === "patient" ? (
          <AllPatients />
        ) : showComponent === "Counselors" ? (
          <AllCounselors />
        ) : (
          showComponent === "new" && <NewPatients />
        )}
      </div>
      <div
        className="me-5 d-flex align-items-end"
        style={{ height: 80 + "vh" }}
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

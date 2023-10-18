import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { firestore, auth } from "../firebase/firebase-config";
import { AllPatients } from "./Components/AllPatients";
import { NewPatients } from "./Components/NewPatients";
import { AllCounselors } from "./Components/AllCounselors";
import { Chat } from "./Components/Chat";
import SideLogo from "../img/BLOOMFIELDS_LOGO-03.png";
import { DefaultPageSupervisor } from "./Components/DefaultPageSupervisor";
import "../css/SupervisorDashboard.css";
import { AvatarSupervisor } from "../SupportEngine/AvatarSupervisor";

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
                activeComponent === "chat" ? "active" : ""
              }`}
            >
              <button
                id="hoverList"
                onClick={() => {
                  setActiveComponent("chat");
                }}
              >
                Chat
              </button>
            </li>
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
                All Patient
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
            <div className="d-flex justify-content-start mt-5">
              <Link to="/Login" style={{ textDecoration: "none" }}>
                <button
                  className="btn rounded-5"
                  style={{
                    backgroundColor: "#f5e9cf",
                    color: "#4d455d",
                    height: 35 + "px",
                  }}
                >
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </ul>
      </div>
      <div className="container-fluid">
        {activeComponent === "default" ? (
          <>
            <DefaultPageSupervisor />
            <AvatarSupervisor
              style={{
                position: "fixed",
                bottom: 120 + "px",
                right: 24 + "px",
              }}
            />
          </>
        ) : activeComponent === "chat" ? (
          <>
            <Chat />
            <AvatarSupervisor
              style={{ position: "fixed", bottom: 25 + "px", right: 24 + "px" }}
            />
          </>
        ) : activeComponent === "patient" ? (
          <>
            <AllPatients />
            <AvatarSupervisor
              style={{ position: "fixed", bottom: 25 + "px", right: 24 + "px" }}
            />
          </>
        ) : activeComponent === "Counselors" ? (
          <>
            <AllCounselors />
            <AvatarSupervisor
              style={{
                position: "fixed",
                bottom: 120 + "px",
                right: 24 + "px",
              }}
            />
            <AvatarSupervisor
              style={{ position: "fixed", bottom: 24 + "px", right: 24 + "px" }}
            />
          </>
        ) : (
          activeComponent === "new" && (
            <>
              <NewPatients />
              <AvatarSupervisor
                style={{
                  position: "fixed",
                  bottom: 120 + "px",
                  right: 24 + "px",
                }}
              />
              <AvatarSupervisor
                style={{
                  position: "fixed",
                  bottom: 24 + "px",
                  right: 24 + "px",
                }}
              />
            </>
          )
        )}
      </div>
    </div>
  );
};

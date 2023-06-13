import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { firestore, auth } from "../firebase/firebase-config";
import "../css/SupervisorDashboard.css";

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

  return (
    <div className="d-flex align-items-center" id="sdBG">
      <div className="container text-center">
        <div className="row align-items-start">
          {/* Welcome Message */}
          <div className="col">
            <h1>Welcome, {adminName}</h1>
          </div>

          {/* All Patients List */}

          <div className="col d-flex justify-content-end">
            <Link to="/All Patients" style={{ textDecoration: "none" }}>
              <div>
                <div
                  className="card rounded-5"
                  style={{ width: 18 + "rem" }}
                  id="cardBG"
                >
                  <p className="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                    All Patients List
                  </p>
                  <div className="card-body" style={{ fontSize: 36 + "px" }}>
                    <img
                      alt="all patients"
                      src=""
                      className="card-img-bottom"
                      style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* New Patients */}
          <div className="col d-flex justify-content-center">
            <Link to="/New Patients" style={{ textDecoration: "none" }}>
              <div>
                <div
                  className="card rounded-5"
                  style={{ width: 18 + "rem" }}
                  id="cardBG"
                >
                  <p className="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                    New Patients
                  </p>
                  <div className="card-body" style={{ fontSize: 36 + "px" }}>
                    <img
                      alt="new patients"
                      src=""
                      className="card-img-bottom"
                      style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* All Counselors */}

          <div className="col d-flex justify-content-center">
            <Link to="/All Counselors" style={{ textDecoration: "none" }}>
              <div>
                <div
                  className="card rounded-5"
                  style={{ width: 18 + "rem" }}
                  id="cardBG"
                >
                  <p className="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                    All Counselors
                  </p>
                  <div className="card-body" style={{ fontSize: 36 + "px" }}>
                    <img
                      alt="all counselors"
                      src=""
                      className="card-img-bottom"
                      style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

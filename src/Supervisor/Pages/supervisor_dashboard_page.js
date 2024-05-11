import { useState, useEffect } from "react";
import { DashboardLogo } from "../../assets/images";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"; // Import Firebase authentication methods
import SupervisorAllPatientsComponent from "../Components/supervisor_all_patients_component";
import SupervisorAllCounselorComponent from "../Components/supervisor_all_counselor_component";
import SupervisorChatComponent from "../Components/supervisor_chat_component";
import SupervisorDashboardComponent from "../Components/supervisor_dashboard_component";

function SupervisorDashboardPage() {
  const [activeComponent, setActiveComponent] = useState("DashboardComponent");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      return error;
    }
  };
  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-primaryGreen text-white">
          <ul className="space-y-2 font-medium ">
            <div className="p-1 pb-4 w-52 ">
              <img alt="Dasboard Logo" src={DashboardLogo} />
            </div>
            <li className="rounded-lg hover:bg-gray-100 group">
              <button
                className="flex items-center p-2"
                onClick={() => setActiveComponent("DashboardComponent")}
              >
                <svg
                  className="w-5 h-5 text-white-200 transition duration-500 group-hover:text-primaryOrange"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="flex-1 ms-3 text-slate-50 transition duration-500 group-hover:text-primaryOrange">
                  Dashboard
                </span>
              </button>
            </li>
            <li className="rounded-lg hover:bg-gray-100 group">
              <button
                className="flex items-center p-2"
                onClick={() => setActiveComponent("ChatComponent")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="flex-shrink-0 w-5 h-5 text-white-200 transition duration-500 group-hover:text-primaryOrange"
                >
                  <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                  <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                </svg>

                <span className="flex-1 ms-3 text-slate-50 transition duration-500 group-hover:text-primaryOrange">
                  Chat
                </span>
              </button>
            </li>
            <li className="rounded-lg hover:bg-gray-100 group">
              <button
                className="flex items-center p-2"
                onClick={() => setActiveComponent("AllPatientsComponent")}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-white-200 transition duration-500 group-hover:text-primaryOrange"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 text-slate-50 transition duration-500 group-hover:text-primaryOrange">
                  All Patients
                </span>
              </button>
            </li>
            <li className="rounded-lg hover:bg-gray-100 group">
              <button
                className="flex items-center p-2"
                onClick={() => setActiveComponent("AllCounselorsComponent")}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-white-200 transition duration-500 group-hover:text-primaryOrange"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 text-slate-50 transition duration-500 group-hover:text-primaryOrange">
                  All Counselors
                </span>
              </button>
            </li>
            <li className="rounded-lg group hover:bg-gray-100 hover:text-primaryOrange mt-5">
              <button className="flex items-center p-2" onClick={handleSignOut}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 transition duration-300 ease-in-out"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="flex-1 ms-3 text-slate-50 transition duration-500 group-hover:text-primaryOrange">
                  Sign Out
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <div>
          {(() => {
            if (activeComponent === "DashboardComponent") {
              return <SupervisorDashboardComponent />;
            } else if (activeComponent === "ChatComponent") {
              return <SupervisorChatComponent />;
            } else if (activeComponent === "AllPatientsComponent") {
              return <SupervisorAllPatientsComponent />;
            } else if (activeComponent === "AllCounselorsComponent") {
              return <SupervisorAllCounselorComponent />;
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default SupervisorDashboardPage;

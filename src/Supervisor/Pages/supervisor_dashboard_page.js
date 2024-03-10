import { useState } from "react";
import { DashboardLogo } from "../../assets/images";
import "../../css/SupervisorDashboard.css";
import SupervisorAllPatientsComponent from "../Components/supervisor_all_patients_component";
import SupervisorNewPatientsComponent from "../Components/supervisor_new_patients_component";
import SupervisorAllCounselorComponent from "../Components/supervisor_all_counselor_component";
import SupervisorChatComponent from "../Components/supervisor_chat_component";
import SupervisorDashboardComponent from "../Components/supervisor_dashboard_component";

export default function SupervisorDashboardPage() {
  const [activeComponent, setActiveComponent] = useState("DashboardComponent");

  return (
    <div>
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
            } else if (activeComponent === "NewPatientsComponent") {
              return <SupervisorNewPatientsComponent />;
            }
          })()}
        </div>
      </div>
    </div>
  );
}

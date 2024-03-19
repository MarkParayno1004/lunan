import { firestore, auth } from "../../firebase/firebase-config";
import { collection, getDocs, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { UserIcon } from "../../assets/images";
import SupervisorGraphEveryMonth from "./supervisor_graph_every_month_component";

function SupervisorDashboardComponent() {
  const [adminName, setAdminName] = useState("");
  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const UID = user.uid;
          const usersCollection = collection(firestore, "Users");
          const query = query(usersCollection, where("UID", "==", UID));
          const querySnapshot = await getDocs(query);

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
    <div className="container text-primaryOrange">
      <div className="pt-3">
        <p className="font-sans antialiased font-bold text-4xl">
          Welcome {adminName}
        </p>
      </div>
      <div className="grid grid-cols-3 grid-flow-col gap-28 pt-4">
        <div className="grid shadow-md rounded-lg h-40 content-between">
          <div className="ps-4 pt-2">
            <UserIcon />
          </div>
          <div className="flex-end ps-4 pb-2">
            <span className="font-bold text-2xl">2802</span>
            <p className="text-orange-300 font-medium">Number of Patients</p>
          </div>
        </div>
        <div className="grid shadow-md rounded-lg h-40 content-between">
          <div className="ps-4 pt-2">
            <UserIcon />
          </div>
          <div className="flex-end ps-4 pb-2">
            <span className="font-bold text-2xl">2802</span>
            <p className="text-orange-300 font-medium">Number of Counselors</p>
          </div>
        </div>
        <div className="grid shadow-md rounded-lg h-40 content-between">
          <div className="ps-4 pt-2">
            <UserIcon />
          </div>
          <div className="flex-end ps-4 pb-2">
            <span className="font-bold text-2xl">2802</span>
            <p className="text-orange-300 font-medium">
              Number of New Patients
            </p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <SupervisorGraphEveryMonth />
      </div>
    </div>
  );
}

export default SupervisorDashboardComponent;

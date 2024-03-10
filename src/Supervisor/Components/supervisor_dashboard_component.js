import { firestore, auth } from "../../firebase/firebase-config";
import { collection, getDocs, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { OnlineIcon, UserIcon } from "../../assets/images";

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
      <div className="grid grid-cols-2 grid-flow-col gap-40">
        <div>
          <section className="py-1 bg-blueGray-50">
            <div className="w-full mt-24">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-bold font-sans text-base text-blueGray-700">
                        List of Patients
                      </h3>
                    </div>
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                      <button
                        className="bg-primaryGreen text-white active:bg-primaryOrange text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        See all
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <table className="items-center bg-transparent w-full border-collapse ">
                    <thead>
                      <tr>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold font-sans text-left">
                          Patients Name
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold font-sans text-left">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          Patient 1
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                            <span className="w-2 h-2 me-1 bg-green-600 rounded-full"></span>
                            <span className="text-primaryOrange text-xs font-bold">
                              Available
                            </span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          Patient 2
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                            <span className="text-primaryOrange text-xs font-bold">
                              Unavailable
                            </span>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <section className="py-1 bg-blueGray-50">
            <div className="w-full mt-24">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-bold font-sans text-base text-blueGray-700">
                        List of Counselors
                      </h3>
                    </div>
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                      <button
                        className="bg-primaryGreen text-white active:bg-primaryOrange text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        See all
                      </button>
                    </div>
                  </div>
                </div>

                <div className="block w-full overflow-x-auto">
                  <table className="items-center bg-transparent w-full border-collapse ">
                    <thead>
                      <tr>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold font-sans text-left">
                          Counselors Name
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold font-sans text-left">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          Counselor 1
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                            <span className="w-2 h-2 me-1 bg-green-600 rounded-full"></span>
                            <span className="text-primaryOrange text-xs font-bold">
                              Available
                            </span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          Counselor 2
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                            <span className="text-primaryOrange text-xs font-bold">
                              Unavailable
                            </span>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SupervisorDashboardComponent;

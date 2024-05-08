import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth, firestore } from "../../firebase/firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

function SupervisorChatComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [patientsData, setPatientsData] = useState([]);
  const [filteredPatientsData, setFilteredPatientsData] = useState([]);
  const [counselorNames, setCounselorNames] = useState({});
  const [show, setShow] = useState();
  const [room, setRoom] = useState();
  const [selectedPatientUID, setSelectedPatientUID] = useState(null);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [selectedIntakeFormsData, setSelectedIntakeFormsData] = useState([
    null,
  ]);
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const currentAdminUser = auth.currentUser.uid;
  console.log(`current admin: ${currentAdminUser}`);

  useEffect(() => {
    // Check if messages is not empty before scrolling to the end
    if (messages.length > 0 && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(firestore, "Users"))
        );
        const patients = querySnapshot.docs.map((doc) => doc.data());

        console.log("Patients Data:", patients);

        setPatientsData(patients);
        setFilteredPatientsData(patients);
      } catch (error) {
        console.error("Error fetching patients data:", error);
      }
    };

    fetchPatientsData();
  }, []);

  useEffect(() => {
    const fetchCounselorNames = async () => {
      const names = {};

      await Promise.all(
        patientsData.map(async (patient) => {
          if (patient.counselorID) {
            console.log("Fetching counselor name for:", patient.counselorID);
            const counselorName = await fetchCounselorName(patient.counselorID);
            names[patient.counselorID] = counselorName;
          }
        })
      );

      console.log("Fetched Counselor Names:", names);
      setCounselorNames(names);
    };

    fetchCounselorNames();
  }, [patientsData]);

  const fetchCounselorName = async (counselorID) => {
    try {
      const counselorDocRef = doc(firestore, "Users", counselorID);
      const counselorDocSnapshot = await getDoc(counselorDocRef);

      if (counselorDocSnapshot.exists()) {
        const counselorData = counselorDocSnapshot.data();
        if (counselorData.Role === "Counselor") {
          return counselorData.firstName;
        } else {
          return "Not a Counselor";
        }
      } else {
        return "Unknown Counselor";
      }
    } catch (error) {
      console.error("Error fetching counselor name:", error);
      return "Error Fetching Name";
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredPatients = patientsData.filter((patient) => {
      const firstNameMatch =
        patient.firstName && patient.firstName.toLowerCase().includes(query);
      const lastNameMatch =
        patient.lastName && patient.lastName.toLowerCase().includes(query);

      return firstNameMatch || lastNameMatch;
    });

    setFilteredPatientsData(filteredPatients);
  };

  const fetchImageUrl = (imageUrl) => {
    return imageUrl;
  };

  const handleSelectPatient = async (UID) => {
    setSelectedPatientUID(UID);
    setShowPatientInfo(true);

    // Create a chat room based on the selected patient's UID
    const roomName =
      UID < auth.currentUser.uid
        ? `${UID} and ${auth.currentUser.uid}`
        : `${auth.currentUser.uid} and ${UID}`;
    console.log("Room Name:", roomName);
    // Set the chat room name
    setRoom(roomName);

    try {
      // Fetch and set the selected patient's data
      const usersCollection = collection(firestore, "Users");
      const q = query(usersCollection, where("UID", "==", UID));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const patientData = doc.data();
        console.log("Patient Data:", patientData);
        setSelectedPatientData(patientData);
      } else {
        console.error("Patient not found");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }

    // Show the chat UI
    setShowChat(true);
  };

  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const totalNumberPatient = patientsData.filter(
    (patient) => patient.UID !== currentAdminUser
  ).length;

  //!
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;

    // Retrieve the user's first name from the 'Users' collection based on their UID
    const userFirstName = await getUserFirstName(auth.currentUser.uid);
    const userRole = await getRoles(auth.currentUser.uid);

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: userFirstName,
      room,
      role: userRole,
    });

    setNewMessage("");
  };

  const getUserFirstName = async (uid) => {
    try {
      const userQuery = query(
        collection(firestore, "Users"),
        where("UID", "==", uid)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].data();
        return userData.firstName;
      } else {
        return "Unknown User";
      }
    } catch (error) {
      console.error("Error fetching user's first name:", error);
      return "Error Fetching Name";
    }
  };

  const getRoles = async (uid) => {
    try {
      const userQuery = query(
        collection(firestore, "Users"),
        where("UID", "==", uid)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].data();
        return userData.Role;
      } else {
        return "Unknown User";
      }
    } catch (error) {
      console.error("Error fetching user's first name:", error);
      return "Error Fetching Name";
    }
  };

  useEffect(() => {
    if (room) {
      const queryMessages = query(
        messagesRef,
        where("room", "==", room),
        orderBy("createdAt")
      );

      const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
        let messages = [];
        snapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(messages);
      });

      return () => unsubscribe();
    }
  }, [room]);

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-chatHeight">
      <div className="flex h-131 w-128 antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-primaryGreen rounded-s-lg flex-shrink-0">
            <div className="flex flex-row items-center justify-start h-12 w-full">
              <div className="flex items-center justify-center rounded-2xl text-primaryOrange bg-white h-10 w-10">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2 font-bold text-2xl">QuickChat</div>
            </div>

            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center bg-orange-200 h-4 w-4 rounded-full font-mono ">
                  {totalNumberPatient}
                </span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-128 overflow-y-auto">
                {patientsData
                  .filter((patient) => patient.UID !== currentAdminUser)
                  .map((patient) => (
                    <button
                      className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                      key={patient.UID}
                      onClick={() => handleSelectPatient(patient.UID)}
                    >
                      <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                        {patient.ProfPic ? (
                          <img
                            src={fetchImageUrl(patient.ProfPic)}
                            alt={patient.firstName}
                            width="100"
                            height="100"
                            className="rounded-circle"
                          />
                        ) : (
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/lunan-75e15.appspot.com/o/user_profile_pictures%2F4WWRyPzPJH2ipbcK1npZ?alt=media&token=72e0fdf1-18e1-4065-bc70-2ebc18166aa1"
                            alt={patient.firstName}
                            width="100"
                            height="100"
                          />
                        )}
                      </div>
                      <div className="ml-2 text-sm font-semibold">
                        {patient.firstName}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full p-6 bg-primaryGreen rounded-e-lg">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-start border-b border-gray-400 mb-3">
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    {selectedPatientData && selectedPatientData.ProfPic ? (
                      <img
                        src={fetchImageUrl(selectedPatientData.ProfPic)}
                        alt={selectedPatientData.firstName}
                        width="100"
                        height="100"
                        className="rounded-circle"
                      />
                    ) : (
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/lunan-75e15.appspot.com/o/user_profile_pictures%2F4WWRyPzPJH2ipbcK1npZ?alt=media&token=72e0fdf1-18e1-4065-bc70-2ebc18166aa1"
                        alt={selectedPatientData?.firstName || "Unknown User"}
                        width="100"
                        height="100"
                      />
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-grey-darkest">
                      {selectedPatientData ? (
                        <span className="text-md font-semibold">
                          {selectedPatientData.firstName}
                        </span>
                      ) : (
                        <span className="text-md font-semibold">
                          Chat with your Patients and Counselors
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    {selectedPatientData && (
                      <button
                        className="text-primaryOrange"
                        onClick={() => {
                          navigate("/VideoTest");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-7 gap-y-2">
                    {/* message right side */}
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`col-start-1 col-end-8 p-3 rounded-lg flex ${
                          message.role === "Admin" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-start">
                            {message.role !== "Admin" && (
                              // icon for non-admin users floating to the left
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primaryOrange flex-shrink-0 mr-3">
                                <div className="font-mono font-semibold text-sm">
                                  {message.role.charAt(0)}
                                </div>
                              </div>
                            )}
                            <div className="relative text-sm bg-white py-2 px-4 shadow rounded-xl ">
                              <div className="">{message.text}</div>
                            </div>
                            {message.role === "Admin" && (
                              // icon for admin users floating to the right
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primaryGreen flex-shrink-0 ml-3">
                                <div className="font-mono font-semibold text-sm">
                                  {message.role.charAt(0)}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef}></div>
                  </div>
                </div>
              </div>
              <form
                className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
                onSubmit={handleSubmit}
              >
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    {selectedPatientData && (
                      <input
                        value={newMessage}
                        onChange={(event) => setNewMessage(event.target.value)}
                        type="text"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      />
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <button className="flex items-center justify-center bg-primaryOrange hover:bg-orange-300 rounded-xl text-white px-4 py-1 flex-shrink-0">
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupervisorChatComponent;

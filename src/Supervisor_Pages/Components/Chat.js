import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase-config";
import "../../css/Chat.css";
import { db, auth } from "../../firebase/firebase-config";
import App from "../../chat/components/App";
import { Provider } from "react-redux";
import { store } from "../../chat/store";
import { Theme } from "@twilio-paste/core/theme";
import { Box } from "@twilio-paste/core";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export const Chat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patientsData, setPatientsData] = useState([]);
  const [filteredPatientsData, setFilteredPatientsData] = useState([]);
  const [counselorNames, setCounselorNames] = useState({});
  const [show, setShow] = useState();
  const [selectedPatientUID, setSelectedPatientUID] = useState(null);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [selectedIntakeFormsData, setSelectedIntakeFormsData] = useState([
    null,
  ]);
  const [showPatientInfo, setShowPatientInfo] = useState(false);

  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(firestore, "Users"),
            where("counselorID", "!=", null)
          )
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

  const handleSelectPatient = (UID) => {
    setSelectedPatientUID(UID);
    setShowPatientInfo(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = async (UID) => {
    console.log("Selected Patient UID:", UID);

    try {
      // Query the collection to find the document with the matching UID
      const querySnapshot = await getDocs(collection(firestore, "Users"));
      console.log("Query Snapshot:", querySnapshot.docs);

      const matchingDocument = querySnapshot.docs.find(
        (doc) => doc.data().UID === UID
      );

      if (matchingDocument) {
        const patientData = matchingDocument.data();
        console.log("Selected Patient Data:", patientData);

        // Fetch additional data from the "IntakeForms" collection
        const intakeFormsQuerySnapshot = await getDocs(
          query(collection(firestore, "IntakeForms"), where("UID", "==", UID))
        );
        const intakeFormsData = intakeFormsQuerySnapshot.docs.map((doc) =>
          doc.data()
        );

        console.log("Intake Forms Data:", intakeFormsData);

        // Set the patient data and intake forms data to state
        setSelectedPatientData(patientData);
        setSelectedIntakeFormsData(intakeFormsData);

        setShow(true);
      } else {
        console.log("Patient document does not exist");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };
  //!Show Chat
  const [showChat, setShowChat] = useState(false);
  //!Table style
  const tableStyle = {
    height: "650px", // Set the desired height
    width: "342px",
    overflow: "hidden", // Add scrollbars when content overflows
  };

  const handleSetShowChat = () => setShowChat(true);

  return (
    <div
      className="container-lg d-flex justify-content-center rounded-5 mt-5 ms-5 pb-3"
      id="ChatForm"
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col d-flex align-items-center d-flex justify-content-center ms-5 ps-5">
            <h1 className="mt-2 ms-5 ps-5">Chat</h1>
          </div>
          <div className="col-3 col-sm-3 mb-3">
            <div className="input-group mt-4">
              <input
                type="text"
                placeholder="Search Patients Name:"
                value={searchQuery}
                onChange={handleSearch}
                aria-describedby="search"
                className="w-25 form-control"
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="flex-grow-1">
            <div className="row">
              <div
                className="col-3 table-responsive"
                style={{ overflow: "hidden" }}
              >
                <table
                  className="table table-borderless table-hover table-dark rounded-3"
                  style={tableStyle}
                >
                  <thead>
                    <tr>
                      <th scope="col">Inbox</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatientsData.map((patient) => (
                      <tr key={patient.UID}>
                        <td>
                          <button
                            className="d-flex justify-content-start align-items-center"
                            onClick={handleSetShowChat}
                            style={{
                              border: "none",
                              background: "none",
                              color: "white",
                              width: "334px",
                            }}
                            // Pass the patient's UID
                          >
                            {patient.ProfPic ? (
                              <img
                                src={fetchImageUrl(patient.ProfPic)}
                                alt={patient.firstName}
                                width="100"
                                height="100"
                              />
                            ) : (
                              <img
                                src="https://firebasestorage.googleapis.com/v0/b/lunan-75e15.appspot.com/o/user_profile_pictures%2F4WWRyPzPJH2ipbcK1npZ?alt=media&token=72e0fdf1-18e1-4065-bc70-2ebc18166aa1"
                                alt={patient.firstName}
                                width="100"
                                height="100"
                              />
                            )}
                            <p
                              className="ms-3 text-break text-wrap fs-5"
                              style={{ width: "" }}
                            >
                              {patient.firstName}
                            </p>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                className="col rounded-end-3"
                style={{
                  backgroundColor: "#212529",
                  height: "650px",
                  color: "black",
                }}
              >
                <div
                  className="container-fluid mt-4 me-4 mb-4 rounded-3"
                  style={{
                    backgroundColor: "#4d455d",
                    height: "600px",
                    width: "1014px",
                  }}
                >
                  <div>
                    <span className="fs-1 ms-3 " style={{ color: "#f5e9cf" }}>
                      Ryan Amador
                    </span>
                    <button style={{ marginLeft: "650px" }}>Call</button>
                  </div>
                  <ChatMessage />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//! CHAT
const ChatMessage = () => {
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app mt-2">
      <div className="messages" style={{ color: "#f5e9cf" }}>
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          style={{ color: "#f5e9cf" }}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

//TWILIO
// export const Chat = () => {
//   return (
//     <div
//       className="container-lg d-flex justify-content-center rounded-5 mt-5 ms-5 pb-3"
//       id="ChatForm"
//     >
//       <Box className="container-lg d-flex justify-content-center rounded-5 mt-5 ms-5 pb-3">
//         <Provider store={store}>
//           <Theme.Provider theme="twilio">
//             <Box>
//               <App />
//             </Box>
//           </Theme.Provider>
//         </Provider>
//       </Box>
//     </div>
//   );
// };

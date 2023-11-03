import React, { useState, useEffect, useRef } from "react";
import { firestore } from "../../firebase/firebase-config";
import "../../css/Chat.css";
import { db, auth } from "../../firebase/firebase-config";
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

export const CounselorChat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patientsData, setPatientsData] = useState([]);
  const [filteredPatientsData, setFilteredPatientsData] = useState([]);
  const [counselorNames, setCounselorNames] = useState({});
  const [show, setShow] = useState();
  const [room, setRoom] = useState(); // Manage the room state in the Chat component
  const [selectedPatientUID, setSelectedPatientUID] = useState(null);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [selectedIntakeFormsData, setSelectedIntakeFormsData] = useState([
    null,
  ]);
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [showChat, setShowChat] = useState(false);

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

  const handleClose = () => setShow(false);

  const handleSetShowChat = () => setShowChat(true);

  //!Table style
  const tableStyle = {
    height: "650px", // Set the desired height
    width: "342px",
    overflow: "hidden", // Add scrollbars when content overflows
  };

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
                            onClick={() => handleSelectPatient(patient.UID)} // Use handleSelectPatient with the UID
                            style={{
                              border: "none",
                              background: "none",
                              color: "white",
                              width: "334px",
                            }}
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
                      {selectedPatientData
                        ? selectedPatientData.firstName
                        : "Selected User's First Name"}
                    </span>
                    <button style={{ marginLeft: "650px" }}>Call</button>
                  </div>
                  {room && <ChatMessage room={room} />}
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
const ChatMessage = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const messageContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
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
  }, [room]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;

    // Retrieve the user's first name from the 'Users' collection based on their UID
    const userFirstName = await getUserFirstName(auth.currentUser.uid);

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: userFirstName,
      room,
    });

    setNewMessage("");
  };

  // Function to get user's first name based on UID from the 'Users' collection
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

  return (
    <div className="chat-app mt-2">
      <div
        className="messages"
        style={{ color: "#f5e9cf", overflowY: "auto" }}
        ref={messageContainerRef}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.user === auth.currentUser.email ? "sent" : "received"
            }`}
          >
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

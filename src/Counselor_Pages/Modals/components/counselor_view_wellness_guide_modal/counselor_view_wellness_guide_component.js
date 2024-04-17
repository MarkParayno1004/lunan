import * as React from "react";
import {
  getFirestore,
  query,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Box, Modal, Typography } from "@mui/material";
import Swal from "sweetalert2";

export default function CounselorViewWellnessGuide(props) {
  const [selectedVideoIndex, setSelectedVideoIndex] = React.useState(null);
  const [guideData, setGuideData] = React.useState([]);
  const [openAddGuide, setOpenAddGuide] = React.useState(false);

  const fetchGuideData = async () => {
    const db = getFirestore();
    const q = query(collection(db, "Guide"));

    try {
      const querySnapshot = await getDocs(q);
      const guides = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        guides.push(data);
      });
      setGuideData(guides);
    } catch (error) {
      console.error("Error fetching guide data: ", error);
    }
  };

  React.useEffect(() => {
    if (props.selectedPatientUID) {
      fetchGuideData();
    }
  }, [props.selectedPatientUID]);

  const handleVideoClick = (index) => {
    setSelectedVideoIndex(index === selectedVideoIndex ? null : index);
  };

  const handleSubmit = () => {
    Swal.fire({
      background: "#1DC07C",
      color: "#ffffff",
      position: "center",
      icon: "success",
      title: "Guide Added Successfully!",
      showConfirmButton: false,
      timer: 2000,
    });
    setOpenAddGuide(!openAddGuide);
  };

  return (
    <div className="grid justify-items-stretch">
      <table className="w-full text-sm text-center h-full table-auto border border-slate-500">
        <thead className="bg-primaryGreen">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-ss-lg">
              Title:
            </th>
            <th scope="col" className="px-6 py-3 rounded-se-lg">
              View Video
            </th>
          </tr>
        </thead>
        <tbody>
          {guideData
            .filter((guide) => guide.PatientUID === props.selectedPatientUID)
            .map((guide, index) => (
              <tr key={index}>
                <td className="p-2 border border-slate-600">{guide.Title}</td>
                <td className="p-2 border border-slate-600">
                  <button
                    className="p-2 bg-orange-200 rounded-lg font-semibold"
                    onClick={() => handleVideoClick(index)}
                  >
                    View Video
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="justify-self-end mt-2">
        <button
          className="bg-orange-200 p-2 rounded-lg text-sm font-semibold"
          onClick={() => setOpenAddGuide(!openAddGuide)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 inline-block pe-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
          Add Guide
        </button>
        <AddGuide
          show={openAddGuide}
          handleClose={() => setOpenAddGuide(!openAddGuide)}
          handleSubmit={handleSubmit}
          selectedPatientUID={props.selectedPatientUID}
        />
      </div>
      {selectedVideoIndex !== null && (
        <VideoPlayer
          show={true}
          handleClose={() => setSelectedVideoIndex(null)}
          guide={guideData[selectedVideoIndex]}
        />
      )}
    </div>
  );
}

const VideoPlayer = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.guide.Title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <iframe
              src={props.guide.Link}
              title={props.guide.Title}
              className="w-full h-60"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ border: "none" }}
            ></iframe>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

const AddGuide = (props) => {
  const [title, setTitle] = React.useState("");
  const [vidLink, setVidLink] = React.useState("");

  const handleGuideChange = (e) => {
    setTitle(e.target.value);
  };

  const handleLinkChange = (e) => {
    setVidLink(e.target.value);
  };

  function extractSrcFromIframe(iframeString) {
    // Use regular expressions to extract the src attribute
    const srcRegex = /src=["'](https:\/\/www\.youtube\.com\/embed\/[^"']+)/;
    const match = iframeString.match(srcRegex);
    return match ? match[1] : ""; // Return the extracted src or an empty string if not found
  }
  const handleAddGuide = () => {
    const db = getFirestore();
    const { currentUser } = getAuth();
    console.log("currentUser:", currentUser.uid);
    console.log("selectedPatientUID:", props.selectedPatientUID);

    if (currentUser && props.selectedPatientUID) {
      const guideData = {
        Title: title,
        Link: extractSrcFromIframe(vidLink),
        dateAdded: new Date().toISOString().split("T")[0],
        counselorUID: currentUser.uid,
        PatientUID: props.selectedPatientUID,
      };

      console.log("PatientUID:", props.selectedPatientUID);
      console.log("counselorUID:", currentUser.uid);

      addDoc(collection(db, "Guide"), guideData)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          // Perform any other actions after successful upload
          props.handleClose();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      console.error("currentUser or selectedPatientUID is undefined.");
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Publish A Guide
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div class="input-group mb-3 mt-3">
              <h5>Input Title:</h5>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  aria-label="VideoTitle"
                  aria-describedby="basic-addon1"
                  onChange={handleGuideChange}
                  value={title}
                  required
                />
              </div>
              <h5>Input Video Link:</h5>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  aria-label="VideoLink"
                  aria-describedby="basic-addon1"
                  onChange={handleLinkChange}
                  value={vidLink}
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="p-3 bg-orange-200 rounded-lg"
                onClick={handleAddGuide}
              >
                Submit
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Modal, Pagination } from "react-bootstrap";
import {
  collection,
  getDocs,
  query,
  getFirestore,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

//!Main App Render
export const ViewWellnessGuide = (props) => {
  const [show, setShow] = useState(false);
  const [guideData, setGuideData] = useState([]);
  const handleClose = () => setShow(false);
  const handleShowAddGuide = () => setShow(true);
  const handleSubmit = () => {
    Swal.fire({
      background: "#4d455d",
      color: "#f5e9cf",
      position: "center",
      icon: "success",
      title: "Guide Added Successfully!",
      showConfirmButton: false,
      timer: 2000,
    });
    setShow(false);
  };

  const showAddGuideButton = props.selectedPatientUID !== null;

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

  useEffect(() => {
    if (props.selectedPatientUID) {
      fetchGuideData();
    }
  }, [props.selectedPatientUID]);

  //!Pagination
  const itemsPerPage = 5; // Number of items to display per page
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleNextPage = () => {
    if (activePage < Math.ceil(guideData.length / itemsPerPage)) {
      setActivePage(activePage + 1);
    }
  };

  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = guideData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (
    let number = 1;
    number <= Math.ceil(guideData.length / itemsPerPage);
    number++
  ) {
    pageNumbers.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Modal
      size="xl"
      show={props.show}
      onHide={props.handleClose}
      style={{ overflowY: "hidden" }}
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>View Wellness Guide:</Modal.Title>
        </Modal.Header>
        <div className="d-flex justify-content-center mt-2 custom-scroll-wellness">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">Wellness Video:</th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Title:
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems
                .filter(
                  (guide) => guide.PatientUID === props.selectedPatientUID
                )
                .map((guide, index) => (
                  <tr key={index}>
                    <td>
                      <iframe
                        src={guide.Link}
                        title={guide.Title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        style={{ width: "400px" }}
                      ></iframe>
                    </td>
                    <th style={{ textAlign: "center", width: "300px" }}>
                      {guide.Title}
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Modal.Footer className="d-flex justify-content-between align-items-center">
          <div>
            <Pagination>
              <Pagination.Prev
                onClick={handlePrevPage}
                disabled={activePage === 1}
              />
              {pageNumbers}
              <Pagination.Next
                onClick={handleNextPage}
                disabled={
                  activePage === Math.ceil(guideData.length / itemsPerPage)
                }
              />
            </Pagination>
          </div>

          {showAddGuideButton && (
            <button
              className="btn"
              style={{ backgroundColor: "#f5e9cf" }}
              onClick={() => handleShowAddGuide(props.selectedPatientUID)}
            >
              Add Guide
            </button>
          )}
        </Modal.Footer>
      </Modal.Body>

      <AddGuide
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        selectedPatientUID={props.selectedPatientUID}
      />
    </Modal>
  );
};

//!Excess Modal

const AddGuide = (props) => {
  const [guide, setGuide] = useState("");
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [vidLink, setVidLink] = useState("");

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

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Publish A Guide</Modal.Title>
        </Modal.Header>
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
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf" }}
            onClick={handleAddGuide}
          >
            Submit
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

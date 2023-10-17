import React from "react";
import { useState } from "react";
import { Modal, Pagination } from "react-bootstrap";
import {
  collection,
  getDocs,
  query,
  where,
  getFirestore,
} from "firebase/firestore";
export const ViewWellnessGuide = (props) => {
  const [guideData, setGuideData] = useState([]);

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

  //!Table Style
  const tableStyle = {
    height: "700px", // Set the desired height
    overflow: "auto", // Add scrollbars when content overflows
  };
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
          <table className="table table-dark table-hover" style={tableStyle}>
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
        <Modal.Footer className="d-flex justify-content-center mt-2">
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
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

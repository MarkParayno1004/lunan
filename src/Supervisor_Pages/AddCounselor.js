import React, { useState } from "react";
import "../css/AddCounselor.css";

export const AddCounselor = () => {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleAddCounselor = (newCounselor) => {
    // Logic to add the counselor to the system
    console.log("Adding counselor:", newCounselor);
    // Add your implementation here
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCounselor = {
      name,
      picture,
      contactNumber,
      email,
    };

    handleAddCounselor(newCounselor);

    setName("");
    setPicture("");
    setContactNumber("");
    setEmail("");
  };

  return (
    <div className="container-fluid d-flex justify-content-center" id="addBG">
      <div
        className="container-lg mt-3 mb-3 rounded-4 fw-normal d-flex justify-content-center"
        id="cardAllPatientBG"
      >
        <div>
          <h1 className="d-flex justify-content-center mt-3">Add Counselor</h1>
          <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="counselor-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Picture URL:</label>
                <input
                  type="file"
                  value={picture}
                  onChange={(e) => setPicture(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Number:</label>
                <input
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="add-counselor-button">
                Add Counselor
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

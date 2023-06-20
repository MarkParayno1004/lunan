import React, { useState } from 'react';
import "../css/Profile.css"

export const SupervisorProfile = () => {
    const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [contactPerson, setContactPerson] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleContactPersonChange = (event) => {
    setContactPerson(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can perform any necessary logic with the updated profile data
    // such as sending an API request to update the user's information.
    console.log('Updated profile:', { name, number, email, contactPerson });
  };

  return (
    <div>
        <div className="container-lg mt-5 pb-5 pt-3 pb-4 ps-4 pe-3 rounded-4 fw-normal d-flex justify-content-center" id="Profile">
            <div className="container-fluid">
                <div className="rounded-5 mt-4 ms-3 me-3 pt-3 pb-3 ps-3 pe-3" id="ProfileBG">
                    <h1 className="fw-light">Supervisor Profile</h1>
                            <div className="form-check">
                                <label htmlFor="name" className="form-check-label ms-1 fs-5 mt-3 mb-1">Change Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control rounded-4 me-1"
                                    value={name}
                                    onChange={handleNameChange}
                                    style={{ width: "40rem" }}
                                />
                                <label htmlFor="number" className="form-check-label ms-1 fs-5 mt-3 mb-1">Change Number:</label>
                                <input
                                    type="text"
                                    id="number"
                                    className="form-control rounded-4 me-1"
                                    value={number}
                                    onChange={handleNumberChange}
                                    style={{ width: "40rem" }}
                                />
                                <label htmlFor="email" className="form-check-label ms-1 fs-5 mt-3 mb-1">Change Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control rounded-4 me-1"
                                    value={email}
                                    onChange={handleEmailChange}
                                    style={{ width: "40rem" }}
                                />
                                <label htmlFor="contactPerson" className="form-check-label ms-1 fs-5 mt-3 mb-1">Change Contact Person:</label>
                                <input
                                    type="text"
                                    id="contactPerson"
                                    className="form-control rounded-4 me-1"
                                    value={contactPerson}
                                    onChange={handleContactPersonChange}
                                    style={{ width: "40rem" }}
                                />
                            </div>
                        <button 
                            type="submit"
                            className="btn nav-link fs-5 mt-4 me-3 mb-2 rounded-4"
                            id="buttonCard"
                        >
                            Save
                        </button>
                </div>
            </div>
        </div>
    </div>
  );
}
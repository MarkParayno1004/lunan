import { useState, useEffect } from "react";

export const CardTwo = ({ ButtonBack, ButtonNext, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    StreetNum: "",
    Barangay: "",
    City: "",
    Region: "",
    Zip: "",
    HomePhone: "",
    CellPhone: "",
    Email: "",
  });

  useEffect(() => {
    setLocalFormData(
      formData ?? {
        StreetNum: "",
        Barangay: "",
        City: "",
        Region: "",
        Zip: "",
        HomePhone: "",
        CellPhone: "",
        Email: "",
      }
    );
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = (event) => {
    event.preventDefault();
    console.log(localFormData); // Log form data
    ButtonNext(localFormData); // Call the ButtonNext function with form data
  };

  return (
    <div>
      <form onSubmit={handleNext}>
        <div className="container-fluid d-flex justify-content-center ">
          <div className="card" style={{ width: "60rem" }}>
            <div className="card-header">
              Please fill up this intake form: (This form will be your Sign Up
              form or Register Form)
            </div>
            <ul className="list-group list-group-flush">
              {/* Input Patient's Local Address */}
              <li className="list-group-item">
                <p>Current Address:</p>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control rounded-4 me-1"
                    name="StreetNum"
                    placeholder="Street and Number:"
                    pattern="^[a-zA-Z0-9 ]+$"
                    value={localFormData.StreetNum}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control rounded-4 me-1"
                    name="Barangay"
                    placeholder="Barangay:"
                    pattern="^[a-zA-Z0-9 ]+$"
                    value={localFormData.Barangay}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control rounded-4"
                    name="City"
                    placeholder="City:"
                    pattern="^[a-zA-Z0-9 ]+$"
                    value={localFormData.City}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control rounded-4 mt-2 me-1"
                    name="Region"
                    placeholder="Region:"
                    pattern="^[a-zA-Z0-9 ]+$"
                    value={localFormData.Region}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="number"
                    className="form-control rounded-4 mt-2"
                    name="Zip"
                    placeholder="Zip:"
                    value={localFormData.Zip}
                    onChange={handleInputChange}
                    min="0"
                    oninput="validity.valid||(value='');"
                    required
                  />
                </div>
              </li>

              {/* Home Phone , Cell Phone, Email and Checkboxes*/}
              {/* Home Phone*/}
              <li className="list-group-item">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control  rounded-4 me-1"
                    name="HomePhone"
                    placeholder="Home Phone Number:"
                    value={localFormData.HomePhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Cell Phone Number */}
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control  rounded-4 me-1 mt-2"
                    name="CellPhone"
                    placeholder="Cell Phone Number:"
                    value={localFormData.CellPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="input-group mt-2">
                  <input
                    type="text"
                    className="form-control  rounded-4 me-1"
                    name="Email"
                    placeholder="Email:"
                    pattern="^[a-zA-Z0-9@. -_]+$"
                    value={localFormData.Email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="d-flex justify-content-end"
          style={{
            paddingRight: 25 + "px",
            paddingTop: 10 + "px",
            paddingBottom: 5 + "px",
          }}
        >
          <button
            className="btn nav-link fs-5 rounded-4 me-3"
            id="buttonCard"
            onClick={ButtonBack}
          >
            Back
          </button>
          <button className="btn nav-link fs-5  rounded-4" id="buttonCard">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

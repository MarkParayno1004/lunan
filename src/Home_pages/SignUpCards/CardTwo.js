import { useState } from "react";
export const CardTwo = ({ ButtonBack, ButtonNext }) => {
  //!Get Patient's Address
  const [getStreetNum, setStreeNum] = useState("");
  const handleStreetNum = (e) => {
    setStreeNum(e.target.value);
  };

  const [getBarangay, setBarangay] = useState("");
  const handleBarangay = (e) => {
    setBarangay(e.target.value);
  };

  const [getCity, setCity] = useState("");
  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const [getRegion, setRegion] = useState("");
  const handleRegion = (e) => {
    setRegion(e.target.value);
  };

  const [getZip, setZip] = useState("");
  const handleZip = (e) => {
    setZip(e.target.value);
  };

  //!Patient Current Number and Verification of checkboxes
  const [getHomePhone, setHomePhone] = useState();
  const handleHomePhone = (e) => {
    setHomePhone(e.target.value);
  };

  const [getCellPhone, setCellPhone] = useState();
  const handleCellPhone = (e) => {
    setCellPhone(e.target.value);
  };

  const [getEmail, setEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const [checkMessageHome, setgetMessageHome] = useState("");
  const handleMessageHome = (e) => {
    setgetMessageHome(e.target.value);
  };

  const [checkMessageCell, setMessageCell] = useState("");
  const handleMessageCell = (e) => {
    setMessageCell(e.target.value);
  };

  const [checkEmail, setMessageEmail] = useState("");
  const handleMessageEmail = (e) => {
    setMessageEmail(e.target.value);
  };
  return (
    <div>
      <div className="container-fluid d-flex justify-content-center mt-3">
        <div class="card" style={{ width: 50 + "rem" }}>
          <div class="card-header">
            Please fill up this intake form: (This form will be your Sign Up
            form or Register Form)
          </div>
          <ul class="list-group list-group-flush">
            {/* Input Patient's Local Address */}
            <li class="list-group-item">
              <p>Current Address:</p>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control rounded-4 me-1"
                  placeholder="Street and Number:"
                  onChange={handleStreetNum}
                />
                <input
                  type="text"
                  class="form-control rounded-4 me-1"
                  placeholder="Barangay:"
                  onChange={handleBarangay}
                />
                <input
                  type="text"
                  class="form-control rounded-4"
                  placeholder="City:"
                  onChange={handleCity}
                />
              </div>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control rounded-4 mt-2 me-1"
                  placeholder="Region:"
                  onChange={handleRegion}
                />
                <input
                  type="number"
                  class="form-control rounded-4 mt-2"
                  placeholder="Zip:"
                  onChange={handleZip}
                />
              </div>
            </li>

            {/* Home Phone , Cell Phone, Email and Checkboxes*/}
            {/* Home Phone*/}
            <li class="list-group-item">
              <div class="input-group">
                <input
                  type="number"
                  class="form-control  rounded-4 me-1"
                  placeholder="Home Phone Number:"
                  onChange={handleHomePhone}
                />
                <div class="form-check-inline">
                  <span>May I leave a message?:</span>
                  <input
                    class="form-check-input ms-2  "
                    type="radio"
                    name="Approval"
                    value="Yes"
                    onChange={handleMessageHome}
                  />
                  <label class="form-check-label ms-1">Yes</label>
                  <input
                    class="form-check-input ms-2  "
                    type="radio"
                    name="Approval"
                    value="No"
                    onChange={handleMessageHome}
                  />
                  <label class="form-check-label ms-1">No</label>
                </div>
              </div>

              {/* Cell Phone Number */}
              <div class="input-group">
                <input
                  type="number"
                  class="form-control  rounded-4 me-1 mt-2"
                  placeholder="Cell Phone Number:"
                  onChange={handleCellPhone}
                />
                <div class="form-check-inline mt-2">
                  <span>May I leave a message?:</span>
                  <input
                    class="form-check-input ms-2  "
                    type="radio"
                    name="Approval"
                    value="Yes"
                    onChange={handleMessageCell}
                  />
                  <label class="form-check-label ms-1">Yes</label>
                  <input
                    class="form-check-input ms-2  "
                    type="radio"
                    name="Approval"
                    value="No"
                    onChange={handleMessageCell}
                  />
                  <label class="form-check-label ms-1">No</label>
                </div>
              </div>

              {/* Email */}
              <div class="input-group mt-2">
                <input
                  type="text"
                  class="form-control  rounded-4 me-1"
                  placeholder="Email:"
                  onChange={handleEmail}
                />
                <div class="form-check-inline ms-5 align-items-start">
                  <span>May I email you?:</span>
                  <input
                    class="form-check-input ms-2  "
                    type="radio"
                    name="Approval"
                    value="Yes"
                    onChange={handleMessageEmail}
                  />
                  <label class="form-check-label ms-1">Yes</label>
                  <input
                    class="form-check-input ms-2  "
                    type="radio"
                    name="Approval"
                    value="No"
                    onChange={handleMessageEmail}
                  />
                  <label class="form-check-label ms-1">No</label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
          id="buttonCard"
          onClick={ButtonBack}
        >
          Back
        </button>
        <button
          className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
          id="buttonCard"
          onClick={ButtonNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

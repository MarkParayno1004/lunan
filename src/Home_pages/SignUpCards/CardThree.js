import { useState, useEffect } from "react";

export const CardThree = ({ ButtonBack, ButtonNext, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    CPFname: "",
    Rel: "",
    CPNum: "",
    DocFname: "",
    DocNum: "",
    CommLearn: "",
    CommAssess:"",
  });
  useEffect(() => {
    setLocalFormData(
      formData ?? {
    CPFname: "",
    Rel: "",
    CPNum: "",
    DocFname: "",
    DocNum: "",
    CommLearn: "",
    CommAssess:"",
      }
    );
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleNext = () => {
    console.log(localFormData); // Log form data
    ButtonNext(localFormData); // Call the ButtonNext function with form data
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
              {/* Person to contact if emergency */}
              <p class="mt-3">Person to contact in case of an emergency:</p>
              <div class="input-group">
                <input
                  type="text"
                  aria-label="EmergencyFullName"
                  placeholder="Full Name:"
                  name = "CPFname"
                  class="form-control me-3 rounded-4"
                  value = {localFormData.CPFname}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  aria-label="Relationship"
                  placeholder="Relationship to client"
                  name="Rel"
                  class="form-control me-3 rounded-4"
                  value = {localFormData.Rel}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  aria-label="Phone"
                  placeholder="Phone Number:"
                  name = "CPNum"
                  value = {localFormData.CPNum}
                  class="form-control rounded-4"
                  onChange={handleInputChange}
                />
              </div>
            </li>

            {/* Doctor Info */}
            <li class="list-group-item">
              <p class="mt-3">Patient Care doctor:</p>
              <div class="input-group mt-3">
                <input
                  type="text"
                  aria-label="DoctorFullName"
                  placeholder="Full Name:"
                  name = "DocFname"
                  value = {localFormData.DocFname}
                  class="form-control me-3 rounded-4"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  aria-label="DoctorPhone"
                  placeholder="Phone Number:"
                  name = "DocNum"
                  value = {localFormData.DocNum}
                  class="form-control me-3 rounded-4"
                  onChange={handleInputChange}
                />
              </div>
              <p class="mt-3">How did you learn about me? :</p>
              <div class="form-floating ">
                <textarea
                  class="form-control"
                  name = "CommLearn"
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                  value = {localFormData.CommLearn}
                  onChange={handleInputChange}
                ></textarea>
                <label for="floatingTextarea">Comments</label>
              </div>
              <p class="mt-3">
                What prompted you to seek therapy or an assessment? :
              </p>
              <div class="form-floating ">
                <textarea
                  class="form-control"
                  name = "CommAssess"
                  placeholder="Leave a comment here"
                  value = {localFormData.CommAssess}
                  id="floatingTextarea"
                  onChange={handleInputChange}
                ></textarea>
                <label for="floatingTextarea">Comments</label>
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
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

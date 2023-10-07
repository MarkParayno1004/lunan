import { useState, useEffect } from "react";

export const CardThree = ({ ButtonBack, ButtonNext, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    CPFname: "",
    Rel: "",
    CPNum: "",
    DocFname: "",
    DocNum: "",
    CommLearn: "",
    CommAssess: "",
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
        CommAssess: "",
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
        <div className="container-fluid d-flex justify-content-center">
          <div className="card" style={{ width: 60 + "rem" }}>
            <div className="card-header">
              Please fill up this intake form: (This form will be your Sign Up
              form or Register Form)
            </div>
            <ul className="list-group list-group-flush">
              {/* Input Patient's Local Address */}
              <li className="list-group-item">
                {/* Person to contact if emergency */}
                <p className="mt-3">
                  Person to contact in case of an emergency:
                </p>
                <div className="input-group">
                  <input
                    type="text"
                    aria-label="EmergencyFullName"
                    placeholder="Full Name:"
                    pattern="^[a-zA-Z0-9]+$"
                    name="CPFname"
                    className="form-control me-3 rounded-4"
                    value={localFormData.CPFname}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    aria-label="Relationship"
                    placeholder="Relationship to client"
                    pattern="^[a-zA-Z0-9]+$"
                    name="Rel"
                    className="form-control me-3 rounded-4"
                    value={localFormData.Rel}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    aria-label="Phone"
                    placeholder="Phone Number:"
                    pattern="^[a-zA-Z0-9]+$"
                    name="CPNum"
                    value={localFormData.CPNum}
                    className="form-control rounded-4"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </li>

              {/* Doctor Info */}
              <li className="list-group-item">
                <p className="mt-3">Patient Care doctor:</p>
                <div className="input-group mt-3">
                  <input
                    type="text"
                    aria-label="DoctorFullName"
                    placeholder="Full Name:"
                    pattern="^[a-zA-Z0-9]+$"
                    name="DocFname"
                    value={localFormData.DocFname}
                    className="form-control me-3 rounded-4"
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    aria-label="DoctorPhone"
                    placeholder="Phone Number:"
                    pattern="^[a-zA-Z0-9]+$"
                    name="DocNum"
                    value={localFormData.DocNum}
                    className="form-control me-3 rounded-4"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <p className="mt-3">How did you learn about me? :</p>
                <div className="form-floating ">
                  <textarea
                    className="form-control"
                    name="CommLearn"
                    placeholder="Leave a comment here"
                    pattern="^[a-zA-Z0-9]+$"
                    id="floatingTextarea"
                    value={localFormData.CommLearn}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  <label for="floatingTextarea">Comments</label>
                </div>
                <p className="mt-3">
                  What prompted you to seek therapy or an assessment? :
                </p>
                <div className="form-floating ">
                  <textarea
                    className="form-control"
                    name="CommAssess"
                    placeholder="Leave a comment here"
                    pattern="^[a-zA-Z0-9]+$"
                    value={localFormData.CommAssess}
                    id="floatingTextarea"
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  <label for="floatingTextarea">Comments</label>
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

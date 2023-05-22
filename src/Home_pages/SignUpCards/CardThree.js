import { useState } from "react";
export const CardThree = ({ ButtonBack, ButtonNext }) => {
  const [getContactPersonFname, setContactPersonFname] = useState("");
  const handleContactPersonFname = (e) => {
    setContactPersonFname(e.target.value);
  };

  const [getRelationship, setRelationship] = useState("");
  const handleRelationship = (e) => {
    setRelationship(e.target.value);
  };

  const [getContactPersonNum, setContactPersonNum] = useState();
  const handleContactPersonNum = (e) => {
    setContactPersonNum(e.target.value);
  };

  //!Patient's Care Doctor Full Name and Phone Number
  const [getDoctorFName, setDoctorFname] = useState("");
  const handleDoctorFname = (e) => {
    setDoctorFname(e.target.value);
  };

  const [getDoctorNum, setDoctorNum] = useState();
  const handleDoctorNum = (e) => {
    setDoctorNum(e.target.value);
  };

  //!Patient's Comment
  const [getCommentLearn, setCommentLearn] = useState("");
  const handlesetCommentLearn = (e) => {
    setCommentLearn(e.target.value);
  };

  const [getCommentAssessment, setCommentAssessment] = useState("");
  const handlesetCommentAssessment = (e) => {
    setCommentAssessment(e.target.value);
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
                  class="form-control me-3 rounded-4"
                  onChange={handleContactPersonFname}
                />
                <input
                  type="text"
                  aria-label="Relationship"
                  placeholder="Relationship to client"
                  class="form-control me-3 rounded-4"
                  onChange={handleRelationship}
                />
                <input
                  type="text"
                  aria-label="Phone"
                  placeholder="Phone Number:"
                  class="form-control rounded-4"
                  onChange={handleContactPersonNum}
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
                  class="form-control me-3 rounded-4"
                  onChange={handleDoctorFname}
                />
                <input
                  type="text"
                  aria-label="DoctorPhone"
                  placeholder="Phone Number:"
                  class="form-control me-3 rounded-4"
                  onChange={handleDoctorNum}
                />
              </div>
              <p class="mt-3">How did you learn about me? :</p>
              <div class="form-floating ">
                <textarea
                  class="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                  onChange={handlesetCommentLearn}
                ></textarea>
                <label for="floatingTextarea">Comments</label>
              </div>
              <p class="mt-3">
                What prompted you to seek therapy or an assessment? :
              </p>
              <div class="form-floating ">
                <textarea
                  class="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                  onChange={handlesetCommentAssessment}
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
          onClick={ButtonNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
export const CardOne = ({
  ButtonNext,
  ButtonBack,
  handleInputChange,
  formData,
}) => {
  const [localFormData, setLocalFormData] = useState({
    Fname: "",
    Age: "",
    DateToday: new Date().toISOString().split("T")[0],
    BirthDate: "",
    Gender: "",
    showSpecification: false,
  });

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const [showSpecification, setSpecification] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "BirthDate") {
      const birthDate = new Date(value);
      const today = new Date();
      const age = Math.floor(
        (today - birthDate) / (365.25 * 24 * 60 * 60 * 1000)
      );
      setLocalFormData((prevFormData) => ({
        ...prevFormData,
        Age: age.toString(),
        [name]: value,
      }));
    } else {
      setSpecification(value === "Other");
      setLocalFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleNext = () => {
    console.log(localFormData); // Log form data
    ButtonNext(localFormData); // Call the ButtonNext function with form data
  };

  return (
    <>
      <form onSubmit={handleNext}>
        <div className="container-fluid d-flex justify-content-center">
          <div className="card" style={{ width: "60rem" }}>
            <div className="card-header">
              Please fill up this intake form: (This form will be your Sign Up
              form or Register Form)
            </div>
            <ul className="list-group list-group-flush">
              {/* Input Patient's Full Name */}
              <li className="list-group-item">
                <div className="input-group">
                  <input
                    type="text"
                    name="Fname"
                    className="form-control rounded-4 me-1"
                    placeholder="Full Name:"
                    onChange={handleInputChange}
                    value={localFormData.Fname}
                    required
                  />
                  <input
                    type="number"
                    name="Age"
                    className="form-control rounded-4"
                    placeholder="Age:"
                    value={localFormData.Age}
                    readOnly
                  />
                </div>
              </li>

              {/* Input Date Today and Birth Date */}
              <li className="list-group-item">
                <p>Date today & your birth date:</p>
                <div className="input-group">
                  <input
                    type="hidden"
                    name="DateToday"
                    className="form-control rounded-4 me-1"
                    value={localFormData.DateToday}
                    readOnly
                  />
                  <input
                    type="date"
                    name="BirthDate"
                    className="form-control rounded-4"
                    onChange={handleChange}
                    value={localFormData.BirthDate}
                    required
                  />
                </div>
              </li>

              {/* Radio Button for Gender */}
              <li className="list-group-item">
                <div className="form-check-inline">
                  <p>Gender:</p>
                  <input
                    className="form-input"
                    type="radio"
                    name="Gender"
                    value="Male"
                    onChange={handleChange}
                    checked={localFormData.Gender === "Male"}
                    required
                  />
                  <label
                    className="form-check-label ms-1"
                    htmlFor="exampleRadios1"
                  >
                    Male
                  </label>
                </div>
                <div className="form-check-inline">
                  <input
                    className="form-input"
                    type="radio"
                    name="Gender"
                    value="Female"
                    onChange={handleChange}
                    checked={localFormData.Gender === "Female"}
                    required
                  />
                  <label
                    className="form-check-label ms-1"
                    htmlFor="exampleRadios1"
                  >
                    Female
                  </label>
                </div>
                <div className="form-check-inline">
                  <input
                    className="form-input"
                    type="radio"
                    name="Gender"
                    value="Transgender"
                    onChange={handleChange}
                    checked={localFormData.Gender === "Transgender"}
                  />
                  <label
                    className="form-check-label ms-1"
                    htmlFor="exampleRadios1"
                  >
                    Transgender
                  </label>
                </div>
                <div className="form-check-inline">
                  <input
                    className="form-input"
                    type="radio"
                    name="Gender"
                    value="Other"
                    onChange={handleChange}
                    checked={localFormData.Gender === "Other"}
                  />
                  <label
                    className="form-check-label ms-1"
                    htmlFor="exampleRadios1"
                  >
                    Other
                  </label>
                  {showSpecification && (
                    <Specification
                      setLocalFormData={setLocalFormData}
                      localFormData={localFormData}
                    />
                  )}
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
          <button className="nav-link fs-5 rounded-4 " id="buttonCard">
            Next
          </button>
        </div>
      </form>
    </>
  );
};

//! if patient chooses others, in the Gender category
const Specification = ({ setLocalFormData, localFormData }) => {
  // Store the answer
  const [getOtherSpecification, setOtherSpecification] = useState("");

  const handleOtherSpecification = (e) => {
    const { name, value } = e.target;
    setOtherSpecification(value);
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="input-group">
        <span className="me-2 d-flex align-items-center">Please specify:</span>
        <input
          type="text"
          value={localFormData}
          onChange={handleOtherSpecification}
          className="form-control rounded-4 me-1"
          required
        />
      </div>
    </>
  );
};

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
  });

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

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
      <div className="container-fluid d-flex justify-content-center mt-3">
        <div className="card" style={{ width: "50rem" }}>
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
                  type="date"
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
              </div>
            </li>
          </ul>
        </div>
      </div>
      <button
        className="nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
        id="buttonCard"
        onClick={handleNext}
      >
        Next
      </button>
    </>
  );
};

import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
export const CardOne = ({ ButtonNext, handleInputChange, formData }) => {
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

  const handleDateAccept = (date) => {
    console.log("BirthDate:", date); // Log the selected date
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const today = dayjs(); // Use dayjs for today as well
    const age = Math.floor(today.diff(date, "year")); // Calculate age using dayjs

    setLocalFormData((prevFormData) => ({
      ...prevFormData,
      Age: age.toString(), // Update the Age value
      BirthDate: formattedDate,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "BirthDate") {
      console.log("BirthDate:", value);
      const birthDate = new Date(value);
      const today = new Date();
      const age = Math.floor(
        (today - birthDate) / (365.25 * 24 * 60 * 60 * 1000)
      );

      setLocalFormData((prevFormData) => ({
        ...prevFormData,
        Age: age.toString(), // Update the Age value
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

  const handleNext = (event) => {
    event.preventDefault();
    ButtonNext(localFormData);
  };

  return (
    <div>
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
                    pattern="^[a-zA-Z0-9 ]+$"
                    onChange={handleInputChange}
                    value={localFormData.Fname}
                    required
                  />
                  <input
                    type="number"
                    name="Age"
                    className="form-control rounded-4"
                    placeholder="Age:"
                    pattern="^[a-zA-Z0-9 ]+$"
                    value={localFormData.Age}
                    readOnly
                  />
                </div>
              </li>

              {/* Input Date Today and Birth Date */}
              <li className="list-group-item">
                <div className="input-group d-flex align-items-center">
                  <label className="me-3">Date today & your birth date:</label>
                  <input
                    type="hidden"
                    name="DateToday"
                    className="form-control rounded-4 me-1"
                    value={localFormData.DateToday}
                    readOnly
                  />
                  <div className="d-inline-flex">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="BirthDate"
                        className="form-control rounded-4"
                        onChange={handleDateAccept}
                        value={localFormData.BirthDate || null}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </li>

              {/* Radio Button for Gender */}
              <li className="list-group-item">
                <div className="form-check-inline d-flex align-items-center">
                  <label className="">Gender:</label>
                  <div className="d-inline-flex d-flex align-items-center">
                    <input
                      className="form-input ms-2 "
                      type="radio"
                      name="Gender"
                      value="Male"
                      onChange={handleChange}
                      checked={localFormData.Gender === "Male"}
                      required
                    />

                    <label
                      className="form-check-label me-2"
                      htmlFor="exampleRadios1"
                    >
                      Male
                    </label>
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
                    <input
                      className="form-input ms-2"
                      type="radio"
                      name="Gender"
                      value="Other"
                      onChange={handleChange}
                      checked={localFormData.Gender === "Other"}
                    />
                    <label
                      className="form-check-label ms-1 me-2"
                      htmlFor="exampleRadios1"
                    >
                      Other:
                    </label>
                    {showSpecification && (
                      <div className="d-inline-flex">
                        <input type="text" className="form-control" required />
                      </div>
                    )}
                  </div>
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
    </div>
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
    <di>
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
    </di>
  );
};

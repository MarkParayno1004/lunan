import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Datepicker from "react-tailwindcss-datepicker";

export const CardOne = ({ ButtonNext, handleInputChange, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    Fname: "",
    Age: "",
    BirthDate: "",
    Gender: "",
  });

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const calculateAge = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const age = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < start.getDate())) {
      return age - 1;
    }

    return age;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "BirthDate") {
      console.log("BirthDate:", value);
      const birthDate = dayjs(value);
      const today = dayjs();
      const age = calculateAge(birthDate, today);

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

  const handleNext = (event) => {
    event.preventDefault();
    ButtonNext(localFormData);
  };

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    // Set endDate to today's date
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const endDate = `${year}/${month}/${day}`;

    setValue({
      startDate: newValue.startDate,
      endDate: endDate,
    });
  };

  useEffect(() => {
    // Log values after the component re-renders
    console.log("value.startDate:", value.startDate);
    console.log("value.endDate:", value.endDate);
    console.log("newValue:", value);
  }, [value]); // Only re-run the effect if the 'value' state changes

  const [calculatedAge, setCalculatedAge] = useState(null);

  useEffect(() => {
    if (value.startDate && value.endDate) {
      const age = calculateAge(value.startDate, value.endDate);
      setCalculatedAge(age);
    }
  }, [value]);

  return (
    <div className="grid justify-items-center">
      <form onSubmit={handleNext} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium text-gray-900  ">
              Full Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="text"
              name="Fname"
              placeholder="Full Name:"
              pattern="^[a-zA-Z0-9 ]+$"
              onChange={handleInputChange}
              value={localFormData.Fname}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 "
              htmlFor="grid-last-name"
            >
              Age
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="number"
              name="Age"
              placeholder="Age:"
              pattern="^[a-zA-Z0-9 ]+$"
              value={calculatedAge !== null ? calculatedAge : ""}
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Gender
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="Gender"
              value={localFormData.Gender}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Not Specified">Do not Specify</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Birth Date:
            </label>
            <Datepicker
              useRange={false}
              asSingle={true}
              value={value}
              onChange={handleValueChange}
            />
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

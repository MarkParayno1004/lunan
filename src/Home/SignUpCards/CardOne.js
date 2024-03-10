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

  const [dateValue, setDateValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue, event) => {
    // Set endDate to today's date
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const endDate = `${year}/${month}/${day}`;

    const formattedStartDate = dayjs(newValue.startDate).format("YYYY-MM-DD");

    setDateValue({
      startDate: newValue.startDate,
      endDate: endDate,
    });

    setLocalFormData((prevFormData) => ({
      ...prevFormData,
      Age: calculateAge(
        dayjs(newValue.startDate),
        dayjs(newValue.endDate)
      ).toString(),
      BirthDate: `${formattedStartDate}`,
    }));
  };

  const hanldeGenderChange = (event) => {
    setLocalFormData({ ...localFormData, Gender: event.target.value });
  };

  useEffect(() => {
    if (dateValue.startDate && dateValue.endDate) {
      const age = calculateAge(dateValue.startDate, dateValue.endDate);
      setLocalFormData({ ...localFormData, Age: age });
    }
  }, [dateValue]);

  useEffect(() => {
    // Log values after the component re-renders
    console.log("value.startDate:", dateValue.startDate);
    console.log("value.endDate:", dateValue.endDate);
    console.log("newValue:", dateValue);
  }, [dateValue]); // Only re-run the effect if the 'value' state changes

  const handleNext = (event) => {
    event.preventDefault();
    ButtonNext(localFormData);
  };
  console.log(`BirthDate : ${localFormData.BirthDate}`);

  return (
    <div className="grid justify-items-center text-white">
      <form
        onSubmit={handleNext}
        className="w-full max-w-lg p-3 rounded-lg bg-primaryOrange"
      >
        <p className="font-bold">
          Please fill up this intake form: (This form will be your Sign Up form
          or Register Form)
        </p>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium">Full Name:</label>
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
              className="block mb-2 text-sm font-medium"
              htmlFor="grid-last-name"
            >
              Age:
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="number"
              name="Age"
              placeholder="Age:"
              pattern="^[a-zA-Z0-9 ]+$"
              value={localFormData.Age !== null ? localFormData.Age : ""}
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium">Gender:</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="Gender"
              onChange={hanldeGenderChange}
              value={localFormData.Gender}
              required
            >
              <option defaultChecked disabled>
                Choose Gender:
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Not Specified">Do not Specify</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block mb-2 text-sm font-medium">
              Birth Date:
            </label>
            <Datepicker
              primaryColor={"orange"}
              useRange={false}
              asSingle={true}
              value={dateValue}
              onChange={handleValueChange}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-primaryGreen p-2 rounded-lg font-medium text-base">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

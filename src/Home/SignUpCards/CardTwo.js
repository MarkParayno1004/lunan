import { useState, useEffect } from "react";

export const CardTwo = ({ ButtonBack, ButtonNext, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    StreetNum: "",
    Barangay: "",
    City: "",
    Region: "",
    Zip: "",
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
    <div className="grid justify-items-center text-white">
      <form
        onSubmit={handleNext}
        className="w-full max-w-xl p-3 rounded-lg bg-primaryOrange"
      >
        <p className="font-bold">Current Address:</p>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium">
              Street and Number:
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="StreetNum"
              placeholder="Street and Number:"
              pattern="^[a-zA-Z0-9 ]+$"
              value={localFormData.StreetNum}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium">Barangay:</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="Barangay"
              placeholder="Barangay:"
              pattern="^[a-zA-Z0-9 ]+$"
              value={localFormData.Barangay}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium">City:</label>

            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="City"
              placeholder="City:"
              pattern="^[a-zA-Z0-9 ]+$"
              value={localFormData.City}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium">Region:</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="Region"
              placeholder="Region:"
              pattern="^[a-zA-Z0-9 ]+$"
              value={localFormData.Region}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium">Zip:</label>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="Zip"
              placeholder="Zip:"
              value={localFormData.Zip}
              onChange={handleInputChange}
              inputMode="numeric"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium">
              Phone Number:
            </label>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="CellPhone"
              placeholder="Phone Number:"
              value={localFormData.CellPhone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium">Email:</label>

            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="Email"
              placeholder="Email:"
              pattern="^[a-zA-Z0-9@. -_]+$"
              value={localFormData.Email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-primaryGreen p-2 rounded-lg font-medium text-base"
            onClick={ButtonBack}
          >
            Back
          </button>
          <button className="bg-primaryGreen p-2 rounded-lg font-medium text-base">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

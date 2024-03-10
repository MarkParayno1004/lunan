import { useState, useEffect } from "react";

export const CardThree = ({ ButtonBack, ButtonSubmit, formData }) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(localFormData); // Log form data
    ButtonSubmit(localFormData); // Call the ButtonNext function with form data
  };
  return (
    <div className="grid justify-items-center text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-3 rounded-lg bg-primaryOrange"
      >
        <p className="font-bold">Person to contact in case of emergency:</p>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium">Full Name:</label>
            <input
              type="text"
              aria-label="EmergencyFullName"
              placeholder="Full Name:"
              pattern="^[a-zA-Z0-9 ]+$"
              name="CPFname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={localFormData.CPFname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium">
              Relationship to Patient:
            </label>

            <input
              type="text"
              aria-label="Relationship"
              placeholder="Relationship to client"
              pattern="^[a-zA-Z0-9 ]+$"
              name="Rel"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={localFormData.Rel}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium">
              Phone Number:
            </label>
            <input
              type="text"
              aria-label="Phone"
              placeholder="Phone Number:"
              pattern="^[a-zA-Z0-9 ]+$"
              name="CPNum"
              value={localFormData.CPNum}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <p className="font-bold">Patient's Doctor:</p>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium">Full Name:</label>
            <input
              type="text"
              aria-label="DoctorFullName"
              placeholder="Full Name:"
              pattern="^[a-zA-Z0-9]+$"
              name="DocFname"
              value={localFormData.DocFname}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium">
              Phone Number:
            </label>
            <input
              type="text"
              aria-label="DoctorPhone"
              placeholder="Phone Number:"
              pattern="^[a-zA-Z0-9 ]+$"
              name="DocNum"
              value={localFormData.DocNum}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <p className="font-bold">How did you hear about us?</p>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium pb-1 "
            >
              What prompted you to seek therapy or an assessment?
            </label>

            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="CommAssess"
              placeholder="Leave a comment here"
              pattern="^[a-zA-Z0-9 ]+$"
              value={localFormData.CommAssess}
              id="floatingTextarea"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium pb-4 "
            >
              Where did you learn about us?
            </label>
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="CommLearn"
              placeholder="Leave a comment here"
              pattern="^[a-zA-Z0-9 ]+$"
              id="floatingTextarea"
              value={localFormData.CommLearn}
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

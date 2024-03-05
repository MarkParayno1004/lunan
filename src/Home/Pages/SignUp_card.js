import { useState } from "react";
import { uploadSignUpData } from "../Store/Components/SignUpHelper";
import { CardOne } from "../SignUpCards/CardOne";
import { CardTwo } from "../SignUpCards/CardTwo";
import { CardThree } from "../SignUpCards/CardThree";
import Swal from "sweetalert2";

export const SIGNUPCARD = () => {
  const [card, setCard] = useState(1);
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNext = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...data,
    }));
    setCard(card + 1);
  };

  const handlePrevious = (event) => {
    event.preventDefault();
    setCard(card - 1);
  };

  const signUpHandleSubmit = (data) => {
    uploadSignUpData(formData, data); // Call the upload function with form data
    Swal.fire({
      position: "center",
      background: "#7db9b6",
      title: "Successfully Submitted",
      color: "white",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <div className="container-fluid">
      {card === 1 && (
        <CardOne
          handleInputChange={handleInputChange}
          ButtonNext={handleNext}
          formData={formData}
        />
      )}

      {card === 2 && (
        <CardTwo
          handleInputChange={handleInputChange}
          ButtonNext={handleNext}
          ButtonBack={handlePrevious}
          formData={formData}
        />
      )}

      {card === 3 && (
        <CardThree
          handleInputChange={handleInputChange}
          ButtonBack={handlePrevious}
          ButtonSubmit={signUpHandleSubmit}
          formData={formData}
        />
      )}
    </div>
  );
};

export default SIGNUPCARD;

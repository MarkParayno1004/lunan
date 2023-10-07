import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { generateRandomPassword, upload } from "./SignUpBackend/SignUpHelper";
import { CardOne } from "./SignUpCards/CardOne";
import { CardTwo } from "./SignUpCards/CardTwo";
import { CardThree } from "./SignUpCards/CardThree";
import { CardFour } from "./SignUpCards/CardFour";
import { CardFive } from "./SignUpCards/CardFive";
import { CardSix } from "./SignUpCards/CardSix";
import { CardSixPoint2 } from "./SignUpCards/CardSixPoint2";
import { CardSeven } from "./SignUpCards/CardSeven";
import { CardEight } from "./SignUpCards/CardEight";
import { CardNine } from "./SignUpCards/CardNine";
import { CardTen } from "./SignUpCards/CardTen";
import { CardEleven } from "./SignUpCards/CardEleven";
import { CardTwelve } from "./SignUpCards/CardTwelve";
import Swal from "sweetalert2";

export const SIGNUPCARD = () => {
  // Use state to keep track of the current card and form data
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

  const handleSubmit = (data) => {
    upload(formData, data); // Call the upload function with form data
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
          ButtonNext={handleNext}
          ButtonBack={handlePrevious}
          formData={formData}
        />
      )}

      {card === 4 && (
        <CardFour
          handleInputChange={handleInputChange}
          ButtonNext={handleNext}
          ButtonBack={handlePrevious}
          formData={formData}
        />
      )}
      {card === 5 && (
        <CardFive
          handleInputChange={handleInputChange}
          ButtonNext={handleNext}
          ButtonBack={handlePrevious}
          formData={formData}
        />
      )}

      {card === 6 && (
        <CardSix
          handleInputChange={handleInputChange}
          ButtonNext={handleNext}
          ButtonBack={handlePrevious}
          formData={formData}
        />
      )}

      {card === 7 && (
        <CardSixPoint2
          handleInputChange={handleInputChange}
          ButtonNext={handleNext}
          ButtonBack={handlePrevious}
          formData={formData}
        />
      )}

      {card === 8 && (
        <CardSeven
          handleInputChange={handleInputChange}
          ButtonNext={handleNext}
          ButtonBack={handlePrevious}
          formData={formData}
        />
      )}

      {card === 9 && (
        <CardEight
          handleInputChange={handleInputChange}
          ButtonNext={handleNext}
          ButtonBack={handlePrevious}
          formData={formData}
        />
      )}

      {card === 10 && (
        <CardNine
          handleInputChange={handleInputChange}
          ButtonNext={handleNext}
          ButtonBack={handlePrevious}
          formData={formData}
        />
      )}

      {card === 11 && (
        <CardTen
          handleInputChange={handleInputChange}
          ButtonNext={handleNext}
          ButtonBack={handlePrevious}
          formData={formData}
        />
      )}

      {card === 12 && (
        <CardEleven
          handleInputChange={handleInputChange}
          ButtonNext={handleNext}
          ButtonBack={handlePrevious}
          formData={formData}
        />
      )}

      {card === 13 && (
        <CardTwelve
          handleInputChange={handleInputChange}
          ButtonBack={handlePrevious}
          ButtonSubmit={handleSubmit}
          formData={formData}
        />
      )}
    </div>
  );
};

export default SIGNUPCARD;

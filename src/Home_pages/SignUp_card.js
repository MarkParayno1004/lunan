import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase-config";
import firebase from "firebase/compat/app";

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

export const SIGNUPCARD = () => {
  const [card, setCard] = useState(1);
  const [formData, setFormData] = useState({});
  const upload = async (data) => {
    try {
      const userAccRef = collection(firestore, "Users");
      const intakeRef = collection(firestore, "IntakeForms");
      // Upload user data
      await addDoc(userAccRef, {
        firstName: data.Fname,
        dateToday: data.DateCreated,
      });

      // Upload intake form data
      await addDoc(intakeRef, {
        age: data.Age,
        gender: data.Gender,
      });

      console.log("Data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

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

  const handlePrevious = () => {
    setCard(card - 1);
  };

  const handleSubmit = () => {
    upload(formData); // Call the upload function with form data
    alert("Form submitted!");
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
        <CardEight ButtonBack={handlePrevious} ButtonNext={handleNext} />
      )}
      {card === 10 && (
        <CardNine ButtonBack={handlePrevious} ButtonNext={handleNext} />
      )}
      {card === 11 && (
        <CardTen ButtonBack={handlePrevious} ButtonNext={handleNext} />
      )}
      {card === 12 && (
        <CardEleven ButtonBack={handlePrevious} ButtonNext={handleNext} />
      )}
      {card === 13 && (
        <CardTwelve ButtonBack={handlePrevious} ButtonNext={handleSubmit} />
      )}
    </div>
  );
};

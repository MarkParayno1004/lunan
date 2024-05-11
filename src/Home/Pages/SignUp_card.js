import { useState } from "react";
import { upload } from "../Store/Components/SignUpHelper";
import { CardOne } from "../SignUpCards/CardOne";
import { CardTwo } from "../SignUpCards/CardTwo";
import { CardThree } from "../SignUpCards/CardThree";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const SIGNUPCARD = () => {
  const [card, setCard] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

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
    setFormData((prevFormData) => ({
      ...prevFormData,
    }));
  };

  const handleSubmit = (data) => {
    upload(formData, data);
    Swal.fire({
      position: "center",
      background: "#7db9b6",
      title: "Successfully Submitted",
      color: "white",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/Login");
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
          ButtonSubmit={handleSubmit}
          formData={formData}
        />
      )}
    </div>
  );
};

export default SIGNUPCARD;

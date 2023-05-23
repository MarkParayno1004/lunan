import { useState } from "react";
import { CardOne } from "./SignUpCards/CardOne";
import { CardTwo } from "./SignUpCards/CardTwo";
import { CardThree } from "./SignUpCards/CardThree";
import { CardFour } from "./SignUpCards/CardFour";
import { CardFive } from "./SignUpCards/CardFive";
import { CardSix } from "./SignUpCards/CardSix";
import { CardSeven } from "./SignUpCards/CardSeven";
import { CardEight } from "./SignUpCards/CardEight";
import { CardNine } from "./SignUpCards/CardNine"; 
import { CardTen } from "./SignUpCards/CardTen";
import { CardEleven } from "./SignUpCards/CardEleven";
import { CardTwelve } from "./SignUpCards/CardTwelve";

export const SIGNUPCARD = () => {
  //!Logic of next and Previous Button
  const [card, setStep] = useState(1);

  const handleNext = () => {
    setStep(card + 1);
  };

  const handlePrevious = () => {
    setStep(card - 1);
  };

  const handleSubmit = () => {
    alert("Form submitted!");
  };

  //!First Card
  const Card1 = ({ onNext }) => {
    return <CardOne ButtonNext={onNext} />;
  };

  //!Second Card
  const Card2 = ({ onPrevious, onNext }) => {
    return <CardTwo ButtonBack={onPrevious} ButtonNext={onNext} />;
  };

  //!Third Card
  const Card3 = ({ onPrevious, onNext }) => {
    return <CardThree ButtonBack={onPrevious} ButtonNext={onNext} />;
  };

  //!Fourth Card
  const Card4 = ({ onPrevious, onNext }) => {
    return <CardFour ButtonBack={onPrevious} ButtonNext={onNext} />;
  };

  //!Fifth Card
  const Card5 = ({ onPrevious, onNext }) => {
    return <CardFive ButtonBack={onPrevious} ButtonNext={onNext} />;
  };

  //! Sixth Card
  const Card6 = ({ onPrevious, onNext }) => {
    return <CardSix ButtonBack={onPrevious} ButtonNext={onNext} />;
  };

  //! Seventh Card
  const Card7 = ({ onPrevious, onNext }) => {
    return <CardSeven ButtonBack={onPrevious} ButtonNext={onNext} />;
  };

  //! Eight Card
  const Card8 = ({ onPrevious, onNext }) => {
    return <CardEight ButtonBack={onPrevious} ButtonNext={onNext} />;
  };

  //! Ninth Card 
  const Card9 = ({ onPrevious, onNext }) => {
    return <CardNine ButtonBack={onPrevious} ButtonNext={onNext} />;
  }

  //! Tenth Card
  const Card10 = ({ onPrevious, onNext }) => {
    return <CardTen ButtonBack={onPrevious} ButtonNext={onNext} />;
  }

  //! Eleventh Card
  const Card11 = ({ onPrevious, onNext }) => {
    return <CardEleven ButtonBack={onPrevious} ButtonNext={onNext} />;
  }

  //! Twelfth Card
  const Card12 = ({ onPrevious, onNext }) => {
    return <CardTwelve ButtonBack={onPrevious} ButtonNext={onNext} />;
  }
  return (
    <div>
      {card === 1 && <Card1 onNext={handleNext} />}
      {card === 2 && <Card2 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 3 && <Card3 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 4 && <Card4 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 5 && <Card5 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 6 && <Card6 onPrevious={handlePrevious} onNext={handleNext} />}

      {card === 7 && <Card7 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 8 && <Card8 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 9 && <Card9 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 10 && <Card10 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 11 && <Card11 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 12 && <Card12 onPrevious={handlePrevious} onNext={handleSubmit} />}
    </div>
  );
};

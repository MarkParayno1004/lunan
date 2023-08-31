import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase-config";
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
  const userAccRef = collection(firestore, "Users");
  const intakeRef = collection(firestore, "IntakeForms");

  // Function to generate a random password
  function generateRandomPassword(length) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    return password;
  }

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
    Swal.fire({
      position: "center",
      icon: "success",
      background: "#7db9b6",
      title: "Successfully Submitted",
      color: "white",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const upload = async (data) => {
    try {
      // Generate a random password with length 8
      const password = generateRandomPassword(8);
      // Create a user account with the provided email and generated password
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.Email,
        password
      );
      console.log("Generated Password:", password);

      // Add user data to the "Users" collection
      const newUser = {
        firstName: formData.Fname,
        dateCreated: new Date().toISOString().split("T")[0],
        Gender: formData.Gender,
        Age: formData.Age,
        Email: formData.Email,
        HomePhone: formData.HomePhone,
        CellPhone: formData.CellPhone,
        MessageHome: formData.MessageHome,
        MessageCall: formData.MessageCall,
        checkEmail: formData.checkEmail,
        UID: user.uid, 
        Role: "Patient",
        counselorID: null,
        password: password,
        ProfPic: null,
        Birthday: formData.BirthDate
      };
      console.log("New User Data:", newUser);
      // Add the document to Firestore
      await addDoc(userAccRef, newUser);

      const newIntake = {
        UID: user.uid,
        StreetNum: data.StreetNum || "N/A",
        Barangay: data.Barangay || "N/A",
        City: data.City || "N/A",
        Region: data.Region || "N/A",
        Zip: data.Zip || "N/A",
        CPFname: data.CPFname || "N/A",
        Rel: data.Rel || "N/A",
        CPNum: data.CPNum || "N/A",
        DocFname: data.DocFname || "N/A",
        DocNum: data.DocNum || "N/A",
        CommLearn: data.CommLearn || "N/A",
        CommAssess: data.CommAssess || "N/A",
        SexualPref: data.SexualPref || "N/A",
        MaritalStatus: data.MaritalStatus || "N/A",
        RelStatus: data.RelStatus || "N/A",
        HowLong: data.HowLong || "N/A",
        QualRel: data.QualRel || "N/A",
        Child: data.Child || "N/A",
        CountChild: data.CountChild || "N/A",
        ChildAge: data.ChildAge || "N/A",
        TherapyStatus: data.TherapyStatus || "N/A",
        WhyTherapy: data.WhyTherapy || "N/A",
        WhenTherapy: data.WhenTherapy || "N/A",
        PsychiatricMeds: data.PsychiatricMeds || "N/A",
        CurrPsychMeds: data.CurrPsychMeds || "N/A",
        PrevPsychMedSel: data.PrevPsychMedSel || "N/A",
        PrevPsychMeds: data.PrevPsychMeds || "N/A",
        SuicidalThoughtsPast: data.SuicidalThoughtsPast || "N/A",
        SelfHarm: data.SelfHarm || "N/A",
        SuicidalThoughts: data.SuicidalThoughts || "N/A",
        SuicidalThoughtsPastTime: data.SuicidalThoughtsPastTime || "N/A",
        CurrentHomicidal: data.CurrentHomicidal || "N/A",
        HadPreviousHomicide: data.HadPreviousHomicide || "N/A",
        PastHomicidalTime: data.PastHomicidalTime || "N/A",
        currentPhysicalHealth: data.currentPhysicalHealth || "N/A",
        LastPhysicalExam: data.LastPhysicalExam || "N/A",
        chronicIllnessSel: data.chronicIllnessSel || "N/A",
        ChronicIll: data.ChronicIll || "N/A",
        AllergiesSel: data.AllergiesSel || "N/A",
        Sleep: data.Sleep || "N/A",
        MaintMeds: data.MaintMeds || "N/A",
        MaintMedsSel: data.MaintMedsSel || "N/A",
        AllergyList: data.AllergyList || "N/A",
        SmokeSel: data.SmokeSel || "N/A",
        CiggDaily: data.CiggDaily || "N/A",
        CaffDrinkSel: data.CaffDrinkSel || "N/A",
        HeadInjurySel: data.HeadInjurySel || "N/A",
        SignChanSel: data.SignChanSel || "N/A",
        SodasPerDay: data.SodasPerDay || "N/A",
        CoffeePerDay: data.CoffeePerDay || "N/A",
        HeadInjDef: data.HeadInjDef || "N/A",
        ChangesDef: data.ChangesDef || "N/A",
        depressedMoodNowSel: data.depressedMoodNowSel || "N/A",
        depressedMoodRatingNow: data.depressedMoodRatingNow || "N/A",
        irritabilitySelNow: data.irritabilitySelNow || "N/A",
        irritabilityRatingNow: data.irritabilityRatingNow || "N/A",
        moodSwingsSelNow: data.moodSwingsSelNow || "N/A",
        moodSwingsRatingNow: data.moodSwingsRatingNow || "N/A",
        rapidSpeechSelNow: data.rapidSpeechSelNow || "N/A",
        rapidSpeechRatingNow: data.rapidSpeechRatingNow || "N/A",
        racingThoughtsSelNow: data.racingThoughtsSelNow || "N/A",
        racingThoughtsRatingNow: data.racingThoughtsRatingNow || "N/A",
        anxietySelNow: data.anxietySelNow || "N/A",
        anxietyRatingNow: data.anxietyRatingNow || "N/A",
        constantWorrySelNow: data.constantWorrySelNow || "N/A",
        constantWorryRatingNow: data.constantWorryRatingNow || "N/A",
        panicAttacksSelNow: data.panicAttacksSelNow || "N/A",
        panicAttacksRatingNow: data.panicAttacksRatingNow || "N/A",
        phobiasSelNow: data.phobiasSelNow || "N/A",
        phobiasRatingNow: data.phobiasRatingNow || "N/A",
        sleepDisturbancesSelNow: data.sleepDisturbancesSelNow || "N/A",
        sleepDisturbancesRatingNow: data.sleepDisturbancesRatingNow || "N/A",
        hallucinationsSelNow: data.hallucinationsSelNow || "N/A",
        hallucinationsRatingNow: data.hallucinationsRatingNow || "N/A",
        paranoiaSelNow: data.paranoiaSelNow || "N/A",
        paranoiaRatingNow: data.paranoiaRatingNow || "N/A",
        poorConcentrationSelNow: data.poorConcentrationSelNow || "N/A",
        poorConcentrationRatingNow: data.poorConcentrationRatingNow || "N/A",
        alcoholSubstanceAbuseSelNow: data.alcoholSubstanceAbuseSelNow || "N/A",
        alcoholSubstanceAbuseRatingNow:
          data.alcoholSubstanceAbuseRatingNow || "N/A",
        frequentBodyComplaintsSelNow:
          data.frequentBodyComplaintsSelNow || "N/A",
        frequentBodyComplaintsRatingNow:
          data.frequentBodyComplaintsRatingNow || "N/A",
        eatingDisorderSelNow: data.eatingDisorderSelNow || "N/A",
        eatingDisorderRatingNow: data.eatingDisorderRatingNow || "N/A",
        bodyImageProblemsSelNow: data.bodyImageProblemsSelNow || "N/A",
        bodyImageProblemsRatingNow: data.bodyImageProblemsRatingNow || "N/A",
        repetitiveThoughtsSelNow: data.repetitiveThoughtsSelNow || "N/A",
        repetitiveThoughtsRatingNow: data.repetitiveThoughtsRatingNow || "N/A",
        repetitiveBehaviorsSelNow: data.repetitiveBehaviorsSelNow || "N/A",
        repetitiveBehaviorsRatingNow:
          data.repetitiveBehaviorsRatingNow || "N/A",
        poorImpulseControlSelNow: data.poorImpulseControlSelNow || "N/A",
        poorImpulseControlRatingNow: data.poorImpulseControlRatingNow || "N/A",
        selfMutilationSelNow: data.selfMutilationSelNow || "N/A",
        selfMutilationRatingNow: data.selfMutilationRatingNow || "N/A",
        sexualAbuseSelNow: data.sexualAbuseSelNow || "N/A",
        sexualAbuseRatingNow: data.sexualAbuseRatingNow || "N/A",
        physicalAbuseSelNow: data.physicalAbuseSelNow || "N/A",
        physicalAbuseRatingNow: data.physicalAbuseRatingNow || "N/A",
        emotionalAbuseSelNow: data.emotionalAbuseSelNow || "N/A",
        emotionalAbuseRatingNow: data.emotionalAbuseRatingNow || "N/A",
        depressedMoodPastSel: data.depressedMoodPastSel || "N/A",
        depressedMoodRatingPast: data.depressedMoodRatingPast || "N/A",
        irritabilitySelPast: data.irritabilitySelPast || "N/A",
        irritabilityRatingPast: data.irritabilityRatingPast || "N/A",
        moodSwingsSelPast: data.moodSwingsSelPast || "N/A",
        moodSwingsRatingPast: data.moodSwingsRatingPast || "N/A",
        rapidSpeechSelPast: data.rapidSpeechSelPast || "N/A",
        rapidSpeechRatingPast: data.rapidSpeechRatingPast || "N/A",
        racingThoughtsSelPast: data.racingThoughtsSelPast || "N/A",
        racingThoughtsRatingPast: data.racingThoughtsRatingPast || "N/A",
        anxietySelPast: data.anxietySelPast || "N/A",
        anxietyRatingPast: data.anxietyRatingPast || "N/A",
        constantWorrySelPast: data.constantWorrySelPast || "N/A",
        constantWorryRatingPast: data.constantWorryRatingPast || "N/A",
        panicAttacksSelPast: data.panicAttacksSelPast || "N/A",
        panicAttacksRatingPast: data.panicAttacksRatingPast || "N/A",
        phobiasSelPast: data.phobiasSelPast || "N/A",
        phobiasRatingPast: data.phobiasRatingPast || "N/A",
        sleepDisturbancesSelPast: data.sleepDisturbancesSelPast || "N/A",
        sleepDisturbancesRatingPast: data.sleepDisturbancesRatingPast || "N/A",
        hallucinationsSelPast: data.hallucinationsSelPast || "N/A",
        hallucinationsRatingPast: data.hallucinationsRatingPast || "N/A",
        paranoiaSelPast: data.paranoiaSelPast || "N/A",
        paranoiaRatingPast: data.paranoiaRatingPast || "N/A",
        poorConcentrationSelPast: data.poorConcentrationSelPast || "N/A",
        poorConcentrationRatingPast: data.poorConcentrationRatingPast || "N/A",
        alcoholSubstanceAbuseSelPast:
          data.alcoholSubstanceAbuseSelPast || "N/A",
        alcoholSubstanceAbuseRatingPast:
          data.alcoholSubstanceAbuseRatingPast || "N/A",
        frequentBodyComplaintsSelPast:
          data.frequentBodyComplaintsSelPast || "N/A",
        frequentBodyComplaintsRatingPast:
          data.frequentBodyComplaintsRatingPast || "N/A",
        eatingDisorderSelPast: data.eatingDisorderSelPast || "N/A",
        eatingDisorderRatingPast: data.eatingDisorderRatingPast || "N/A",
        bodyImageProblemsSelPast: data.bodyImageProblemsSelPast || "N/A",
        bodyImageProblemsRatingPast: data.bodyImageProblemsRatingPast || "N/A",
        repetitiveThoughtsSelPast: data.repetitiveThoughtsSelPast || "N/A",
        repetitiveThoughtsRatingPast:
          data.repetitiveThoughtsRatingPast || "N/A",
        repetitiveBehaviorsSelPast: data.repetitiveBehaviorsSelPast || "N/A",
        repetitiveBehaviorsRatingPast:
          data.repetitiveBehaviorsRatingPast || "N/A",
        poorImpulseControlSelPast: data.poorImpulseControlSelPast || "N/A",
        poorImpulseControlRatingPast:
          data.poorImpulseControlRatingPast || "N/A",
        selfMutilationSelPast: data.selfMutilationSelPast || "N/A",
        selfMutilationRatingPast: data.selfMutilationRatingPast || "N/A",
        sexualAbuseSelPast: data.sexualAbuseSelPast || "N/A",
        sexualAbuseRatingPast: data.sexualAbuseRatingPast || "N/A",
        physicalAbuseSelPast: data.physicalAbuseSelPast || "N/A",
        physicalAbuseRatingPast: data.physicalAbuseRatingPast || "N/A",
        emotionalAbuseSelPast: data.emotionalAbuseSelPast || "N/A",
        emotionalAbuseRatingPast: data.emotionalAbuseRatingPast || "N/A",
        EmployeeStatus: data.EmployeeStatus || "N/A",
        financialConcernsSel: data.financialConcernsSel || "N/A",
        MilitarySel: data.MilitarySel || "N/A",
        EducationSel: data.EducationSel || "N/A",
        legalConcernsSel: data.legalConcernsSel || "N/A",
        Employer: data.Employer || "N/A",
        CurrPos: data.CurrPos || "N/A",
        Stressors: data.Stressors || "N/A",
        MilYesStart: data.MilYesStart || "N/A",
        militaryNo: data.militaryNo || "N/A",
        LegalExp: data.LegalExp || "N/A",
        FinExp: data.FinExp || "N/A",
        ParentStatus: data.ParentStatus || "N/A",
        DivorceDate: data.DivorceDate || "N/A",
        DateDivorced: data.DateDivorced || "N/A",
        DateRemarried: data.DateRemarried || "N/A",
        DeceasedWho: data.DeceasedWho || "N/A",
        AgeDeceased: data.AgeDeceased || "N/A",
        SiblingsCount: data.SiblingsCount || "N/A",
        siblingAge: data.siblingAge || "N/A",
        familySupport: data.familySupport || "N/A",
        SupWhom: data.SupWhom || "N/A",
        DepressionSel: data.DepressionSel || "N/A",
        DepressionMem: data.DepressionMem || "N/A",
        BipolarSel: data.BipolarSel || "N/A",
        AnxietySel: data.AnxietySel || "N/A",
        BipolarMem: data.BipolarMem || "N/A",
        AnxietyMem: data.AnxietyMem || "N/A",
        PanicSel: data.PanicSel || "N/A",
        PanicMem: data.PanicMem || "N/A",
        SchizoSel: data.SchizoSel || "N/A",
        SchizoMem: data.SchizoMem || "N/A",
        AlcoholMem: data.AlcoholMem || "N/A",
        EatingSel: data.EatingSel || "N/A",
        EatingMem: data.EatingMem || "N/A",
        LearningSel: data.LearningSel || "N/A",
        LearningMem: data.LearningMem || "N/A",
        TraumaSel: data.TraumaSel || "N/A",
        TraumaMem: data.TraumaMem || "N/A",
        SuicideSel: data.SuicideSel || "N/A",
        SuicideMem: data.SuicideMem || "N/A",
        PsychiatricSel: data.PsychiatricSel || "N/A",
        PsychiatricMem: data.PsychiatricMem || "N/A",
      };
      console.log("New Intake Form:", newIntake);
      await addDoc(intakeRef, newIntake);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
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

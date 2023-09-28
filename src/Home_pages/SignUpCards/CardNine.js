import { useState, useEffect } from "react";
import "../../css/customscroll.css";
export const CardNine = ({ ButtonBack, ButtonNext, formData }) => {
  // Radio Button for Experiences
  const [localFormData, setLocalFormData] = useState({
    depressedMoodPastSel: "",
    depressedMoodRatingPast: "",
    irritabilitySelPast: "",
    irritabilityRatingPast: "",
    moodSwingsSelPast: "",
    moodSwingsRatingPast: "",
    rapidSpeechSelPast: "",
    rapidSpeechRatingPast: "",
    racingThoughtsSelPast: "",
    racingThoughtsRatingPast: "",
    anxietySelPast: "",
    anxietyRatingPast: "",
    constantWorrySelPast: "",
    constantWorryRatingPast: "",
    panicAttacksSelPast: "",
    panicAttacksRatingPast: "",
    phobiasSelPast: "",
    phobiasRatingPast: "",
    sleepDisturbancesSelPast: "",
    sleepDisturbancesRatingPast: "",
    hallucinationsSelPast: "",
    hallucinationsRatingPast: "",
    paranoiaSelPast: "",
    paranoiaRatingPast: "",
    poorConcentrationSelPast: "",
    poorConcentrationRatingPast: "",
    alcoholSubstanceAbuseSelPast: "",
    alcoholSubstanceAbuseRatingPast: "",
    frequentBodyComplaintsSelPast: "",
    frequentBodyComplaintsRatingPast: "",
    eatingDisorderSelPast: "",
    eatingDisorderRatingPast: "",
    bodyImageProblemsSelPast: "",
    bodyImageProblemsRatingPast: "",
    repetitiveThoughtsSelPast: "",
    repetitiveThoughtsRatingPast: "",
    repetitiveBehaviorsSelPast: "",
    repetitiveBehaviorsRatingPast: "",
    poorImpulseControlSelPast: "",
    poorImpulseControlRatingPast: "",
    selfMutilationSelPast: "",
    selfMutilationRatingPast: "",
    sexualAbuseSelPast: "",
    sexualAbuseRatingPast: "",
    physicalAbuseSelPast: "",
    physicalAbuseRatingPast: "",
    emotionalAbuseSelPast: "",
    emotionalAbuseRatingPast: "",
  });

  useEffect(() => {
    setLocalFormData(
      formData ?? {
        depressedMoodPastSel: "",
        depressedMoodRatingPast: "",
        irritabilitySelPast: "",
        irritabilityRatingPast: "",
        moodSwingsSelPast: "",
        moodSwingsRatingPast: "",
        rapidSpeechSelPast: "",
        rapidSpeechRatingPast: "",
        racingThoughtsSelPast: "",
        racingThoughtsRatingPast: "",
        anxietySelPast: "",
        anxietyRatingPast: "",
        constantWorrySelPast: "",
        constantWorryRatingPast: "",
        panicAttacksSelPast: "",
        panicAttacksRatingPast: "",
        phobiasSelPast: "",
        phobiasRatingPast: "",
        sleepDisturbancesSelPast: "",
        sleepDisturbancesRatingPast: "",
        hallucinationsSelPast: "",
        hallucinationsRatingPast: "",
        paranoiaSelPast: "",
        paranoiaRatingPast: "",
        poorConcentrationSelPast: "",
        poorConcentrationRatingPast: "",
        alcoholSubstanceAbuseSelPast: "",
        alcoholSubstanceAbuseRatingPast: "",
        frequentBodyComplaintsSelPast: "",
        frequentBodyComplaintsRatingPast: "",
        eatingDisorderSelPast: "",
        eatingDisorderRatingPast: "",
        bodyImageProblemsSelPast: "",
        bodyImageProblemsRatingPast: "",
        repetitiveThoughtsSelPast: "",
        repetitiveThoughtsRatingPast: "",
        repetitiveBehaviorsSelPast: "",
        repetitiveBehaviorsRatingPast: "",
        poorImpulseControlSelPast: "",
        poorImpulseControlRatingPast: "",
        selfMutilationSelPast: "",
        selfMutilationRatingPast: "",
        sexualAbuseSelPast: "",
        sexualAbuseRatingPast: "",
        physicalAbuseSelPast: "",
        physicalAbuseRatingPast: "",
        emotionalAbuseSelPast: "",
        emotionalAbuseRatingPast: "",
      }
    );
  }, [formData]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleNext = () => {
    console.log(localFormData); // Log form data
    ButtonNext(localFormData); // Call the ButtonNext function with form data
  };
  return (
    <div>
      <form onSubmit={handleNext}>
        <div class="container-fluid d-flex justify-content-center mt-3">
          <div class="card" style={{ width: 50 + "rem" }}>
            {/* Experience Now */}
            <div class="card-header">Have you experienced in the past:</div>
            <div className="custom-scroll-container">
              <ul class="list-group list-group-flush">
                {/* Depressed Mood/Sadness */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Depressed Mood or Sadness:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="depressedMoodPastSel"
                      value="Yes"
                      checked={localFormData.depressedMoodPastSel === "Yes"}
                      onChange={handleChange}
                      required
                      style={{ backgroundColor: "red" }}
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="depressedMoodPastSel"
                      value="No"
                      checked={localFormData.depressedMoodPastSel === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>

                    {localFormData.depressedMoodPastSel === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.depressedMoodRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range rounded-5"
                          name="depressedMoodRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.depressedMoodRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Irritability/Anger */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Irritability or Anger:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="irritabilitySelPast"
                      value="Yes"
                      checked={localFormData.irritabilitySelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="irritabilitySelPast"
                      value="No"
                      checked={localFormData.irritabilitySelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.irritabilitySelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.irritabilityRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="irritabilityRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.irritabilityRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Mood Swings */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Mood Swings:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="moodSwingsSelPast"
                      value="Yes"
                      checked={localFormData.moodSwingsSelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="moodSwingsSelPast"
                      value="No"
                      checked={localFormData.moodSwingsSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.moodSwingsSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.moodSwingsRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="moodSwingsRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.moodSwingsRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Rapid Speech */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Rapid Speech:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="rapidSpeechSelPast"
                      value="Yes"
                      checked={localFormData.rapidSpeechSelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="rapidSpeechSelPast"
                      value="No"
                      checked={localFormData.rapidSpeechSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.rapidSpeechSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.rapidSpeechRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="rapidSpeechRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.rapidSpeechRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Racing Thoughts */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Racing Thoughts:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="racingThoughtsSelPast"
                      value="Yes"
                      checked={localFormData.racingThoughtsSelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="racingThoughtsSelPast"
                      value="No"
                      checked={localFormData.racingThoughtsSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.racingThoughtsSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.racingThoughtsRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="racingThoughtsRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.racingThoughtsRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Anxiety */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Anxiety:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="anxietySelPast"
                      value="Yes"
                      checked={localFormData.anxietySelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="anxietySelPast"
                      value="No"
                      checked={localFormData.anxietySelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.anxietySelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.anxietyRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="anxietyRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.anxietyRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Constant Worry */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Constant Worry:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="constantWorrySelPast"
                      value="Yes"
                      checked={localFormData.constantWorrySelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="constantWorrySelPast"
                      value="No"
                      checked={localFormData.constantWorrySelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.constantWorrySelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.constantWorryRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="constantWorryRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.constantWorryRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Panic Attacks */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Panic Attacks:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="panicAttacksSelPast"
                      value="Yes"
                      checked={localFormData.panicAttacksSelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="panicAttacksSelPast"
                      value="No"
                      checked={localFormData.panicAttacksSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.panicAttacksSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.panicAttacksRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="panicAttacksRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.panicAttacksRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Phobias */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Phobias:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="phobiasSelPast"
                      value="Yes"
                      checked={localFormData.phobiasSelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="phobiasSelPast"
                      value="No"
                      checked={localFormData.phobiasSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.phobiasSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):
                          {localFormData.phobiasRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="phobiasRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.phobiasRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Sleep Disturbances */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Sleep Disturbances:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="sleepDisturbancesSelPast"
                      value="Yes"
                      checked={localFormData.sleepDisturbancesSelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="sleepDisturbancesSelPast"
                      value="No"
                      checked={localFormData.sleepDisturbancesSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.sleepDisturbancesSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.sleepDisturbancesRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="sleepDisturbancesRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.sleepDisturbancesRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Hallucinations */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Hallucinations:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="hallucinationsSelPast"
                      value="Yes"
                      checked={localFormData.hallucinationsSelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="hallucinationsSelPast"
                      value="No"
                      checked={localFormData.hallucinationsSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.hallucinationsSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.hallucinationsRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="hallucinationsRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.hallucinationsRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Paranoia */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Paranoia:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="paranoiaSelPast"
                      value="Yes"
                      checked={localFormData.paranoiaSelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="paranoiaSelPast"
                      value="No"
                      checked={localFormData.paranoiaSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.paranoiaSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.paranoiaRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="paranoiaRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.paranoiaRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Poor Concentration */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Poor Concentration:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="poorConcentrationSelPast"
                      value="Yes"
                      checked={localFormData.poorConcentrationSelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="poorConcentrationSelPast"
                      value="No"
                      checked={localFormData.poorConcentrationSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.poorConcentrationSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.poorConcentrationRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="poorConcentrationRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.poorConcentrationRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Alcohol Substance Abuse */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Alcohol Substance Abuse:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="alcoholSubstanceAbuseSelPast"
                      value="Yes"
                      checked={
                        localFormData.alcoholSubstanceAbuseSelPast === "Yes"
                      }
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="alcoholSubstanceAbuseSelPast"
                      value="No"
                      checked={
                        localFormData.alcoholSubstanceAbuseSelPast === "No"
                      }
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.alcoholSubstanceAbuseSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.alcoholSubstanceAbuseRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="alcoholSubstanceAbuseRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.alcoholSubstanceAbuseRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Frequent Body Complaints */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Frequent Body Complaints:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="frequentBodyComplaintsSelPast"
                      value="Yes"
                      checked={
                        localFormData.frequentBodyComplaintsSelPast === "Yes"
                      }
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="frequentBodyComplaintsSelPast"
                      value="No"
                      checked={
                        localFormData.frequentBodyComplaintsSelPast === "No"
                      }
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.frequentBodyComplaintsSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.frequentBodyComplaintsRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="frequentBodyComplaintsRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.frequentBodyComplaintsRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Eating Disorder */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Eating Disorder:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="eatingDisorderSelPast"
                      value="Yes"
                      checked={localFormData.eatingDisorderSelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="eatingDisorderSelPast"
                      value="No"
                      checked={localFormData.eatingDisorderSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.eatingDisorderSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.eatingDisorderRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="eatingDisorderRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.eatingDisorderRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Body Image Problems */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Body Image Problems:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="bodyImageProblemsSelPast"
                      value="Yes"
                      checked={localFormData.bodyImageProblemsSelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="bodyImageProblemsSelPast"
                      value="No"
                      checked={localFormData.bodyImageProblemsSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.bodyImageProblemsSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.bodyImageProblemsRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="bodyImageProblemsRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.bodyImageProblemsRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Repetitive Thoughts */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Repetitive Thoughts:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="repetitiveThoughtsSelPast"
                      value="Yes"
                      checked={
                        localFormData.repetitiveThoughtsSelPast === "Yes"
                      }
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="repetitiveThoughtsSelPast"
                      value="No"
                      checked={localFormData.repetitiveThoughtsSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.repetitiveThoughtsSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.repetitiveThoughtsRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="repetitiveThoughtsRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.repetitiveThoughtsRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Repetitive Behaviors */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Repetitive Behaviors:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="repetitiveBehaviorsSelPast"
                      value="Yes"
                      checked={
                        localFormData.repetitiveBehaviorsSelPast === "Yes"
                      }
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="repetitiveBehaviorsSelPast"
                      value="No"
                      checked={
                        localFormData.repetitiveBehaviorsSelPast === "No"
                      }
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.repetitiveBehaviorsSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.repetitiveBehaviorsRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="repetitiveBehaviorsRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.repetitiveBehaviorsRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Poor Impulse Control */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Poor Impulse Control:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="poorImpulseControlSelPast"
                      value="Yes"
                      checked={
                        localFormData.poorImpulseControlSelPast === "Yes"
                      }
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="poorImpulseControlSelPast"
                      value="No"
                      checked={localFormData.poorImpulseControlSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.poorImpulseControlSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.poorImpulseControlRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="poorImpulseControlRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.poorImpulseControlRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Self Mutilation */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Self Mutilation:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="selfMutilationSelPast"
                      value="Yes"
                      checked={localFormData.selfMutilationSelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="selfMutilationSelPast"
                      value="No"
                      checked={localFormData.selfMutilationSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.selfMutilationSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.selfMutilationRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="selfMutilationRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.selfMutilationRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Sexual Abuse */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Sexual Abuse:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="sexualAbuseSelPast"
                      value="Yes"
                      checked={localFormData.sexualAbuseSelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="sexualAbuseSelPast"
                      value="No"
                      checked={localFormData.sexualAbuseSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.sexualAbuseSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.sexualAbuseRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="sexualAbuseRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.sexualAbuseRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Physical Abuse */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Physical Abuse:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="physicalAbuseSelPast"
                      value="Yes"
                      checked={localFormData.physicalAbuseSelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="physicalAbuseSelPast"
                      value="No"
                      checked={localFormData.physicalAbuseSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.physicalAbuseSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.physicalAbuseRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="physicalAbuseRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.physicalAbuseRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Emotional Abuse */}
                <li class="list-group-item">
                  <div class="form-check form-check-inline">
                    <span>Emotional Abuse:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="emotionalAbuseSelPast"
                      value="Yes"
                      checked={localFormData.emotionalAbuseSelPast === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="emotionalAbuseSelPast"
                      value="No"
                      checked={localFormData.emotionalAbuseSelPast === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.emotionalAbuseSelPast === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.emotionalAbuseRatingPast}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="emotionalAbuseRatingPast"
                          min="1"
                          max="10"
                          value={localFormData.emotionalAbuseRatingPast}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
            id="buttonCard"
            onClick={ButtonBack}
          >
            Back
          </button>
          <button
            className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
            id="buttonCard"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

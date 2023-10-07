import { useState, useEffect } from "react";
import "../../css/wellnessCustomScroll.css";
export const CardEight = ({ ButtonBack, ButtonNext, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    depressedMoodNowSel: "",
    depressedMoodRatingNow: "",
    irritabilitySelNow: "",
    irritabilityRatingNow: "",
    moodSwingsSelNow: "",
    moodSwingsRatingNow: "",
    rapidSpeechSelNow: "",
    rapidSpeechRatingNow: "",
    racingThoughtsSelNow: "",
    racingThoughtsRatingNow: "",
    anxietySelNow: "",
    anxietyRatingNow: "",
    constantWorrySelNow: "",
    constantWorryRatingNow: "",
    panicAttacksSelNow: "",
    panicAttacksRatingNow: "",
    phobiasSelNow: "",
    phobiasRatingNow: "",
    sleepDisturbancesSelNow: "",
    sleepDisturbancesRatingNow: "",
    hallucinationsSelNow: "",
    hallucinationsRatingNow: "",
    paranoiaSelNow: "",
    paranoiaRatingNow: "",
    poorConcentrationSelNow: "",
    poorConcentrationRatingNow: "",
    alcoholSubstanceAbuseSelNow: "",
    alcoholSubstanceAbuseRatingNow: "",
    frequentBodyComplaintsSelNow: "",
    frequentBodyComplaintsRatingNow: "",
    eatingDisorderSelNow: "",
    eatingDisorderRatingNow: "",
    bodyImageProblemsSelNow: "",
    bodyImageProblemsRatingNow: "",
    repetitiveThoughtsSelNow: "",
    repetitiveThoughtsRatingNow: "",
    repetitiveBehaviorsSelNow: "",
    repetitiveBehaviorsRatingNow: "",
    poorImpulseControlSelNow: "",
    poorImpulseControlRatingNow: "",
    selfMutilationSelNow: "",
    selfMutilationRatingNow: "",
    sexualAbuseSelNow: "",
    sexualAbuseRatingNow: "",
    physicalAbuseSelNow: "",
    physicalAbuseRatingNow: "",
    emotionalAbuseSelNow: "",
    emotionalAbuseRatingNow: "",
  });

  useEffect(() => {
    setLocalFormData(
      formData ?? {
        depressedMoodNowSel: "",
        depressedMoodRatingNow: "",
        irritabilitySelNow: "",
        irritabilityRatingNow: "",
        moodSwingsSelNow: "",
        moodSwingsRatingNow: "",
        rapidSpeechSelNow: "",
        rapidSpeechRatingNow: "",
        racingThoughtsSelNow: "",
        racingThoughtsRatingNow: "",
        anxietySelNow: "",
        anxietyRatingNow: "",
        constantWorrySelNow: "",
        constantWorryRatingNow: "",
        panicAttacksSelNow: "",
        panicAttacksRatingNow: "",
        phobiasSelNow: "",
        phobiasRatingNow: "",
        sleepDisturbancesSelNow: "",
        sleepDisturbancesRatingNow: "",
        hallucinationsSelNow: "",
        hallucinationsRatingNow: "",
        paranoiaSelNow: "",
        paranoiaRatingNow: "",
        poorConcentrationSelNow: "",
        poorConcentrationRatingNow: "",
        alcoholSubstanceAbuseSelNow: "",
        alcoholSubstanceAbuseRatingNow: "",
        frequentBodyComplaintsSelNow: "",
        frequentBodyComplaintsRatingNow: "",
        eatingDisorderSelNow: "",
        eatingDisorderRatingNow: "",
        bodyImageProblemsSelNow: "",
        bodyImageProblemsRatingNow: "",
        repetitiveThoughtsSelNow: "",
        repetitiveThoughtsRatingNow: "",
        repetitiveBehaviorsSelNow: "",
        repetitiveBehaviorsRatingNow: "",
        poorImpulseControlSelNow: "",
        poorImpulseControlRatingNow: "",
        selfMutilationSelNow: "",
        selfMutilationRatingNow: "",
        sexualAbuseSelNow: "",
        sexualAbuseRatingNow: "",
        physicalAbuseSelNow: "",
        physicalAbuseRatingNow: "",
        emotionalAbuseSelNow: "",
        emotionalAbuseRatingNow: "",
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
  const handleNext = (event) => {
    event.preventDefault();
    console.log(localFormData); // Log form data
    ButtonNext(localFormData); // Call the ButtonNext function with form data
  };

  return (
    <div>
      <form onSubmit={handleNext}>
        <div className="container-fluid d-flex justify-content-center">
          <div className="card" style={{ width: 60 + "rem" }}>
            {/* Experience Now */}
            <div className="card-header">Are you now experiencing:</div>
            <div className="custom-scroll-container">
              <ul className="list-group list-group-flush">
                {/* Depressed Mood/Sadness */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Depressed Mood or Sadness:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="depressedMoodNowSel"
                      value="Yes"
                      checked={localFormData.depressedMoodNowSel === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="depressedMoodNowSel"
                      value="No"
                      checked={localFormData.depressedMoodNowSel === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">No</label>

                    {localFormData.depressedMoodNowSel === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.depressedMoodRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="depressedMoodRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.depressedMoodRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Irritability/Anger */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Irritability or Anger:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="irritabilitySelNow"
                      value="Yes"
                      checked={localFormData.irritabilitySelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="irritabilitySelNow"
                      value="No"
                      checked={localFormData.irritabilitySelNow === "No"}
                      onChange={handleChange}
                      required
                    />

                    <label class="form-check-label ms-1">No</label>
                    {localFormData.irritabilitySelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.irritabilityRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="irritabilityRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.irritabilityRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Mood Swings */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Mood Swings:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="moodSwingsSelNow"
                      value="Yes"
                      checked={localFormData.moodSwingsSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="moodSwingsSelNow"
                      value="No"
                      checked={localFormData.moodSwingsSelNow === "No"}
                      onChange={handleChange}
                      required
                    />

                    <label class="form-check-label ms-1">No</label>
                    {localFormData.moodSwingsSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.moodSwingsRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="moodSwingsRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.moodSwingsRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Rapid Speech */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Rapid Speech:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="rapidSpeechSelNow"
                      value="Yes"
                      checked={localFormData.rapidSpeechSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="rapidSpeechSelNow"
                      value="No"
                      checked={localFormData.rapidSpeechSelNow === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.rapidSpeechSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.rapidSpeechRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="rapidSpeechRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.rapidSpeechRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Racing Thoughts */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Racing Thoughts:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="racingThoughtsSelNow"
                      value="Yes"
                      checked={localFormData.racingThoughtsSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="racingThoughtsSelNow"
                      value="No"
                      checked={localFormData.racingThoughtsSelNow === "No"}
                      onChange={handleChange}
                      required
                    />

                    <label class="form-check-label ms-1">No</label>
                    {localFormData.racingThoughtsSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.racingThoughtsRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="racingThoughtsRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.racingThoughtsRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Anxiety */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Anxiety:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="anxietySelNow"
                      value="Yes"
                      checked={localFormData.anxietySelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="anxietySelNow"
                      value="No"
                      checked={localFormData.anxietySelNow === "No"}
                      onChange={handleChange}
                      required
                    />

                    <label class="form-check-label ms-1">No</label>
                    {localFormData.anxietySelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.anxietyRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="anxietyRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.anxietyRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Constant Worry */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Constant Worry:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="constantWorrySelNow"
                      value="Yes"
                      checked={localFormData.constantWorrySelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="constantWorrySelNow"
                      value="No"
                      checked={localFormData.constantWorrySelNow === "No"}
                      onChange={handleChange}
                      required
                    />

                    <label class="form-check-label ms-1">No</label>
                    {localFormData.constantWorrySelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.constantWorryRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="constantWorryRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.constantWorryRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Panic Attacks */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Panic Attacks:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="panicAttacksSelNow"
                      value="Yes"
                      checked={localFormData.panicAttacksSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="panicAttacksSelNow"
                      value="No"
                      checked={localFormData.panicAttacksSelNow === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.panicAttacksSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.panicAttacksRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="panicAttacksRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.panicAttacksRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Phobias */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Phobias:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="phobiasSelNow"
                      value="Yes"
                      checked={localFormData.phobiasSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="phobiasSelNow"
                      value="No"
                      checked={localFormData.phobiasSelNow === "No"}
                      onChange={handleChange}
                      required
                    />

                    <label class="form-check-label ms-1">No</label>
                    {localFormData.phobiasSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.phobiasRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="phobiasRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.phobiasRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Sleep Disturbances */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Sleep Disturbances:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="sleepDisturbancesSelNow"
                      value="Yes"
                      checked={localFormData.sleepDisturbancesSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="sleepDisturbancesSelNow"
                      value="No"
                      checked={localFormData.sleepDisturbancesSelNow === "No"}
                      onChange={handleChange}
                      required
                    />

                    <label class="form-check-label ms-1">No</label>
                    {localFormData.sleepDisturbancesSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.sleepDisturbancesRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="sleepDisturbancesRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.sleepDisturbancesRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Hallucinations */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Hallucinations:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="hallucinationsSelNow"
                      value="Yes"
                      checked={localFormData.hallucinationsSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="hallucinationsSelNow"
                      value="No"
                      checked={localFormData.hallucinationsSelNow === "No"}
                      onChange={handleChange}
                      required
                    />

                    <label class="form-check-label ms-1">No</label>
                    {localFormData.hallucinationsSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.hallucinationsRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="hallucinationsRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.hallucinationsRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Paranoia */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Paranoia:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="paranoiaSelNow"
                      value="Yes"
                      checked={localFormData.paranoiaSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="paranoiaSelNow"
                      value="No"
                      checked={localFormData.paranoiaSelNow === "No"}
                      onChange={handleChange}
                      required
                    />

                    <label class="form-check-label ms-1">No</label>
                    {localFormData.paranoiaSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.paranoiaRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="paranoiaRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.paranoiaRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Poor Concentration */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Poor Concentration:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="poorConcentrationSelNow"
                      value="Yes"
                      checked={localFormData.poorConcentrationSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="poorConcentrationSelNow"
                      value="No"
                      checked={localFormData.poorConcentrationSelNow === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.poorConcentrationSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.poorConcentrationRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="poorConcentrationRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.poorConcentrationRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Alcohol Substance Abuse */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Alcohol Substance Abuse:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="alcoholSubstanceAbuseSelNow"
                      value="Yes"
                      checked={
                        localFormData.alcoholSubstanceAbuseSelNow === "Yes"
                      }
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="alcoholSubstanceAbuseSelNow"
                      value="No"
                      checked={
                        localFormData.alcoholSubstanceAbuseSelNow === "No"
                      }
                      onChange={handleChange}
                      required
                    />

                    <label class="form-check-label ms-1">No</label>
                    {localFormData.alcoholSubstanceAbuseSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.alcoholSubstanceAbuseRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="alcoholSubstanceAbuseRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.alcoholSubstanceAbuseRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Frequent Body Complaints */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Frequent Body Complaints:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="frequentBodyComplaintsSelNow"
                      value="Yes"
                      checked={
                        localFormData.frequentBodyComplaintsSelNow === "Yes"
                      }
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="frequentBodyComplaintsSelNow"
                      value="No"
                      checked={
                        localFormData.frequentBodyComplaintsSelNow === "No"
                      }
                      onChange={handleChange}
                      required
                    />

                    <label class="form-check-label ms-1">No</label>
                    {localFormData.frequentBodyComplaintsSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.frequentBodyComplaintsRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="frequentBodyComplaintsRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.frequentBodyComplaintsRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Eating Disorder */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Eating Disorder:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="eatingDisorderSelNow"
                      value="Yes"
                      checked={localFormData.eatingDisorderSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="eatingDisorderSelNow"
                      value="No"
                      checked={localFormData.eatingDisorderSelNow === "No"}
                      onChange={handleChange}
                      required
                    />

                    <label class="form-check-label ms-1">No</label>
                    {localFormData.eatingDisorderSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.eatingDisorderRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="eatingDisorderRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.eatingDisorderRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Body Image Problems */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Body Image Problems:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="bodyImageProblemsSelNow"
                      value="Yes"
                      checked={localFormData.bodyImageProblemsSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="bodyImageProblemsSelNow"
                      value="No"
                      checked={localFormData.bodyImageProblemsSelNow === "No"}
                      onChange={handleChange}
                      required
                    />

                    <label class="form-check-label ms-1">No</label>
                    {localFormData.bodyImageProblemsSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.bodyImageProblemsRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="bodyImageProblemsRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.bodyImageProblemsRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Repetitive Thoughts */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Repetitive Thoughts:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="repetitiveThoughtsSelNow"
                      value="Yes"
                      checked={localFormData.repetitiveThoughtsSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="repetitiveThoughtsSelNow"
                      value="No"
                      checked={localFormData.repetitiveThoughtsSelNow === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.repetitiveThoughtsSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.repetitiveThoughtsRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="repetitiveThoughtsRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.repetitiveThoughtsRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Repetitive Behaviors */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Repetitive Behaviors:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="repetitiveBehaviorsSelNow"
                      value="Yes"
                      checked={
                        localFormData.repetitiveBehaviorsSelNow === "Yes"
                      }
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="repetitiveBehaviorsSelNow"
                      value="No"
                      checked={localFormData.repetitiveBehaviorsSelNow === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.repetitiveBehaviorsSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.repetitiveBehaviorsRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="repetitiveBehaviorsRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.repetitiveBehaviorsRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Poor Impulse Control */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Poor Impulse Control:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="poorImpulseControlSelNow"
                      value="Yes"
                      checked={localFormData.poorImpulseControlSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="poorImpulseControlSelNow"
                      value="No"
                      checked={localFormData.poorImpulseControlSelNow === "No"}
                      onChange={handleChange}
                      required
                    />

                    <label class="form-check-label ms-1">No</label>
                    {localFormData.poorImpulseControlSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.poorImpulseControlRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="poorImpulseControlRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.poorImpulseControlRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Self Mutilation */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Self Mutilation:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="selfMutilationSelNow"
                      value="Yes"
                      checked={localFormData.selfMutilationSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="selfMutilationSelNow"
                      value="No"
                      checked={localFormData.selfMutilationSelNow === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.selfMutilationSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.selfMutilationRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="selfMutilationRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.selfMutilationRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Sexual Abuse */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Sexual Abuse:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="sexualAbuseSelNow"
                      value="Yes"
                      checked={localFormData.sexualAbuseSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="sexualAbuseSelNow"
                      value="No"
                      checked={localFormData.sexualAbuseSelNow === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.sexualAbuseSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.sexualAbuseRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="sexualAbuseRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.sexualAbuseRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Physical Abuse */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Physical Abuse:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="physicalAbuseSelNow"
                      value="Yes"
                      checked={localFormData.physicalAbuseSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="physicalAbuseSelNow"
                      value="No"
                      checked={localFormData.physicalAbuseSelNow === "No"}
                      onChange={handleChange}
                      required
                    />
                    <label class="form-check-label ms-1">No</label>
                    {localFormData.physicalAbuseSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.physicalAbuseRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="physicalAbuseRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.physicalAbuseRatingNow}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </li>

                {/* Emotional Abuse */}
                <li className="list-group-item">
                  <div className="form-check form-check-inline">
                    <span>Emotional Abuse:</span>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="emotionalAbuseSelNow"
                      value="Yes"
                      checked={localFormData.emotionalAbuseSelNow === "Yes"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label ms-1">Yes</label>
                    <input
                      className="form-check--input ms-2 rounded-5"
                      type="radio"
                      name="emotionalAbuseSelNow"
                      value="No"
                      checked={localFormData.emotionalAbuseSelNow === "No"}
                      onChange={handleChange}
                      required
                    />

                    <label class="form-check-label ms-1">No</label>
                    {localFormData.emotionalAbuseSelNow === "Yes" && (
                      <div class="input-group">
                        <span class="me-2 d-flex align-items-center">
                          Rating Scale 1-10 (10 = worst):{" "}
                          {localFormData.emotionalAbuseRatingNow}
                        </span>
                        <input
                          type="range"
                          class="form-range custom-range"
                          name="emotionalAbuseRatingNow"
                          min="1"
                          max="10"
                          value={localFormData.emotionalAbuseRatingNow}
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
        <div
          className="d-flex justify-content-end"
          style={{
            paddingRight: 25 + "px",
            paddingTop: 10 + "px",
            paddingBottom: 5 + "px",
          }}
        >
          <button
            className="btn nav-link fs-5 rounded-4 me-3"
            id="buttonCard"
            onClick={ButtonBack}
          >
            Back
          </button>
          <button className="btn nav-link fs-5  rounded-4" id="buttonCard">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

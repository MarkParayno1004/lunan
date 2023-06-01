import { useState } from "react";
export const CardNine = ({ ButtonBack, ButtonNext }) => {
  //! Radio Button for Experiences
  const [PastExp, setPastExp] = useState({
    depressedMood: false,
    irritability: false,
    moodSwings: false,
    rapidSpeech: false,
    racingThoughts: false,
    anxiety: false,
    constantWorry: false,
    panicAttacks: false,
    phobias: false,
    sleepDisturbances: false,
    hallucinations: false,
    paranoia: false,
    poorConcentration: false,
    alcoholSubstanceAbuse: false,
    frequentBodyComplaints: false,
    eatingDisorder: false,
    bodyImageProblems: false,
    repetitiveThoughts: false,
    repetitiveBehaviors: false,
    poorImpulseControl: false,
    selfMutilation: false,
    sexualAbuse: false,
    physicalAbuse: false,
    emotionalAbuse: false,
  });
  const handleChange2 = (event) => {
    const { name, value } = event.target;
    const updatedPastExp = { ...PastExp };
    updatedPastExp[name] = value === "yes";
    setPastExp(updatedPastExp);
  };

  return (
    <div>
      <div className="container-fluid d-flex justify-content-center mt-3">
        <div className="card" style={{ width: 50 + "rem" }}>
          {/* Experience Now */}
          <div className="card-header">Have you experienced in the past:</div>
          <ul className="list-group list-group-flush">
            {/* Depressed Mood/Sadness */}
            <li className="list-group-item">
              <div className="form-check form-check-inline">
                <span>Depressed Mood or Sadness:</span>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="depressedMood"
                  value="yes"
                  checked={PastExp.depressedMood}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="depressedMood"
                  value="no"
                  checked={!PastExp.depressedMood}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>

                {PastExp.depressedMood && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="depressedMoodRating"
                      min="1"
                      max="10"
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
                  name="irritability"
                  value="yes"
                  checked={PastExp.irritability}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="irritability"
                  value="no"
                  checked={!PastExp.irritability}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.irritability && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="irritabilityRating"
                      min="1"
                      max="10"
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
                  name="moodSwings"
                  value="yes"
                  checked={PastExp.moodSwings}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="moodSwings"
                  value="no"
                  checked={!PastExp.moodSwings}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.moodSwings && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="moodSwingsRating"
                      min="1"
                      max="10"
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
                  name="rapidSpeech"
                  value="yes"
                  checked={PastExp.rapidSpeech}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="rapidSpeech"
                  value="no"
                  checked={!PastExp.rapidSpeech}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.rapidSpeech && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="rapidSpeechRating"
                      min="1"
                      max="10"
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
                  name="racingThoughts"
                  value="yes"
                  checked={PastExp.racingThoughts}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="racingThoughts"
                  value="no"
                  checked={!PastExp.racingThoughts}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.racingThoughts && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="racingThoughtsRating"
                      min="1"
                      max="10"
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
                  name="anxiety"
                  value="yes"
                  checked={PastExp.anxiety}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="anxiety"
                  value="no"
                  checked={!PastExp.anxiety}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.anxiety && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="anxietyRating"
                      min="1"
                      max="10"
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
                  name="constantWorry"
                  value="yes"
                  checked={PastExp.constantWorry}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="constantWorry"
                  value="no"
                  checked={!PastExp.constantWorry}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.constantWorry && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="constantWorryRating"
                      min="1"
                      max="10"
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
                  name="panicAttacks"
                  value="yes"
                  checked={PastExp.panicAttacks}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="panicAttacks"
                  value="no"
                  checked={!PastExp.panicAttacks}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.panicAttacks && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="panicAttacksRating"
                      min="1"
                      max="10"
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
                  name="phobias"
                  value="yes"
                  checked={PastExp.phobias}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="phobias"
                  value="no"
                  checked={!PastExp.phobias}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.phobias && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="phobiasRating"
                      min="1"
                      max="10"
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
                  name="sleepDisturbances"
                  value="yes"
                  checked={PastExp.sleepDisturbances}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="sleepDisturbances"
                  value="no"
                  checked={!PastExp.sleepDisturbances}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.sleepDisturbances && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="sleepDisturbancesRating"
                      min="1"
                      max="10"
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
                  name="hallucinations"
                  value="yes"
                  checked={PastExp.hallucinations}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="hallucinations"
                  value="no"
                  checked={!PastExp.hallucinations}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.hallucinations && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="hallucinationsRating"
                      min="1"
                      max="10"
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
                  name="paranoia"
                  value="yes"
                  checked={PastExp.paranoia}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="paranoia"
                  value="no"
                  checked={!PastExp.paranoia}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.paranoia && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="paranoiaRating"
                      min="1"
                      max="10"
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
                  name="poorConcentration"
                  value="yes"
                  checked={PastExp.poorConcentration}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="poorConcentration"
                  value="no"
                  checked={!PastExp.poorConcentration}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.poorConcentration && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="poorConcentrationRating"
                      min="1"
                      max="10"
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
                  name="alcoholSubstanceAbuse"
                  value="yes"
                  checked={PastExp.alcoholSubstanceAbuse}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="alcoholSubstanceAbuse"
                  value="no"
                  checked={!PastExp.alcoholSubstanceAbuse}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.alcoholSubstanceAbuse && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="alcoholSubstanceAbuseRating"
                      min="1"
                      max="10"
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
                  name="frequentBodyComplaints"
                  value="yes"
                  checked={PastExp.frequentBodyComplaints}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="frequentBodyComplaints"
                  value="no"
                  checked={!PastExp.frequentBodyComplaints}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.frequentBodyComplaints && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="frequentBodyComplaintsRating"
                      min="1"
                      max="10"
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
                  name="eatingDisorder"
                  value="yes"
                  checked={PastExp.eatingDisorder}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="eatingDisorder"
                  value="no"
                  checked={!PastExp.eatingDisorder}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.eatingDisorder && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="eatingDisorderRating"
                      min="1"
                      max="10"
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
                  name="bodyImageProblems"
                  value="yes"
                  checked={PastExp.bodyImageProblems}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="bodyImageProblems"
                  value="no"
                  checked={!PastExp.bodyImageProblems}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.bodyImageProblems && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="bodyImageProblemsRating"
                      min="1"
                      max="10"
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
                  name="repetitiveThoughts"
                  value="yes"
                  checked={PastExp.repetitiveThoughts}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="repetitiveThoughts"
                  value="no"
                  checked={!PastExp.repetitiveThoughts}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.repetitiveThoughts && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="repetitiveThoughtsRating"
                      min="1"
                      max="10"
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
                  name="repetitiveBehaviors"
                  value="yes"
                  checked={PastExp.repetitiveBehaviors}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="repetitiveBehaviors"
                  value="no"
                  checked={!PastExp.repetitiveBehaviors}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.repetitiveBehaviors && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="repetitiveBehaviorsRating"
                      min="1"
                      max="10"
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
                  name="poorImpulseControl"
                  value="yes"
                  checked={PastExp.poorImpulseControl}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="poorImpulseControl"
                  value="no"
                  checked={!PastExp.poorImpulseControl}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.poorImpulseControl && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="poorImpulseControlRating"
                      min="1"
                      max="10"
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
                  name="selfMutilation"
                  value="yes"
                  checked={PastExp.selfMutilation}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="selfMutilation"
                  value="no"
                  checked={!PastExp.selfMutilation}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.selfMutilation && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="selfMutilationRating"
                      min="1"
                      max="10"
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
                  name="sexualAbuse"
                  value="yes"
                  checked={PastExp.sexualAbuse}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="sexualAbuse"
                  value="no"
                  checked={!PastExp.sexualAbuse}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.sexualAbuse && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="sexualAbuseRating"
                      min="1"
                      max="10"
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
                  name="physicalAbuse"
                  value="yes"
                  checked={PastExp.physicalAbuse}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="physicalAbuse"
                  value="no"
                  checked={!PastExp.physicalAbuse}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.physicalAbuse && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="physicalAbuseRating"
                      min="1"
                      max="10"
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
                  name="emotionalAbuse"
                  value="yes"
                  checked={PastExp.emotionalAbuse}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="emotionalAbuse"
                  value="no"
                  checked={!PastExp.emotionalAbuse}
                  onChange={handleChange2}
                />
                <label className="form-check-label ms-1">No</label>
                {PastExp.emotionalAbuse && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Rating Scale 1-10 (10 = worst):
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-4 mt-2"
                      name="emotionalAbuseRating"
                      min="1"
                      max="10"
                      required
                    />
                  </div>
                )}
              </div>
            </li>
          </ul>
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
          onClick={ButtonNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

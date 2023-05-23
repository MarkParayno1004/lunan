import { useState } from "react";
export const CardEight = ({ ButtonBack, ButtonNext }) => {
    //! Radio Button for Experiences
    const [ExpNow, setExpNow] = useState({
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
    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedExpNow = { ...ExpNow };
        updatedExpNow[name] = value === 'yes';
        setExpNow(updatedExpNow);
    };

    return (
        <div>
            <div class="container-fluid d-flex justify-content-center mt-3">
                <div class="card" style={{width: 50 + "rem"}}>
                    {/* Experience Now */}
                    <div class="card-header">Are you now experiencing:</div>
                    <ul class="list-group list-group-flush">

                        {/* Depressed Mood/Sadness */}
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Depressed Mood or Sadness:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="depressedMood"
                                    value="yes"
                                    checked={ExpNow.depressedMood}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="depressedMood"
                                    value="no"
                                    checked={!ExpNow.depressedMood}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                
                                {ExpNow.depressedMood && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Irritability or Anger:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="irritability"
                                    value="yes"
                                    checked={ExpNow.irritability}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="irritability"
                                    value="no"
                                    checked={!ExpNow.irritability}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.irritability && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Mood Swings:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="moodSwings"
                                    value="yes"
                                    checked={ExpNow.moodSwings}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="moodSwings"
                                    value="no"
                                    checked={!ExpNow.moodSwings}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.moodSwings && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Rapid Speech:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="rapidSpeech"
                                    value="yes"
                                    checked={ExpNow.rapidSpeech}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="rapidSpeech"
                                    value="no"
                                    checked={!ExpNow.rapidSpeech}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.rapidSpeech && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Racing Thoughts:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="racingThoughts"
                                    value="yes"
                                    checked={ExpNow.racingThoughts}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="racingThoughts"
                                    value="no"
                                    checked={!ExpNow.racingThoughts}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.racingThoughts && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):    
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Anxiety:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="anxiety"
                                    value="yes"
                                    checked={ExpNow.anxiety}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="anxiety"
                                    value="no"
                                    checked={!ExpNow.anxiety}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.anxiety && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Constant Worry:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="constantWorry"
                                    value="yes"
                                    checked={ExpNow.constantWorry}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="constantWorry"
                                    value="no"
                                    checked={!ExpNow.constantWorry}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.constantWorry && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Panic Attacks:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="panicAttacks"
                                    value="yes"
                                    checked={ExpNow.panicAttacks}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="panicAttacks"
                                    value="no"
                                    checked={!ExpNow.panicAttacks}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.panicAttacks && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Phobias:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="phobias"
                                    value="yes"
                                    checked={ExpNow.phobias}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="phobias"
                                    value="no"
                                    checked={!ExpNow.phobias}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.phobias && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Sleep Disturbances:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="sleepDisturbances"
                                    value="yes"
                                    checked={ExpNow.sleepDisturbances}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="sleepDisturbances"
                                    value="no"
                                    checked={!ExpNow.sleepDisturbances}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.sleepDisturbances && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Hallucinations:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="hallucinations"
                                    value="yes"
                                    checked={ExpNow.hallucinations}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="hallucinations"
                                    value="no"
                                    checked={!ExpNow.hallucinations}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.hallucinations && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Paranoia:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="paranoia"
                                    value="yes"
                                    checked={ExpNow.paranoia}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="paranoia"
                                    value="no"
                                    checked={!ExpNow.paranoia}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.paranoia && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Poor Concentration:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="poorConcentration"
                                    value="yes"
                                    checked={ExpNow.poorConcentration}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="poorConcentration"
                                    value="no"
                                    checked={!ExpNow.poorConcentration}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.poorConcentration && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Alcohol Substance Abuse:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="alcoholSubstanceAbuse"
                                    value="yes"
                                    checked={ExpNow.alcoholSubstanceAbuse}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="alcoholSubstanceAbuse"
                                    value="no"
                                    checked={!ExpNow.alcoholSubstanceAbuse}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.alcoholSubstanceAbuse && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Frequent Body Complaints:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="frequentBodyComplaints"
                                    value="yes"
                                    checked={ExpNow.frequentBodyComplaints}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="frequentBodyComplaints"
                                    value="no"
                                    checked={!ExpNow.frequentBodyComplaints}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.frequentBodyComplaints && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Eating Disorder:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="eatingDisorder"
                                    value="yes"
                                    checked={ExpNow.eatingDisorder}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="eatingDisorder"
                                    value="no"
                                    checked={!ExpNow.eatingDisorder}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.eatingDisorder && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Body Image Problems:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="bodyImageProblems"
                                    value="yes"
                                    checked={ExpNow.bodyImageProblems}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="bodyImageProblems"
                                    value="no"
                                    checked={!ExpNow.bodyImageProblems}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.bodyImageProblems && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Repetitive Thoughts:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="repetitiveThoughts"
                                    value="yes"
                                    checked={ExpNow.repetitiveThoughts}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="repetitiveThoughts"
                                    value="no"
                                    checked={!ExpNow.repetitiveThoughts}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.repetitiveThoughts && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Repetitive Behaviors:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="repetitiveBehaviors"
                                    value="yes"
                                    checked={ExpNow.repetitiveBehaviors}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="repetitiveBehaviors"
                                    value="no"
                                    checked={!ExpNow.repetitiveBehaviors}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.repetitiveBehaviors && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Poor Impulse Control:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="poorImpulseControl"
                                    value="yes"
                                    checked={ExpNow.poorImpulseControl}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="poorImpulseControl"
                                    value="no"
                                    checked={!ExpNow.poorImpulseControl}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.poorImpulseControl && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Self Mutilation:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="selfMutilation"
                                    value="yes"
                                    checked={ExpNow.selfMutilation}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="selfMutilation"
                                    value="no"
                                    checked={!ExpNow.selfMutilation}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.selfMutilation && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Sexual Abuse:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="sexualAbuse"
                                    value="yes"
                                    checked={ExpNow.sexualAbuse}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="sexualAbuse"
                                    value="no"
                                    checked={!ExpNow.sexualAbuse}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.sexualAbuse && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Physical Abuse:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="physicalAbuse"
                                    value="yes"
                                    checked={ExpNow.physicalAbuse}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="physicalAbuse"
                                    value="no"
                                    checked={!ExpNow.physicalAbuse}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.physicalAbuse && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Emotional Abuse:</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="emotionalAbuse"
                                    value="yes"
                                    checked={ExpNow.emotionalAbuse}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="emotionalAbuse"
                                    value="no"
                                    checked={!ExpNow.emotionalAbuse}
                                    onChange={handleChange}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {ExpNow.emotionalAbuse && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Rating Scale 1-10 (10 = worst):
                                        </span>
                                        <input
                                            type="number"
                                            class="form-control rounded-4 mt-2"
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
    )
}


import { useState, useRef, useEffect } from "react";
export const CardTwelve = ({ ButtonBack, ButtonNext, formData }) => {
    const [localFormData, setLocalFormData] = useState({
        DepressionSel:"",
        DepressionMem:"",
        BipolarSel:"",
        AnxietySel:"",
        BipolarMem:"",
        AnxietyMem:"",
        PanicSel:"",
        PanicMem:"",
        SchizoSel:"",
        SchizoMem:"",
        AlcoholMem:"",
        EatingSel:"",
        EatingMem:"",
        LearningSel:"",
        LearningMem:"",
        TraumaSel:"",
        TraumaMem:"",
        SuicideSel:"",
        SuicideMem:"",
        PsychiatricSel:"",
        PsychiatricMem:"",
      });
    
      useEffect(() => {
        setLocalFormData(
          formData ?? {
            DepressionSel:"",
        DepressionMem:"",
        BipolarSel:"",
        AnxietySel:"",
        BipolarMem:"",
        AnxietyMem:"",
        PanicSel:"",
        PanicMem:"",
        SchizoSel:"",
        SchizoMem:"",
        AlcoholMem:"",
        EatingSel:"",
        EatingMem:"",
        LearningSel:"",
        LearningMem:"",
        TraumaSel:"",
        TraumaMem:"",
        SuicideSel:"",
        SuicideMem:"",
        PsychiatricSel:"",
        PsychiatricMem:"",
          }
        );
      }, [formData]);

    const handleDifficulty = (event) => {
        const { name, value } = event.target;
        const updatedDifficulty = { ...localFormData };
        updatedDifficulty[name] = value === 'yes';
        setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
    };
    return (
        <div>
            <div class="container-fluid d-flex justify-content-center mt-3">
                <div class="card" style={{width: 50 + "rem"}}>
                    <div class="card-header">
                    Has anyone in your family (either immediate family members or relatives) experienced difficulties with the
                        following? (circle any that apply and list family member, e.g., Sibling, Parent, Uncle, etc.):
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                                <span>Depression</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="DepressionSel"
                                    value="Yes"
                                    checked={localFormData.DepressionSel === "Yes"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="DepressionSel"
                                    value="No"
                                    checked={localFormData.DepressionSel === "No"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {localFormData.DepressionSel === "Yes" && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Family Member(s)
                                        </span>
                                        <input 
                                            type="text"
                                            class="form-control rounded-4 me-1"
                                            name="DepressionMem"
                                            value={localFormData.DepressionMem}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                            <span>Bipolar Disorder</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="BipolarSel"
                                    value="Yes"
                                    checked={localFormData.BipolarSel === "Yes"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="BipolarSel"
                                    value="No"
                                    checked={localFormData.BipolarSel==="No"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {localFormData.BipolarSel === "Yes" && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Family Member(s)
                                        </span>
                                        <input 
                                            type="text"
                                            class="form-control rounded-4 me-1"
                                            name="BipolarMem"
                                            value={localFormData.BipolarMem}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                            <span>Anxiety Disorder</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="AnxietySel"
                                    value="Yes"
                                    checked={localFormData.AnxietySel === "Yes"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="AnxietySel"
                                    value="No"
                                    checked={localFormData.AnxietySel === "No"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {localFormData.AnxietySel === "Yes" && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Family Member(s)
                                        </span>
                                        <input 
                                            type="text"
                                            class="form-control rounded-4 me-1"
                                            name="AnxietyMem"
                                            value={localFormData.AnxietyMem}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                            <span>Panic Attacks</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="PanicSel"
                                    value="Yes"
                                    checked={localFormData.PanicSel==="Yes"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="PanicSel"
                                    value="No"
                                    checked={localFormData.PanicSel==="No"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {localFormData.panicAttacks === "Yes" && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Family Member(s)
                                        </span>
                                        <input 
                                            type="text"
                                            class="form-control rounded-4 me-1"
                                            name="PanicMem"
                                            value={localFormData.PanicMem}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </li><li class="list-group-item">
                            <div class="form-check form-check-inline">
                            <span>Schizophrenia</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="SchizoSel"
                                    value="Yes"
                                    checked={localFormData.SchizoSel ==="Yes"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="SchizoSel"
                                    value="No"
                                    checked={localFormData.SchizoSel ==="No"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {localFormData.SchizoSel === "Yes" && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Family Member(s)
                                        </span>
                                        <input 
                                            type="text"
                                            class="form-control rounded-4 me-1"
                                            name="SchizoMem"
                                            value={localFormData.SchizoMem}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                            <span>Alcohol/Substance Abuse</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="AlcoholSel"
                                    value="Yes"
                                    checked={localFormData.AlcoholSel === "Yes"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="AlcoholSel"
                                    value="No"
                                    checked={localFormData.AlcoholSel === "No"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {localFormData.AlcoholSel === "Yes" && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Family Member(s)
                                        </span>
                                        <input 
                                            type="text"
                                            name="AlcoholMem"
                                            value={localFormData.AlcoholMem}
                                            class="form-control rounded-4 me-1"
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                            <span>Eating Disorder</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="EatingSel"
                                    value="Yes"
                                    checked={localFormData.EatingSel === "Yes"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="EatingSel"
                                    value="No"
                                    checked={localFormData.EatingSel === "No"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {localFormData.EatingSel === "Yes" && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Family Member(s)
                                        </span>
                                        <input 
                                            type="text"
                                            name="EatingMem"
                                            value={localFormData.EatingMem}
                                            class="form-control rounded-4 me-1"
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                            <span>Learning Disability</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="LearningSel"
                                    value="Yes"
                                    checked={localFormData.LearningSel === "Yes"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="LearningSel"
                                    value="No"
                                    checked={localFormData.LearningSel === "No"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {localFormData.LearningSel === "Yes"&& (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Family Member(s)
                                        </span>
                                        <input 
                                            type="text"
                                            class="form-control rounded-4 me-1"
                                            name="LearningMem"
                                            value={localFormData.LearningMem}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                            <span>Trauma History</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="TraumaSel"
                                    value="Yes"
                                    checked={localFormData.TraumaSel === "Yes"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="TraumaSel"
                                    value="No"
                                    checked={localFormData.TraumaSel === "No"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {localFormData.TraumaSel === "Yes" && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Family Member(s)
                                        </span>
                                        <input 
                                            type="text"
                                            class="form-control rounded-4 me-1"
                                            name="TraumaMem"
                                            value={localFormData.TraumaMem}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                            <span>Suicide Attempts</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="SuicideSel"
                                    value="Yes"
                                    checked={localFormData.SuicideSel === "Yes"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="SuicideSel"
                                    value="No"
                                    checked={localFormData.SuicideSel === "No"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {localFormData.SuicideSel === "Yes" && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Family Member(s)
                                        </span>
                                        <input 
                                            type="text"
                                            class="form-control rounded-4 me-1"
                                            name="SuicideMem"
                                            value={localFormData.SuicideMem}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check form-check-inline">
                            <span>Psychiatric Hospitalization</span>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="PsychiatricSel"
                                    value="Yes"
                                    checked={localFormData.PsychiatricSel === "Yes"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check--input ms-2 rounded-5"
                                    type="radio"
                                    name="PsychiatricSel"
                                    value="No"
                                    checked={localFormData.PsychiatricSel === "No"}
                                    onChange={handleDifficulty}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {localFormData.PsychiatricSel==="Yes" && (
                                    <div class="input-group">
                                        <span class="me-2 d-flex align-items-center">
                                            Family Member(s)
                                        </span>
                                        <input 
                                            type="text"
                                            class="form-control rounded-4 me-1"
                                            name="PsychiatricMem"
                                            value={localFormData.PsychiatricMem}
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
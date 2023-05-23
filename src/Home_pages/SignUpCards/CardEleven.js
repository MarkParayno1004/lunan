import { useState } from "react";
import { useRef } from "react";
export const CardEleven = ({ ButtonBack, ButtonNext}) => {
    const [parentStatus, setParentStatus] = useState({
        stillTogether: false,
        divorced: false,
        remarried: false,
        unmarried: false,
        deceased: false,
    });
    const dateDivorcedInputRef = useRef(null);
    const handleParentStatus = (e) => {
        const { name, value } = e.target;
        const updateparentStatus = { ...parentStatus};
        updateparentStatus[name] = value === 'yes';
        setParentStatus(updateparentStatus);
    };

    const [numberOfSiblings, setNumberOfSiblings] = useState();
    const handleNumberOfSiblings = (e) => {
        setNumberOfSiblings(e.target.value);
    };

    const [siblingAges, setSiblingAges] = useState();
    const handleSiblingAges = (e) => {
        setSiblingAges(e.target.value);
    };

    const [showFamilySupport, setFamilySupport] = useState("false");
    const handleFamilySupport = (e) => {
        setFamilySupport(e.target.value === "true");
    };

    return(
        <div>
            <div className="container-fluid d-flex justify-content-center mt-3">
                <div class="card" style={{ width: 50 + "rem"}}>
                    <div class="card-header">
                        Family History:
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <span className="me-2 d-flex align-items-center">
                                Are your parents:
                            </span>
                            <div class="input-group">
                                <input
                                    type="radio"
                                    className="form-check-input ms-2"
                                    name="parentStatus"
                                    value="yes"
                                    checked={!parentStatus.stillTogether}
                                    onChange={handleParentStatus}
                                />
                                <label className="form-check-label ms-1">
                                    Still Together
                                </label>
                                <input
                                    type="radio"
                                    className="form-check-input ms-2"
                                    name="parentStatus"
                                    value="no"
                                    checked={!parentStatus.divorced}
                                    onChange={handleParentStatus}
                                />
                                <label className="form-check-label ms-1">
                                    Divorced 
                                </label>
                                {parentStatus.divorced && (
                                    <div class="input-group">
                                    <span class="me-2 d-flex align-items-center">
                                        When:
                                    </span>
                                    <input
                                        type="date"
                                        class="form-control rounded-4 me-1"
                                        ref={dateDivorcedInputRef}
                                        onChange={handleParentStatus}
                                    />
                                </div>
                                )}

                                <input
                                    type="radio"
                                    className="form-check-input ms-2"
                                    name="parentStatus"
                                    value="yes"
                                    checked={!parentStatus.remarried}
                                    onChange={handleParentStatus}
                                />
                                <label className="form-check-label ms-1">
                                    Remarried
                                </label>
                                <input
                                    type="radio"
                                    className="form-check-input ms-2"
                                    name="parentStatus"
                                    value="yes"
                                    checked={!parentStatus.unmarried}
                                    onChange={handleParentStatus}
                                />
                                <label className="form-check-label ms-1">
                                    Unmarried
                                </label>
                                <input
                                    type="radio"
                                    className="form-check-input ms-2"
                                    name="parentStatus"
                                    value="no"
                                    checked={!parentStatus.deceased}
                                    onChange={handleParentStatus}
                                />
                                <label className="form-check-label ms-1">
                                    Deceased 
                                </label>
                                {parentStatus.deceased && (
                                    <div class="input-group">
                                    <span class="me-2 d-flex align-items-center">
                                        Who
                                    </span>
                                    <input
                                        type="text"
                                        class="form-control rounded-4 me-1"
                                        onChange={handleParentStatus}
                                    />
                                    <span class="me-2 d-flex align-items-center">
                                        age at Death
                                    </span>
                                    <input
                                        type="text"
                                        class="form-control rounded-4 me-1"
                                        onChange={handleParentStatus}
                                    />
                                </div>
                                )}
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div className="form-check-inline">
                                <span>Number of Siblings:</span>
                                <input
                                    type="number"
                                    className="form-control ms-2"
                                    name="siblings"
                                    value="siblings"
                                    onChange={handleNumberOfSiblings}
                                />
                                <span>Ages:</span>
                                <input
                                    type="number"
                                    className="form-control ms-2"
                                    name="siblingAge"
                                    value="siblingAge"
                                    onChange={handleSiblingAges}
                                />
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div className="form-check-inline">
                                <span>
                                    Do you have good family support?
                                </span>
                                <input
                                    type="radio"
                                    className="form-check-input ms-2"
                                    name="familySupport"
                                    value="true"
                                    onChange={handleFamilySupport}
                                />
                                <label className="form-check-label ms-1">Yes</label>
                                <input
                                    type="radio"
                                    className="form-check-input ms-2"
                                    name="familySupport"
                                    value="false"
                                    onChange={handleFamilySupport}
                                />
                                <label className="form-check-label ms-1">No</label>
                                {showFamilySupport && <SupportYes />}
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

const SupportYes = () => {
    const [getFamilySupport, setFamilySupport] = useState();
    const handleFamilySupport = (e) => {
        setFamilySupport(e.target.value);
    };
    return (
        <>
            <div class="input-group">
                <span class="me-2 d-flex align-items-center">
                    From whom:
                </span>
                <input
                    type="text"
                    class="form-control rounded-4 me-1"
                    onChange={handleFamilySupport}
                />
            </div>
        </>
    )
}
import { Link } from "react-router-dom";
import "../css/SupervisorDashboard.css";

export const SupervisorDashboard = () => {
    return (
        <div className="d-flex align-items-center" id="sdBG">
            <div className="container text-center">
                <div className="row align-items-start">
                    {/* All Patients List */}
                    <div className="col d-flex justify-content-end">
                        <Link to="/All Patients" style={{ textDecoration: "none" }}>
                            <div>
                                <div
                                    className="card rounded-5"
                                    style={{ width: 18 + "rem" }}
                                    id="cardBG"
                                >
                                    <p className="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                                        All Patients List
                                    </p>
                                    <div className="card-body">
                                        <img
                                            alt="all patients"
                                            src=""
                                            className="card-img-bottom"
                                            style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* New Patients */}
                    <div className="col d-flex justify-content-center">
                        <Link to="/New Patients" style={{ textDecoration: "none" }}>
                            <div>
                                <div
                                    className="card rounded-5"
                                    style={{ width: 18 + "rem" }}
                                    id="cardBG"
                                >
                                    <p className="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                                        New Patients
                                    </p>
                                    <div className="card-body">
                                        <img
                                            alt="new patients"
                                            src=""
                                            className="card-img-bottom"
                                            style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* All Counselors */}
                    <div className="col d-flex justify-content-center">
                        <Link to="/All Counselors" style={{ textDecoration: "none" }}>
                            <div>
                                <div
                                    className="card rounded-5"
                                    style={{ width: 18 + "rem" }}
                                    id="cardBG"
                                >
                                    <p className="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                                        All Counselors
                                    </p>
                                    <div className="card-body">
                                        <img
                                            alt="all counselors"
                                            src=""
                                            className="card-img-bottom"
                                            style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
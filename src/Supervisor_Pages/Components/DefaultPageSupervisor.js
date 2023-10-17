export const DefaultPageSupervisor = () => {
  return (
    <div className="container-lg d-flex justify-content-start">
      <div className="d-flex align-items-center mt-5">
        <div className="row">
          {/* Number of Patients*/}
          <div className="col">
            <div
              class="card"
              style={{
                width: 18 + "rem",
                backgroundColor: "#4d455d",
                color: "#f5e9cf",
              }}
            >
              <div class="card-body">
                <h5 class="card-title">Number of Patients</h5>
                <h6
                  class="card-subtitle mb-2 fw-normal"
                  style={{ color: "#f5e9cf" }}
                >
                  (69)
                </h6>
                <p class="card-text">
                  Here are the current number of patients.
                </p>
              </div>
            </div>
          </div>

          {/* Number of New Patients*/}
          <div className="col ms-5">
            <div
              class="card"
              style={{
                width: 18 + "rem",
                backgroundColor: "#4d455d",
                color: "#f5e9cf",
              }}
            >
              <div class="card-body">
                <h5 class="card-title">New Number of Patients</h5>
                <h6
                  class="card-subtitle mb-2 fw-normal"
                  style={{ color: "#f5e9cf" }}
                >
                  (69)
                </h6>
                <p class="card-text">Here are the new number of patients.</p>
              </div>
            </div>
          </div>

          {/* Number of Counselors*/}
          <div className="col ms-5">
            <div
              class="card"
              style={{
                width: 18 + "rem",
                backgroundColor: "#4d455d",
                color: "#f5e9cf",
              }}
            >
              <div class="card-body">
                <h5 class="card-title">Number of Counselors</h5>
                <h6
                  class="card-subtitle mb-2 fw-normal"
                  style={{ color: "#f5e9cf" }}
                >
                  (69)
                </h6>
                <p class="card-text">
                  Here are the current number of counselors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

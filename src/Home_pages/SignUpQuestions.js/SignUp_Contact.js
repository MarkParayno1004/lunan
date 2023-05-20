export const CONTACT = (props) => {
  return (
    <div class="mt-3">
      <div class="container text-center">
        <div class="row justify-content-start">
          <p class="d-flex justify-content-start">Local Address:</p>
          <div class="col">
            {/* Input Contact */}
            <input
              type="text"
              class="form-control  rounded-4 mb-3"
              placeholder="Street and Number/ City / Region / Zip"
              onChange={props.setLocalAddress}
            />
            <input
              type="text"
              class="form-control  rounded-4"
              placeholder="Home Phone/Cell Phone"
              onChange={props.setContact}
            />
            <div class="d-flex justify-content-start mt-2">
              <span>May I leave a message through email or number?</span>
              <div class="form-check-inline">
                <input
                  class="form-check-input ms-2  "
                  type="radio"
                  name="Approval"
                  value="Yes"
                  onChange={props.setChecked}
                />
                <label class="form-check-label ms-1">Yes</label>
              </div>
              <div class="form-check-inline">
                <input
                  class="form-check-input ms-2  "
                  type="radio"
                  name="Approval"
                  value="No"
                  onChange={props.setChecked}
                />
                <label class="form-check-label ms-1">No</label>
              </div>
            </div>
          </div>
          {/* Input Contact */}
          <div class="col ">
            <input
              type="text"
              class="form-control  rounded-4"
              placeholder="Email"
              onChange={props.setEmail}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

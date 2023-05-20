export const RBUTTON = (props) => {
  return (
    <>
      <div class="form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="gender"
          value="Male"
          onChange={props.handleInputGender}
        />
        <label class="form-check-label ms-1" for="exampleRadios1">
          Male
        </label>
      </div>
      <div class="form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="gender"
          value="Female"
          onChange={props.handleInputGender}
        />
        <label class="form-check-label ms-1" for="exampleRadios1">
          Female
        </label>
      </div>
      <div class="form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="gender"
          value="Transgender"
          onChange={props.handleInputGender}
        />
        <label class="form-check-label ms-1" for="exampleRadios1">
          Transgender
        </label>
      </div>
      <div class="form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="gender"
          value="Other"
          onChange={props.handleInputGender}
        />
        <label class="form-check-label ms-1" for="exampleRadios1">
          Other
        </label>
      </div>
    </>
  );
};

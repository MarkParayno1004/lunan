export const RBUTTONSP = (props) => {
  return (
    <>
      <span className="">Sexual Preference:</span>
      <div className="form-check-inline ms-2">
        <input
          className="form-check-input"
          type="radio"
          name="SexPreference"
          value="Men"
          onChange={props.handleInputSexPreference}
        />
        <label className="form-check-label ms-1">Men</label>
      </div>
      <div className="form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="SexPreference"
          value="Women"
          onChange={props.handleInputSexPreference}
        />
        <label className="form-check-label ms-1">Women</label>
      </div>
      <div className="form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="SexPreference"
          value="Both"
          onChange={props.handleInputSexPreference}
        />
        <label className="form-check-label ms-1" for="exampleRadios1">
          Both
        </label>
      </div>
    </>
  );
};

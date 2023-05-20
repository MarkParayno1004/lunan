export const RBUTTONMS = (props) => {
  return (
    <>
      <span className="">Marital Status:</span>
      <div className="form-check-inline ms-2">
        <input
          className="form-check-input"
          type="radio"
          name="MaritalStatus"
          value="Never Married"
          onChange={props.handleMaritalStatus}
        />
        <label className="form-check-label ms-1">Never Married</label>
      </div>
      <div className="form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="MaritalStatus"
          value="Partnered"
          onChange={props.handleMaritalStatus}
        />
        <label className="form-check-label ms-1">Partnered</label>
      </div>
      <div className="form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="MaritalStatus"
          value="Married"
          onChange={props.handleMaritalStatus}
        />
        <label className="form-check-label ms-1" for="exampleRadios1">
          Married
        </label>
      </div>
      <div className="form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="MaritalStatus"
          value="Separated"
          onChange={props.handleMaritalStatus}
        />
        <label className="form-check-label ms-1" for="exampleRadios1">
          Separated
        </label>
      </div>
      <div className="form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="MaritalStatus"
          value="Divorced"
          onChange={props.handleMaritalStatus}
        />
        <label className="form-check-label ms-1" for="exampleRadios1">
          Divorced
        </label>
      </div>
      <div className="form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="MaritalStatus"
          value="Widowed"
          onChange={props.handleMaritalStatus}
        />
        <label className="form-check-label ms-1" for="exampleRadios1">
          Widowed
        </label>
      </div>
    </>
  );
};

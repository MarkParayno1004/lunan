//!Emergency Contact Person - Assessment
export const CPERSON = (props) => {
  return (
    <>
      {/* Person to contact if emergency */}
      <p class="mt-3">Person to contact in case of an emergency:</p>
      <div class="input-group">
        <input
          type="text"
          aria-label="EmergencyFullName"
          placeholder="Full Name:"
          class="form-control me-3 rounded-4"
          onChange={props.contactFNPerson}
        />
        <input
          type="text"
          aria-label="Relationship"
          placeholder="Relationship to client"
          class="form-control me-3 rounded-4"
          onChange={props.contactRelationship}
        />
        <input
          type="text"
          aria-label="Phone"
          placeholder="Phone Number:"
          class="form-control rounded-4"
          onChange={props.contactEmgPhone}
        />
      </div>
      {/* Doctor Info */}
      <p class="mt-3">Patient Care doctor:</p>
      <div class="input-group mt-3">
        <input
          type="text"
          aria-label="DoctorFullName"
          placeholder="Full Name:"
          class="form-control me-3 rounded-4"
          onChange={props.doctorFName}
        />
        <input
          type="text"
          aria-label="DoctorPhone"
          placeholder="Phone Number:"
          class="form-control me-3 rounded-4"
          onChange={props.doctorPhone}
        />
      </div>
      <p class="mt-3">How did you learn about me? :</p>
      <div class="form-floating ">
        <textarea
          class="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          onChange={props.descriptionAREA}
        ></textarea>
        <label for="floatingTextarea">Comments</label>
      </div>
      <p class="mt-3">What prompted you to seek therapy or an assessment? :</p>
      <div class="form-floating ">
        <textarea
          class="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          onChange={props.descriptionAssessment}
        ></textarea>
        <label for="floatingTextarea">Comments</label>
      </div>
    </>
  );
};

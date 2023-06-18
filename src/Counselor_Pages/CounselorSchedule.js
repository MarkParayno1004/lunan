import { useState } from "react";
import Calendar from "react-calendar";
import "../css/CounselorSchedule.css";

export const CounselorSchedule = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div
      className="container-lg mt-5 pb-3 rounded-4 fw-normal d-flex justify-content-center"
      id="scheduleForm"
    >
      <div className="container-fluid">
        <div className="react-calendar mt-5 mb-4">
          <h1 className="text-center">Schedule</h1>
          <div className="calendar-container">
            <Calendar onChange={setDate} value={date} />
          </div>
          <p className="text-center mt-4">
            <span className="bold">Selected Date: {date.toDateString()}</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

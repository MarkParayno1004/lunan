import "../css/ViewAnswerWeek.css";
export const ViewAnswerWeek = () => {
  return (
    <div
      className="container-lg mt-5 pt-3 pb-4 ps-4 pe-3 rounded-4 fw-normal d-flex justify-content-center"
      id="VAWeek"
    >
      <div className="rounded-5 pt-4 ps-3" id="VABodyBGWeek">
        <h1 className="fw-semibold">View Answers</h1>

        <h5>1. I have felt cheerful and in good spirits: </h5>
        <h5 className="mt-5">2. I have felt calm and relaxed: </h5>
        <h5 className="mt-5">3. I have felt active and vigorous: </h5>
        <h5 className="mt-5 ">4. I woke up feeling fresh and rested: </h5>
        <h5 className="mt-5 pb-5">
          5. My daily life has been filled with things that interest me:
        </h5>
      </div>
    </div>
  );
};

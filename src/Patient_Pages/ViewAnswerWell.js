import "../css/ViewAnswerWell.css";
export const ViewAnswerWell = () => {
  return (
    <div
      className="container-lg mt-5 pt-3 pb-4 ps-4 pe-3 rounded-4 fw-normal d-flex justify-content-center"
      id="VAWell"
    >
      <div className="rounded-5 pt-4 ps-3" id="VABodyBG">
        <h1 className="fw-semibold">View Answers</h1>

        <h5>1. In general, I consider myself:</h5>
        <h5 className="mt-5">
          2. Compared to most of my peers, I consider myself:
        </h5>
        <h5 className="mt-5">
          3. Some people are generally very happy. They enjoy life regardless of
          what is going on, getting the most out of everything. To what extent
          does this characterization describe you?
        </h5>
        <h5 className="mt-5 pb-5">
          4. Some people are generally not very happy. Although they are not
          depressed, they never seem as happy as they might be. To what extent
          does this characterization describe you?
        </h5>
      </div>
    </div>
  );
};

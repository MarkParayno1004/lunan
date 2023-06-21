import "../css/ViewAnswerWeek.css";
export const ViewAnswerWeek = () => {
  return (
    <div
      className="container-lg mt-5 pt-3 pb-4 ps-4 pe-3 rounded-4 fw-normal d-flex justify-content-center"
      id="VAWeek"
    >
      <div className="container-fluid rounded-5 pt-4 ps-3" id="VABodyBGWeek">
        <h1 className="fw-semibold">View Answers</h1>
        <table class="table table-success table-hover">
          <thead>
            <tr>
              <th scope="col">Question:</th>
              <th scope="col">Answer:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1. I have felt cheerful and in good spirits.</th>
              <td>Mark</td>
            </tr>
            <tr>
              <th scope="row">2. I have felt calm and relaxed.</th>
              <td>Jacob</td>
            </tr>
            <tr>
              <th scope="row">3. I have felt active and vigorous.</th>
              <td>Jacob</td>
            </tr>
            <tr>
              <th scope="row">4. I woke up feeling fresh and rested.</th>
              <td>Jacob</td>
            </tr>
            <tr>
              <th scope="row">
                5. My daily life has been filled with things that interest me.
              </th>
              <td>Jacob</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

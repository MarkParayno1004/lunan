import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../css/WellnessGuide.css";
export const WellnessGuide = () => {
  return (
    <div
      className="container-fluid d-flex justify-content-center mt-4 pb-3 rounded-5"
      id="WellnessGuideBG"
    >
      <div className=" mt-5">
        <div class="text-center">
          <div class="row align-items-start ">
            <div class="col me-5 mb-5">
              <div class="card rounded-5">
                <h5 class="card-header fs-2 fw-light">Meditation Guide</h5>
                <div class="card-body">
                  <iframe
                    src="https://www.youtube.com/embed/cyMxWXlX9sU"
                    title="10 Minute Guided Meditation for Positive Energy, Peace &amp; Light 🌤"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
            <div class="col me-5">
              <div class="card rounded-5">
                <h5 class="card-header fs-2 fw-light">Breathing Exercise</h5>
                <div class="card-body">
                  <iframe
                    src="https://www.youtube.com/embed/-7-CAFhJn78"
                    title="Breathing Exercises for Relaxation or COPD - Ask Doctor Jo"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card rounded-5">
                <h5 class="card-header fs-2 fw-light">Sleep Meditation</h5>
                <div class="card-body">
                  <iframe
                    src="https://www.youtube.com/embed/rvaqPPjtxng"
                    title="Guided Sleep Meditation &amp; Deep Relaxation 🌙"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/*Bottom 3 Columns*/}
          <div class="row align-items-start mt-5">
            <div class="col">
              <div class="card rounded-5 me-5">
                <h5 class="card-header fs-2 fw-light">Stretching Guide</h5>
                <div class="card-body">
                  <iframe
                    src="https://www.youtube.com/embed/8TuRYV71Rgo"
                    title="10 Minute Yoga Stress and Anxiety"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card rounded-5 me-5">
                <h5 class="card-header fs-2 fw-light">Relaxation Guide</h5>
                <div class="card-body">
                  <iframe
                    src="https://www.youtube.com/embed/krBvzDlL0mM"
                    title="Guided Meditation for Relaxation"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card rounded-5">
                <h5 class="card-header fs-2 fw-light">Positive Energy</h5>
                <div class="card-body">
                  <iframe
                    width="1863"
                    height="770"
                    src="https://www.youtube.com/embed/C5L8Z3qA1DA"
                    title="5 Minute Meditation for Positive Energy"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import "../css/WellnessPageCounselor.css";
import "scrollable-component";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
export const WellnessPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div
      className="container-lg mt-5 pb-3 rounded-4 fw-normal d-flex justify-content-center"
      id="WellnessPageBG"
    >
      <scrollable-component class="my-content">
        <h1 className="mt-3" style={{ color: "#f5e9cf" }}>
          Published Wellness Guide
        </h1>
        <div className=" mt-5">
          <div class="text-center">
            <div class="row align-items-start">
              {/*Right Column*/}
              <div class="col">
                <div class="card rounded-5 mb-5" style={{ width: "450px" }}>
                  <h5 class="card-header fs-2 fw-light">Meditation Guide</h5>
                  <div class="card-body">
                    <iframe
                      src="https://www.youtube.com/embed/cyMxWXlX9sU"
                      title="10 Minute Guided Meditation for Positive Energy, Peace &amp; Light 🌤"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                      style={{ width: "400px" }}
                    ></iframe>
                  </div>
                </div>
                <div class="card rounded-5 mb-5" style={{ width: "450px" }}>
                  <h5 class="card-header fs-2 fw-light">Breathing Exercise</h5>
                  <div class="card-body">
                    <iframe
                      src="https://www.youtube.com/embed/-7-CAFhJn78"
                      title="Breathing Exercises for Relaxation or COPD - Ask Doctor Jo"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                      style={{ width: "400px" }}
                    ></iframe>
                  </div>
                </div>
                <div class="card rounded-5" style={{ width: "450px" }}>
                  <h5 class="card-header fs-2 fw-light">Sleep Meditation</h5>
                  <div class="card-body">
                    <iframe
                      src="https://www.youtube.com/embed/rvaqPPjtxng"
                      title="Guided Sleep Meditation &amp; Deep Relaxation 🌙"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                      style={{ width: "400px" }}
                    ></iframe>
                  </div>
                </div>
              </div>

              {/*Left Column*/}
              <div class="col me-5">
                <div class="card rounded-5 mb-5" style={{ width: "450px" }}>
                  <h5 class="card-header fs-2 fw-light">Stretching Guide</h5>
                  <div class="card-body">
                    <iframe
                      src="https://www.youtube.com/embed/8TuRYV71Rgo"
                      title="10 Minute Yoga Stress and Anxiety"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                      style={{ width: "400px" }}
                    ></iframe>
                  </div>
                </div>
                <div class="card rounded-5 mb-5" style={{ width: "450px" }}>
                  <h5 class="card-header fs-2 fw-light">Relaxation Guide</h5>
                  <div class="card-body">
                    <iframe
                      src="https://www.youtube.com/embed/krBvzDlL0mM"
                      title="Guided Meditation for Relaxation"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                      style={{ width: "400px" }}
                    ></iframe>
                  </div>
                </div>
                <div class="card rounded-5" style={{ width: "450px" }}>
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
                      style={{ width: "400px" }}
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-start">
          <button
            className="btn ms-3"
            style={{ backgroundColor: "#f5e9cf" }}
            onClick={handleShow}
          >
            Add Guide
          </button>
        </div>
      </scrollable-component>
      <AddGuide show={show} handleClose={handleClose} />
    </div>
  );
};

const AddGuide = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Publish A Guide</Modal.Title>
        </Modal.Header>
        <div class="input-group mb-3 mt-3">
          <h5>Input Title:</h5>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              aria-label="VideoTitle"
              aria-describedby="basic-addon1"
            />
          </div>
          <h5>Input Video Link:</h5>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              aria-label="VideoLink"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf" }}
            onClick={props.handleClose}
          >
            Submit
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

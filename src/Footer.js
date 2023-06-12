import book from "./img/book.png";
import bag from "./img/bag.png";
import person from "./img/person.png";
import like from "./img/like.png";
import "./css/Footer.css";
import footerbg from "./img/footerbg.png";
export const Footer = () => {
  return (
    <footer
      className="container-fluid d-flex justify-content-center"
      id="footerBG"
    >
      <div className="container text-center">
        <div className="row align-items-start">
          <p className="mt-5" id="footerTitle">
            Why Lunan?
          </p>
          <div className="col">
            <div className="card mb-3" id="cardbg">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={book} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title" id="cardTitle">
                      It's <br />
                      Licensed
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <p id="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="col">
            <div className="card mb-3" id="cardbg">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={bag} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title" id="cardTitle">
                      It's <br />
                      Affortable
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <p id="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="col">
            <div className="card mb-3" id="cardbg">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={person} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title" id="cardTitle">
                      It's <br />
                      Easy to Use
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <p id="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="col">
            {" "}
            <div className="card mb-3" id="cardbg">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={like} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title" id="cardTitle">
                      It's <br />
                      Effective
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <p id="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

import { Navbar } from "../Navbar";
import "../css/FAQ.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export const FAQ = () => {
  const [queOne, setQueOne] = useState(false);
  const [queTwo, setQueTwo] = useState(false);
  const [queThree, setQueThree] = useState(false);
  const [queFour, setQueFour] = useState(false);
  const [queFive, setQueFive] = useState(false);
  const [queSix, setQueSix] = useState(false);
  const [queSeven, setQueSeven] = useState(false);
  const [queEight, setQueEight] = useState(false);
  const [queNine, setQueNine] = useState(false);
  const [queTen, setQueTen] = useState(false);
  const [queEleven, setQueEleven] = useState(false);
  const [queTwelve, setQueTwelve] = useState(false);
  const [queThirt, setQueThirt] = useState(false);
  const [queFourth, setQueFourth] = useState(false);

  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex justify-content-center" id="faqBG">
        <div
          className="container-fluid mt-5 pb-3 mb-5 fs-3 fw-semibold"
          style={{ backgroundColor: "#f5e9cf", color: "#7db9b6", width: "60%" }}
        >
          <h1 style={{ fontSize: "60px" }}>FAQ</h1>
          <div className="container-fluid">
            <div>
              <hr />
              <span>What is lunan?</span>
              <FontAwesomeIcon
                onClick={() => setQueOne((prevState) => !prevState)}
                style={{ float: "right", cursor: "pointer" }}
                icon={faSquareCaretDown}
              />
            </div>
            {queOne && <Answer />}
            <div>
              <hr />
              <span>Who will be helping me?</span>
              <FontAwesomeIcon
                onClick={() => setQueTwo((prevState) => !prevState)}
                style={{ float: "right", cursor: "pointer" }}
                icon={faSquareCaretDown}
              />
            </div>
            {queTwo && <Answer />}
            <div>
              <hr />
              <span>Who are the therapists?</span>
              <FontAwesomeIcon
                onClick={() => setQueThree((prevState) => !prevState)}
                style={{ float: "right", cursor: "pointer" }}
                icon={faSquareCaretDown}
              />
            </div>
            {queThree && <Answer />}
            <div>
              <hr />
              <span>Is Lunan right for me?</span>
              <FontAwesomeIcon
                onClick={() => setQueFour((prevState) => !prevState)}
                style={{ float: "right", cursor: "pointer" }}
                icon={faSquareCaretDown}
              />
            </div>
            {queFour && <Answer />}

            <div>
              <hr />
              <span>
                Can Lunan substitute for traditional face-to-face therapy?
              </span>
              <FontAwesomeIcon
                onClick={() => setQueFive((prevState) => !prevState)}
                style={{ float: "right", cursor: "pointer" }}
                icon={faSquareCaretDown}
              />
            </div>
            {queFive && <Answer />}
            <div>
              <hr />
              <span>
                I signed up. How long until I'm matched with a therapist?
              </span>
              <FontAwesomeIcon
                onClick={() => setQueSix((prevState) => !prevState)}
                style={{ float: "right", cursor: "pointer" }}
                icon={faSquareCaretDown}
              />
            </div>
            {queSix && <Answer />}
            <div>
              <hr />
              <span>How will I communicate with my therapist?</span>
              <FontAwesomeIcon
                onClick={() => setQueSeven((prevState) => !prevState)}
                style={{ float: "right", cursor: "pointer" }}
                icon={faSquareCaretDown}
              />
            </div>
            {queSeven && <Answer />}
            <div>
              <hr />
              <span>How does messaging work?</span>
              <FontAwesomeIcon
                onClick={() => setQueEight((prevState) => !prevState)}
                style={{ float: "right", cursor: "pointer" }}
                icon={faSquareCaretDown}
              />
            </div>
            {queEight && <Answer />}
            <div>
              <hr />
              <span>How do live video sessions work?</span>
              <FontAwesomeIcon
                onClick={() => setQueNine((prevState) => !prevState)}
                style={{ float: "right", cursor: "pointer" }}
                icon={faSquareCaretDown}
              />
            </div>
            {queNine && <Answer />}
            <div>
              <hr />
              <span>Is lunan accessible for disabled users?</span>
              <FontAwesomeIcon
                onClick={() => setQueTen((prevState) => !prevState)}
                style={{ float: "right", cursor: "pointer" }}
                icon={faSquareCaretDown}
              />
            </div>
            {queTen && <Answer />}
            <div>
              <hr />
              <span>What is the role of Lunan?</span>
              <FontAwesomeIcon
                onClick={() => setQueEleven((prevState) => !prevState)}
                style={{ float: "right", cursor: "pointer" }}
                icon={faSquareCaretDown}
              />
            </div>
            {queEleven && <Answer />}
            <div>
              <hr />
              <span>
                How can I be sure that this is an effective form of therapy?
              </span>
              <FontAwesomeIcon
                onClick={() => setQueTwelve((prevState) => !prevState)}
                style={{ float: "right", cursor: "pointer" }}
                icon={faSquareCaretDown}
              />
            </div>
            {queTwelve && <Answer />}
            <div>
              <hr />
              <span>How is my privacy and security protected?</span>
              <FontAwesomeIcon
                onClick={() => setQueThirt((prevState) => !prevState)}
                style={{ float: "right", cursor: "pointer" }}
                icon={faSquareCaretDown}
              />
            </div>
            {queThirt && <Answer />}
          </div>
        </div>
      </div>
    </>
  );
};

const Answer = () => {
  return (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </div>
  );
};

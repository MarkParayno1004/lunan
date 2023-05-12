import "./css/Body.css";

function App() {
  return (
    <div className="container-fluid">
      <p className="text-center" id="titleP">
        Convenient and Affortable Therapy
        <br />
        <p id="titleP2">Anytime, Anywhere</p>
      </p>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="d-flex align-items-center d-flex justify-content-center"
          id="GetStartedBody"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
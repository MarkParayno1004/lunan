import { Navbar } from "../Navbar";
import "../css/AboutUs.css";
export const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div
        className="container-fluid d-flex justify-content-center"
        style={{ backgroundColor: "#f5e9cf", minHeight: 92 + "vh" }}
      >
        <div className="container-lg">
          <div className="mt-3" style={{ backgroundColor: "#7db9b6" }}>
            This is about us
          </div>
        </div>
      </div>
    </>
  );
};

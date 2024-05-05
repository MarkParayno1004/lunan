import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import SupervisorViewModalAssign from "../Modals/supervisor_view_assigned_modal/supervisor_view_assign_modal_component";
import SupervisorViewWeeklyForm from "../Modals/supervisor_view_weekly_form_modal/supervisor_view_weekly_form_components";
import SupervisorViewDailyForm from "../Modals/supervisor_view_daily_form_modal/supervisor_view_daily_form_component";
import SupervisorViewWellnessGuide from "../Modals/supervisor_view_wellness_guide_modal/supervisor_weekly_view_verified_form_modal_component";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    onClose,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick, onClose })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
  onClose: PropTypes.func, 
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "80%",
  bgcolor: "#1DC07C",
  boxShadow: 24,
  borderRadius: 3,
};

export default function SupervisorPatientInfo(props) {
  const [showPage, setShowPage] = React.useState("Assign");

  const patientData = props.patientData;
  const intakeFormsData = props.intakeFormsData;
  const patientFirstName = patientData ? patientData.firstName : "no name";

  const renderContent = () => {
    if (showPage === "Assign") {
      return (
        <SupervisorViewModalAssign
          selectedPatientUID={props.selectedPatientUID}
        />
      );
    } else if (showPage === "ViewWeekly") {
      return (
        <SupervisorViewWeeklyForm
          selectedPatientUID={props.selectedPatientUID}
        />
      );
    } else if (showPage === "ViewDaily") {
      return (
        <SupervisorViewDailyForm
          selectedPatientUID={props.selectedPatientUID}
        />
      );
    } else if (showPage === "ViewGuide") {
      return (
        <SupervisorViewWellnessGuide
          selectedPatientUID={props.selectedPatientUID}
        />
      );
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={props.show}
        onClose={props.handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={props.show}>
          <Box sx={style} className="flex justify-center items-center">
            <div className="container mx-auto">
              <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                <div className="col-span-4 sm:col-span-3">
                  <div className="bg0white shadow rounded-lg p-6 h-cModalHeight">
                    <div className="flex flex-col items-center">
                      <img
                        src={patientData && patientData.ProfPic}
                        className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                      ></img>
                      <h1 className="text-xl font-bold">{patientFirstName}</h1>
                    </div>
                    <div className="flex flex-col">
                      <hr className="my-6 border-t border-gray-500" />
                      <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                        Details
                      </span>
                      <ul className="font-semibold">
                        <li className="mb-2">
                          {intakeFormsData && intakeFormsData[0] ? (
                            <span>
                              {intakeFormsData[0].StreetNum || "N/A"}{" "}
                              {intakeFormsData[0].Barangay || ""}{" "}
                              {intakeFormsData[0].City || ""}
                              {intakeFormsData[0].Zip || ""}
                            </span>
                          ) : (
                            <span>No Address</span>
                          )}
                        </li>
                        <li className="mb-2">{patientData && patientData.CellPhone}</li>
                        <li className="mb-2">{patientData && patientData.Email}</li>
                        <li className="mb-2">
                          {new Date(patientData && patientData.BirthDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </li>
                        <li className="mb-2">{patientData && patientData.Gender}</li>
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-gray-200 text-md font-semibold">
                      <div>
                        <button
                          className="bg-primaryGreen rounded-xl"
                          onClick={() => setShowPage("Assign")}
                        >
                          View Assignments
                        </button>
                      </div>
                      <div>
                        <button
                          className="bg-primaryGreen rounded-xl"
                          onClick={() => setShowPage("ViewWeekly")}
                        >
                          View Weekly Form
                        </button>
                      </div>
                      <div>
                        <button
                          className="bg-primaryGreen rounded-xl"
                          onClick={() => setShowPage("ViewDaily")}
                        >
                          View Daily Form
                        </button>
                      </div>
                      <div>
                        <button
                          className="bg-primaryGreen rounded-xl"
                          onClick={() => setShowPage("ViewGuide")}
                        >
                          View Wellness Guide
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-9 h-cModalHeight overflow-y-auto">
                  <div className="bg-white shadow rounded-lg p-6">
                    {renderContent()}
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
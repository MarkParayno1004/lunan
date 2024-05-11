import * as React from "react";
import { Box, Typography, Modal } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase-config";

export default function SupervisorSubmittedDailyForms(props) {
  const [selectedwellForm, setSelectedwellForm] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const handleSelectwellForm = async (id) => {
    try {
      const selectedFormDocRef = doc(firestore, "WellnessForm", id);
      const selectedFormDocSnap = await getDoc(selectedFormDocRef);
      if (selectedFormDocSnap.exists()) {
        const selectedFormData = selectedFormDocSnap.data();
        selectedFormData.id = selectedFormDocSnap.id;
        setSelectedwellForm(selectedFormData);
      } else {
        return "Document not found for ID:";
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <table className="w-full text-sm text-center h-full table-auto border border-slate-500">
        <thead className="bg-primaryGreen">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-ss-lg">
              Date Submitted
            </th>
            <th scope="col" className="px-6 py-3 rounded-se-lg">
              View Form
            </th>
          </tr>
        </thead>
        <tbody>
          {props.wellForms
            .filter((wellForm) => wellForm.Status === null)
            .map((wellForm, index) => (
              <tr key={index}>
                <td className="p-2 border border-slate-600">
                  {new Date(wellForm.DateSubmitted).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </td>
                <td className="p-2 border border-slate-600">
                  <button
                    className="p-2 bg-orange-200 rounded-lg font-semibold"
                    onClick={() => {
                      handleSelectwellForm(wellForm.id);
                      setShow(!show);
                    }}
                  >
                    View Form
                  </button>
                  <ViewFormWell
                    show={show}
                    handleClose={() => setShow(!show)}
                    selectedwellForm={selectedwellForm}
                    wellForm={selectedwellForm}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

const ViewFormWell = (props) => {
  const questionsAndAnswers = props.selectedwellForm
    ? [
        {
          question: "1. In general, I consider myself:",
          answer: mapAnswer(props.selectedwellForm.WellnessQ1),
          id: props.selectedwellForm.id,
        },
        {
          question: "2. Compared to most of my peers, I consider myself:",
          answer: mapAnswer(props.selectedwellForm.WellnessQ2),
        },
        {
          question:
            "3. Some people are generally very happy. They enjoy life regardless of what is going on, getting the most out of everything. To what extent does this characterization describe you?",
          answer: mapAnswer(props.selectedwellForm.WellnessQ3),
        },
        {
          question:
            "4. Some people are generally not very happy. Although they are not depressed, they never seem as happy as they might be. To what extent does this characterization describe you?",
          answer: mapAnswer(props.selectedwellForm.WellnessQ4),
        },
      ]
    : [];

  const selectedwellForm = props.selectedwellForm || {};

  const totalScore =
    selectedwellForm.WellnessQ1 +
    selectedwellForm.WellnessQ2 +
    selectedwellForm.WellnessQ3 +
    selectedwellForm.WellnessQ4;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            View Daily Form
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <table className="w-full text-sm text-center h-full">
              <thead className="bg-primaryGreen">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-ss-lg">
                    Question:
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-se-lg">
                    Answer:
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {questionsAndAnswers.map((qa, index) => (
                  <tr key={index}>
                    <td className="p-2 border border-slate-600 font-semibold text-md text-start">
                      {qa.question}
                    </td>
                    <td className="p-2 border border-slate-600 text-md text-start">
                      {qa.answer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="grid grid-cols-2 ">
              <div className="col-span-1 text-sm font-semibold self-center">
                Total Score: {totalScore}/25
              </div>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

const mapAnswer = (value) => {
  switch (value) {
    case 0:
      return "Not a very happy person - 0";
    case 1:
      return "Rather unhappy - 1";
    case 2:
      return "Somewhat unhappy - 2";
    case 3:
      return "Neither happy nor unhappy - 3";
    case 4:
      return "Somewhat happy - 4";
    case 5:
      return "Rather happy - 5";
    case 6:
      return "A very happy person - 6";
    default:
      return "";
  }
};

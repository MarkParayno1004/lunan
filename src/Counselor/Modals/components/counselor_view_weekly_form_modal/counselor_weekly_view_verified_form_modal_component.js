import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../../firebase/firebase-config";
import { Box, Typography, Modal } from "@mui/material";
export default function CounselorViewVerifiedFormModal(props) {
  const mapAnswer = (value) => {
    switch (value) {
      case 0:
        return "At no time - 0";
      case 1:
        return "Some of the time - 1";
      case 2:
        return "Less than half of the time - 2";
      case 3:
        return "More than half of the time - 3";
      case 4:
        return "Most of the time - 4";
      case 5:
        return "All the time - 5";
      default:
        return "";
    }
  };

  const questionsAndAnswers = props.selectedwForm
    ? [
        {
          question: "1. I have felt cheerful and in good spirits.",
          answer: mapAnswer(props.selectedwForm.WeeklyQ1),
          id: props.selectedwForm.id,
        },
        {
          question: "2. I have felt calm and relaxed.",
          answer: mapAnswer(props.selectedwForm.WeeklyQ2),
        },
        {
          question: "3. I have felt active and vigorous.",
          answer: mapAnswer(props.selectedwForm.WeeklyQ3),
        },
        {
          question: "4. I woke up feeling fresh and rested.",
          answer: mapAnswer(props.selectedwForm.WeeklyQ4),
        },
        {
          question:
            "5. My daily life has been filled with things that interest me.",
          answer: mapAnswer(props.selectedwForm.WeeklyQ5),
        },
      ]
    : [];

  const selectedwForm = props.selectedwForm || {};
  const q1 = selectedwForm.WeeklyQ1 || 0;
  const q2 = selectedwForm.WeeklyQ2 || 0;
  const q3 = selectedwForm.WeeklyQ3 || 0;
  const q4 = selectedwForm.WeeklyQ4 || 0;
  const q5 = selectedwForm.WeeklyQ5 || 0;

  const totalScore = q1 + q2 + q3 + q4 + q5;

  const updatewFormUnverify = async (wFormId) => {
    const formRef = doc(firestore, "WeeklyForm", wFormId);
    try {
      await updateDoc(formRef, {
        Status: null,
      });
      props.handleClose();
    } catch (error) {
      return error;
    }
  };

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
            View Weekly Form
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
              <div className="justify-self-end">
                <button
                  className="bg-orange-200 p-2 rounded-lg mt-2"
                  onClick={() => updatewFormUnverify(props.selectedwForm.id)}
                >
                  Unverify
                </button>
              </div>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

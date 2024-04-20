import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Modal, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Swal from "sweetalert2";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase-config";
import dayjs from "dayjs";

export default function SupervisorAssignedTableModal({
    tasks,
    selectedPatientUID,
    selectedTask,
    handleSelectTask,
}) {
    const [showAct, setShowAct] = React.useState(false);
    const [createAssignment, setCreateAssignemnt] = React.useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
    const [showEditDialog, setShowEditDialog] = React.useState(false);

    return (
        <div>
          <table className="w-full text-sm text-center h-full table-auto border border-slate-500">
            <thead className="bg-primaryGreen">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-ss-lg">
                  Activity
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Deadline
                </th>
                <th scope="col" className="px-6 py-3">
                  View Activity
                </th>
              </tr>
            </thead>
            <tbody className="">
              {tasks
                .filter((task) => task.Status === null)
                .map((task, index) => (
                  <tr key={index}>
                    <td className="p-2 border border-slate-600">{task.Activity}</td>
                    <td className="p-2 border border-slate-600">
                      {task.Description}
                    </td>
                    <td className="p-2 border border-slate-600">
                      {new Date(task.Deadline).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-2 font-medium text-primaryOrange border border-slate-600">
                      <button
                        className="hover:underline"
                        onClick={() => {
                          setShowAct(true);
                          handleSelectTask(task.id);
                        }}
                      >
                        View Assignment
                      </button>
                      <ViewAssignedActivity
                        show={showAct}
                        handleClose={() => setShowAct(!showAct)}
                        task={selectedTask}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
    );
}

const ViewAssignedActivity = (props) => {
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
      <Modal
        open={props.show}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            View Activity
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="container-fluid mt-3">
              <span>
                <strong>{props.task?.Activity}</strong>
              </span>
              <p>{props.task?.Description} </p>
              <span>
                <span> | </span>
                <strong>Due Date:</strong> {props.task?.Deadline}
              </span>
              <span>
                <span> | </span>
                <strong>Turned-in Date:</strong> {props.task?.TurnedInDate}
              </span>
            </div>
          </Typography>
        </Box>
      </Modal>
    );
};
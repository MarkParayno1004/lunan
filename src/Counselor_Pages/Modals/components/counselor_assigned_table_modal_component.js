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
import CounselorCreateAssignment from "./counselor_create_assignment_modal_component";
import CounselorConfirmDeleteDialog from "../../Components/Dialogs/components/counselor_confirm_delete_dialog_component";

export default function CounselorAssignedTableModal({
  tasks,
  selectedPatientUID,
  selectedTask,
  handleSelectTask,
}) {
  const [showAct, setShowAct] = React.useState(false);
  const [createAssignment, setCreateAssignemnt] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showEditDialog, setShowEditDialog] = React.useState(false);

  const handleCreateAssignment = (selectedPatientUID) => {
    console.log(
      `Creating assignments for patient with UID: ${selectedPatientUID}`
    );
    setCreateAssignemnt(true);
  };

  const handleSubmit = () => {
    Swal.fire({
      background: "#1DC07C",
      color: "#ffffff",
      position: "center",
      icon: "success",
      title: "Assignment successfully created!",
      showConfirmButton: false,
      timer: 2000,
    });
    setCreateAssignemnt(false);
  };

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
            <th scope="col" className="px-6 py-3 ">
              Edit
            </th>
            <th scope="col" className="px-6 py-3 rounded-se-lg">
              Delete
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
                <td className="p-2 text-primaryOrange border border-slate-600">
                  <button onClick={() => setShowEditDialog(!showEditDialog)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                </td>
                <td
                  className="p-2 text-primaryOrange border border-slate-600"
                  onClick={() => setShowDeleteDialog(!showDeleteDialog)}
                >
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>

                  <CounselorConfirmDeleteDialog
                    show={showDeleteDialog}
                    handleClose={setShowDeleteDialog}
                    task={task}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="grid justify-items-end">
        <button
          className="bg-orange-200 rounded-lg p-1 mt-2 px-3 py-2"
          onClick={() => handleCreateAssignment(selectedPatientUID)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="font-semibold text-sm">Create Assignment</span>
        </button>
        <CounselorCreateAssignment
          show={createAssignment}
          handleClose={() => setCreateAssignemnt(false)}
          handleSubmit={handleSubmit}
          selectedPatientUID={selectedPatientUID}
        />
        <EditAssignedActivity
          show={showEditDialog}
          handleClose={() => setShowEditDialog(!showEditDialog)}
        />
      </div>
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

const EditAssignedActivity = (props) => {
  return (
    <div>
      <Dialog
        open={props.show}
        onClose={props.handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            props.handleClose();
          },
        }}
      >
        <DialogTitle>Update Assignment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can edit and update the task information.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Activity"
            label="Rename Activity"
            type="text"
            fullWidth
            variant="standard"
          />
          <Box mt={2} fullWidth>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="Description"
              label="New Description"
              type="text"
              fullWidth
              variant="standard"
            />
          </Box>

          <Box mt={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="New Deadline" />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit" color="success">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

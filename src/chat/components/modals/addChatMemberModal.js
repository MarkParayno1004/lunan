import { ModalBody, Box } from "@twilio-paste/core";
import ModalInputField from "./ModalInputField";
import AddParticipantFooter from "./addParticipantFooter";
import { ActionName } from "../../types";
import ConvoModal from "./ConvoModal";

const AddChatParticipantModal = (props) => {
  return (
    <>
      <ConvoModal
        handleClose={() => props.handleClose()}
        isModalOpen={props.isModalOpen}
        title={props.title}
        modalBody={
          <ModalBody>
            <h3>Add Chat participant</h3>
            <Box
              as="form"
              onKeyPress={async (e) => {
                if (e.key === "Enter") {
                  if (props.action) {
                    e.preventDefault();
                    props.action();
                  }
                }
              }}
            >
              <ModalInputField
                label="User identity"
                isFocused={true}
                input={props.name}
                placeholder="exampleusername"
                onChange={props.setName}
                error={props.error}
                // error_text="Enter a valid user identity."
                help_text="The identity used by the participant in Conversations."
              />
            </Box>
          </ModalBody>
        }
        modalFooter={
          <AddParticipantFooter
            isSaveDisabled={!props.name.trim() || !!props.error}
            actionName={ActionName.Save}
            onBack={() => {
              props.onBack();
            }}
            action={props.action}
          />
        }
      />
    </>
  );
};

export default AddChatParticipantModal;

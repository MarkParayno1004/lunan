import { createRef } from "react";
import { Modal, ModalHeader, ModalHeading } from "@twilio-paste/modal";

const ConvoModal = (props) => {
  const nameInputRef = createRef();

  return (
    <Modal
      ariaLabelledby="add-convo-modal"
      isOpen={props.isModalOpen}
      onDismiss={() => props.handleClose()}
      initialFocusRef={nameInputRef}
      size="default"
    >
      <ModalHeader>
        <ModalHeading as="h3">{props.title}</ModalHeading>
      </ModalHeader>
      {props.modalBody}
      {props.modalFooter}
    </Modal>
  );
};

export default ConvoModal;

import {
  Modal,
  ModalFooter,
  ModalFooterActions,
  ModalHeader,
  ModalHeading,
} from "@twilio-paste/modal";
import { ModalBody } from "@twilio-paste/core";
import { Button } from "@twilio-paste/button";
import React from "react";

const ActionErrorModal = ({ errorText, isOpened, onClose, error = {} }) => (
  <Modal
    ariaLabelledby="name-change-error"
    isOpen={isOpened}
    size="default"
    onDismiss={onClose}
  >
    <ModalHeader>
      <ModalHeading as="h3">{errorText.title}</ModalHeading>
    </ModalHeader>
    <ModalBody>
      <div>
        {errorText.description}
        {error ? (
          <>
            <br />
            <br />
            Error code [<b>{error.code}</b>
            ]: <b>{error.message}</b>
          </>
        ) : null}
      </div>
    </ModalBody>
    <ModalFooter>
      <ModalFooterActions>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </ModalFooterActions>
    </ModalFooter>
  </Modal>
);

export default ActionErrorModal;

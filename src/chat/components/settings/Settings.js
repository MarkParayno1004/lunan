import React, { useState, createRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import SettingsMenu from "./SettingsMenu";
import ManageParticipantsModal from "../modals/manageParticipantsModal";
import { Content } from "../../types";
import {
  addChatParticipant,
  addNonChatParticipant,
  removeParticipant,
} from "../../api";
import AddChatParticipantModal from "../modals/addChatMemberModal";
import AddSMSParticipantModal from "../modals/addSMSParticipantModal";
import AddWhatsAppParticipantModal from "../modals/addWhatsAppParticipant";
import { actionCreators } from "../../store";
import ActionErrorModal from "../modals/ActionErrorModal";
import {
  CONVERSATION_MESSAGES,
  ERROR_MODAL_MESSAGES,
  SMS_PREFIX,
  WHATSAPP_PREFIX,
} from "../../constants";
import {
  successNotification,
  unexpectedErrorNotification,
} from "../../helpers";
import {
  getSdkConversationObject,
  getSdkParticipantObject,
} from "../../conversations-objects";
import { isValidPhoneNumber } from "libphonenumber-js";

const invalidPhoneNumberErrorMessage = "Invalid phone number";
const Settings = (props) => {
  const handleParticipantClose = () => props.setIsManageParticipantOpen(false);

  const [isAddChatOpen, setIsAddChatOpen] = useState(false);
  // TODO: move to app loading state
  // const [isLoading, setLoading] = useState(false);
  const handleChatOpen = () => setIsAddChatOpen(true);
  const handleChatClose = () => setIsAddChatOpen(false);

  const [isAddSMSOpen, setIsAddSMSOpen] = useState(false);
  const handleSMSOpen = () => setIsAddSMSOpen(true);
  const handleSMSClose = () => setIsAddSMSOpen(false);

  const [isAddWhatsAppOpen, setIsAddWhatsAppOpen] = useState(false);
  const handleWhatsAppOpen = () => setIsAddWhatsAppOpen(true);
  const handleWhatsAppClose = () => setIsAddWhatsAppOpen(false);

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const [nameProxy, setNameProxy] = useState("");
  const [errorProxy, setErrorProxy] = useState("");

  const [showError, setErrorToShow] = useState();
  const [errorData, setErrorData] = useState();

  const nameInputRef = createRef();

  const dispatch = useDispatch();
  const { updateCurrentConversation, updateConversation, addNotifications } =
    bindActionCreators(actionCreators, dispatch);

  const sdkConvo = useMemo(
    () => getSdkConversationObject(props.convo),
    [props.convo.sid]
  );

  function emptyData() {
    setName("");
    setNameProxy("");
    setError("");
    setErrorProxy("");
  }

  function setErrors(errorText) {
    setError(errorText);
    setErrorProxy(errorText);
  }

  return (
    <>
      <SettingsMenu
        onParticipantListOpen={() => props.setIsManageParticipantOpen(true)}
        leaveConvo={async () => {
          try {
            await sdkConvo.leave();
            successNotification({
              message: CONVERSATION_MESSAGES.LEFT,
              addNotifications,
            });
            updateCurrentConversation("");
          } catch (e) {
            unexpectedErrorNotification(e.message, addNotifications);
          }
        }}
        updateConvo={(val) =>
          sdkConvo
            .updateFriendlyName(val)
            .then((convo) => {
              updateConversation(convo.sid, convo);
              successNotification({
                message: CONVERSATION_MESSAGES.NAME_CHANGED,
                addNotifications,
              });
            })
            .catch((e) => {
              setErrorData(e);
              setErrorToShow(ERROR_MODAL_MESSAGES.CHANGE_CONVERSATION_NAME);
            })
        }
        conversation={props.convo}
        addNotifications={addNotifications}
      />
      <ActionErrorModal
        errorText={showError || ERROR_MODAL_MESSAGES.CHANGE_CONVERSATION_NAME}
        isOpened={!!showError}
        onClose={() => {
          setErrorToShow(false);
          setErrorData(undefined);
        }}
        error={errorData}
      />
      {props.isManageParticipantOpen && (
        <ManageParticipantsModal
          handleClose={handleParticipantClose}
          isModalOpen={props.isManageParticipantOpen}
          title="Manage Participants"
          participantsCount={props.participants.length}
          participantsList={props.participants}
          onClick={(content) => {
            handleParticipantClose();
            switch (content) {
              case Content.AddSMS:
                handleSMSOpen();
                return null;
              case Content.AddWhatsApp:
                handleWhatsAppOpen();
                return null;
              case Content.AddChat:
                handleChatOpen();
                return null;
              default:
                return null;
            }
          }}
          onParticipantRemove={async (participant) => {
            await removeParticipant(
              sdkConvo,
              getSdkParticipantObject(participant),
              addNotifications
            );
          }}
        />
      )}
      {isAddSMSOpen && (
        <AddSMSParticipantModal
          name={name}
          proxyName={nameProxy}
          isModalOpen={isAddSMSOpen}
          title="Manage Participants"
          setName={(name) => {
            setName(name);
            setError(
              !isValidPhoneNumber(`+${name}`)
                ? invalidPhoneNumberErrorMessage
                : ""
            );
          }}
          setProxyName={(name) => {
            setNameProxy(name);
            setErrorProxy(
              !isValidPhoneNumber(`+${name}`)
                ? invalidPhoneNumberErrorMessage
                : ""
            );
          }}
          error={error}
          errorProxy={errorProxy}
          nameInputRef={nameInputRef}
          handleClose={() => {
            emptyData();
            handleSMSClose();
          }}
          onBack={() => {
            emptyData();
            handleSMSClose();
            props.setIsManageParticipantOpen(true);
          }}
          action={async () => {
            try {
              await addNonChatParticipant(
                SMS_PREFIX + name,
                SMS_PREFIX + nameProxy,
                sdkConvo,
                addNotifications
              );
              emptyData();
              handleSMSClose();
            } catch (e) {
              setErrorData(e.body);
              setErrorToShow(ERROR_MODAL_MESSAGES.ADD_PARTICIPANT);
            }
          }}
        />
      )}
      {isAddWhatsAppOpen && (
        <AddWhatsAppParticipantModal
          name={name}
          proxyName={nameProxy}
          isModalOpen={isAddWhatsAppOpen}
          title="Manage Participants"
          setName={(name) => {
            setName(name);
            setError(
              !isValidPhoneNumber(`+${name}`)
                ? invalidPhoneNumberErrorMessage
                : ""
            );
          }}
          setProxyName={(name) => {
            setNameProxy(name);
            setErrorProxy(
              !isValidPhoneNumber(`+${name}`)
                ? invalidPhoneNumberErrorMessage
                : ""
            );
          }}
          error={error}
          errorProxy={errorProxy}
          nameInputRef={nameInputRef}
          handleClose={() => {
            emptyData();
            handleWhatsAppClose();
          }}
          onBack={() => {
            emptyData();
            handleWhatsAppClose();
            props.setIsManageParticipantOpen(true);
          }}
          action={async () => {
            try {
              await addNonChatParticipant(
                WHATSAPP_PREFIX + name,
                WHATSAPP_PREFIX + nameProxy,
                sdkConvo,
                addNotifications
              );
              emptyData();
              handleWhatsAppClose();
            } catch (e) {
              setErrorData(e.body);
              setErrorToShow(ERROR_MODAL_MESSAGES.ADD_PARTICIPANT);
            }
          }}
        />
      )}
      {isAddChatOpen && (
        <AddChatParticipantModal
          name={name}
          isModalOpen={isAddChatOpen}
          title="Manage Participants"
          setName={(name) => {
            setName(name);
            setErrors("");
          }}
          error={error}
          nameInputRef={nameInputRef}
          handleClose={() => {
            emptyData();
            handleChatClose();
          }}
          onBack={() => {
            emptyData();
            handleChatClose();
            props.setIsManageParticipantOpen(true);
          }}
          action={async () => {
            try {
              await addChatParticipant(name.trim(), sdkConvo, addNotifications);
              emptyData();
              handleChatClose();
            } catch (e) {
              setErrorData(e.body);
              setErrorToShow(ERROR_MODAL_MESSAGES.ADD_PARTICIPANT);
            }
          }}
        />
      )}
      {/* {isLoading ? (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        height="100%"
        width="100%"
      >
        <Spinner size="sizeIcon110" decorative={false} title="Loading" />
      </Box>
    ) : null} */}
    </>
  );
};

export default Settings;

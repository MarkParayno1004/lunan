import React, { useState } from "react";

import ConversationTitleModal from "../modals/ConversationTitleModal";
import { addConversation } from "../../api";
import { Button } from "@twilio-paste/button";
import { PlusIcon } from "@twilio-paste/icons/esm/PlusIcon";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";

const CreateConversationButton = (props) => {
  const dispatch = useDispatch();
  const { updateCurrentConversation, addNotifications, updateParticipants } =
    bindActionCreators(actionCreators, dispatch);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);

  return (
    <>
      <Button fullWidth variant="secondary" onClick={handleOpen}>
        {/* <PlusIcon decorative={false} title="Add convo" /> */}
        {/* {!props.collapsed ? "Create New Conversation" : null} */}
        Create New Conversation
        {console.log("Button Pressed")}
      </Button>
      <ConversationTitleModal
        title=""
        type="new"
        isModalOpen={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onSave={async (title) => {
          const convo = await addConversation(
            title,
            updateParticipants,
            props.client,
            addNotifications
          );
          setIsModalOpen(false);
          updateCurrentConversation(convo.sid);
        }}
      />
    </>
  );
};

export default CreateConversationButton;

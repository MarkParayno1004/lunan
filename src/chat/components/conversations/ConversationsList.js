import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import ConversationView from "./ConversationView";
import { actionCreators } from "../../store";
import { getTypingMessage, unexpectedErrorNotification } from "../../helpers";
import { getSdkConversationObject } from "../../conversations-objects";

function getLastMessage(messages, typingData) {
  if (messages === undefined || messages === null) {
    return "Loading...";
  }
  if (typingData.length) {
    return getTypingMessage(typingData);
  }
  if (messages.length === 0) {
    return "No messages";
  }
  return messages[messages.length - 1].body || "Media message";
}

function isMyMessage(messages) {
  if (messages === undefined || messages === null || messages.length === 0) {
    return false;
  }
  return messages[messages.length - 1].author ===
    localStorage.getItem("username")
    ? messages[messages.length - 1]
    : false;
}

async function updateCurrentConvo(setSid, convo, updateParticipants) {
  setSid(convo.sid);

  const participants = await getSdkConversationObject(convo).getParticipants();
  updateParticipants(participants, convo.sid);
}

function setUnreadMessagesCount(
  currentconvoSid,
  convoSid,
  unreadMessages,
  updateUnreadMessages
) {
  if (currentconvoSid == convoSid && unreadMessages[convoSid] !== 0) {
    updateUnreadMessages(convoSid, 0);
    return 0;
  }
  if (currentconvoSid == convoSid) {
    return 0;
  }
  return unreadMessages[convoSid];
}

const ConversationsList = () => {
  const sid = useSelector((state) => state.sid);
  const conversations = useSelector((state) => state.convos);
  const messages = useSelector((state) => state.messages);
  const unreadMessages = useSelector((state) => state.unreadMessages);
  const participants = useSelector((state) => state.participants);
  const typingData = useSelector((state) => state.typingData);

  const dispatch = useDispatch();
  const {
    updateCurrentConversation,
    updateParticipants,
    updateUnreadMessages,
    setLastReadIndex,
    addNotifications,
  } = bindActionCreators(actionCreators, dispatch);

  if (conversations === undefined || conversations === null) {
    return <div className="empty" />;
  }

  return (
    <div id="conversation-list">
      {conversations.map((convo) => (
        <ConversationView
          key={convo.sid}
          convoId={convo.sid}
          setSid={updateCurrentConversation}
          currentConvoSid={sid}
          lastMessage={
            getLastMessage(messages[convo.sid], typingData[convo.sid] ?? []) ??
            ""
          }
          messages={messages[convo.sid]}
          typingInfo={typingData[convo.sid] ?? []}
          myMessage={isMyMessage(messages[convo.sid])}
          unreadMessagesCount={setUnreadMessagesCount(
            sid,
            convo.sid,
            unreadMessages,
            updateUnreadMessages
          )}
          updateUnreadMessages={updateUnreadMessages}
          participants={participants[convo.sid] ?? []}
          convo={convo}
          onClick={async () => {
            try {
              setLastReadIndex(convo.lastReadMessageIndex ?? -1);
              await updateCurrentConvo(
                updateCurrentConversation,
                convo,
                updateParticipants
              );
              //update unread messages
              updateUnreadMessages(convo.sid, 0);
              //set messages to be read
              const lastMessage =
                messages[convo.sid].length &&
                messages[convo.sid][messages[convo.sid].length - 1];
              if (lastMessage && lastMessage.index !== -1) {
                await getSdkConversationObject(
                  convo
                ).advanceLastReadMessageIndex(lastMessage.index);
              }
            } catch (e) {
              unexpectedErrorNotification(e.message, addNotifications);
            }
          }}
        />
      ))}
    </div>
  );
};

export default ConversationsList;

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { Box } from "@twilio-paste/core";
import { useTheme } from "@twilio-paste/theme";

import { actionCreators } from "../../store";
import ConversationDetails from "./ConversationDetails";
import MessagesBox from "../message/MessagesBox";
import MessageInputField from "../message/MessageInputField";
import styles from "../../styles";

const ConversationContainer = (props) => {
  const theme = useTheme();

  const sid = useSelector((state) => state.sid);
  const loadingStatus = useSelector((state) => state.loadingStatus);
  const participants = useSelector((state) => state.participants)[sid] ?? [];
  const messages = useSelector((state) => state.messages);
  const typingData = useSelector((state) => state.typingData)[sid] ?? [];
  const lastReadIndex = useSelector((state) => state.lastReadIndex);

  const dispatch = useDispatch();
  const { pushMessages } = bindActionCreators(actionCreators, dispatch);

  return (
    <Box style={styles.convosWrapperBox}>
      {sid && props.conversation && props.client ? (
        <>
          <ConversationDetails
            convoSid={sid}
            convo={props.conversation}
            participants={participants}
          />

          <MessagesBox
            key={sid}
            convoSid={sid}
            convo={props.conversation}
            upsertMessage={pushMessages}
            client={props.client}
            messages={messages[sid]}
            loadingState={loadingStatus}
            participants={participants}
            lastReadIndex={lastReadIndex}
          />

          <MessageInputField
            convoSid={sid}
            client={props.client}
            messages={messages[sid]}
            convo={props.conversation}
            typingData={typingData}
          />
        </>
      ) : (
        <>
          <Box
            style={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              fontSize: theme.fontSizes.fontSize30,
              fontWeight: theme.fontWeights.fontWeightNormal,
              lineHeight: "20px",
              color: theme.textColors.colorTextIcon,
            }}
          >
            Select a conversation on the left to get started.
          </Box>
        </>
      )}
    </Box>
  );
};

export default ConversationContainer;

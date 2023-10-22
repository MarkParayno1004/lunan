import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { AttachIcon } from "@twilio-paste/icons/esm/AttachIcon";
import { Box, Button } from "@twilio-paste/core";
import { useTheme } from "@twilio-paste/theme";
import { Text } from "@twilio-paste/text";

import { actionCreators } from "../../store";
import { MAX_FILE_SIZE } from "../../constants";
import { getTypingMessage, unexpectedErrorNotification } from "../../helpers";
import MessageInput from "./MessageInput";
import SendMessageButton from "./SendMessageButton";
import { getSdkConversationObject } from "../../conversations-objects";

const MessageInputField = (props) => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  // needed to clear input type=file
  const [filesInputKey, setFilesInputKey] = useState("input-key");

  const theme = useTheme();
  const typingInfo = getTypingMessage(props.typingData);

  const dispatch = useDispatch();
  const { addNotifications } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    setMessage("");
    setFiles([]);
    setFilesInputKey(Date.now().toString());
  }, [props.convo]);

  useEffect(() => {
    if (!files.length) {
      setFilesInputKey(Date.now().toString());
    }
  }, [files]);

  const sdkConvo = useMemo(
    () => getSdkConversationObject(props.convo),
    [props.convo.sid]
  );

  const onFilesChange = (event) => {
    const { files: assets } = event.target;
    if (!assets?.length) {
      return;
    }

    const validFiles = Array.from(assets).filter(
      ({ size }) => size < MAX_FILE_SIZE + 1
    );

    if (validFiles.length < assets.length) {
      // TODO: show error
    }

    setFiles([...files, ...validFiles]);
  };

  const onFileRemove = (file) => {
    const fileIdentityArray = file.split("_");
    const fileIdentity = fileIdentityArray
      .slice(0, fileIdentityArray.length - 1)
      .join();
    const existentFiles = files.filter(
      ({ name, size }) =>
        name !== fileIdentity &&
        size !== Number(fileIdentityArray[fileIdentityArray.length - 1])
    );

    setFiles(existentFiles);
  };

  const onMessageSend = async () => {
    if (message.length == 0 && files.length == 0) {
      return;
    }

    const { convo } = props;
    const sdkConvo = getSdkConversationObject(convo);

    const newMessageBuilder = sdkConvo.prepareMessage().setBody(message);

    // const newMessage: ReduxMessage = {
    //   author: client.user.identity,
    //   body: message,
    //   attributes: {},
    //   dateCreated: currentDate,
    //   index: -1,
    //   participantSid: "",
    //   sid: "-1",
    //   aggregatedDeliveryReceipt: null,
    //   attachedMedia: [],
    // } as ReduxMessage;

    for (const file of files) {
      const fileData = new FormData();
      fileData.set(file.name, file, file.name);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // newMessage.attachedMedia.push({
      //   sid: key + "",
      //   size: file.size,
      //   filename: file.name,
      //   contentType: file.type,
      // });
      // addAttachment(convo.sid, "-1", key + "", file);
      newMessageBuilder.addMedia(fileData);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // upsertMessages(convo.sid, [newMessage]);
    setMessage("");
    setFiles([]);
    const messageIndex = await newMessageBuilder.build().send();

    try {
      await sdkConvo.advanceLastReadMessageIndex(messageIndex ?? 0);
    } catch (e) {
      unexpectedErrorNotification(e.message, addNotifications);
      throw e;
    }
  };

  return (
    <Box
      display="flex"
      flexBasis="60px"
      flexGrow={10}
      flexDirection="column"
      borderTopStyle="solid"
      borderTopWidth="borderWidth10"
      style={{
        borderTopColor: theme.borderColors.colorBorderWeak,
        backgroundColor: theme.backgroundColors.colorBackgroundBody,
      }}
    >
      <Box
        paddingBottom="space20"
        paddingTop="space50"
        paddingLeft="space150"
        hidden={!props.typingData.length}
      >
        <Text as="p" color="colorTextIcon">
          {typingInfo}
        </Text>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        height="100%"
        flexGrow={10}
        paddingBottom="space30"
        paddingTop="space40"
      >
        <Box
          paddingBottom="space30"
          paddingLeft="space50"
          paddingRight="space10"
          paddingTop="space20"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="start"
        >
          <Button variant="link">
            <label htmlFor="file-input">
              <AttachIcon
                decorative={true}
                title="Attach file"
                size="sizeIcon50"
              />
            </label>
            <input
              id="file-input"
              key={filesInputKey}
              type="file"
              style={{ display: "none" }}
              onChange={onFilesChange}
            />
          </Button>
        </Box>
        <Box paddingRight="space50" flexGrow={10}>
          <MessageInput
            assets={files}
            message={message}
            onChange={(e) => {
              sdkConvo.typing();
              setMessage(e);
            }}
            onEnterKeyPress={async () => {
              await onMessageSend();
            }}
            onFileRemove={onFileRemove}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="start"
        >
          {message || files.length ? (
            <SendMessageButton message={message} onClick={onMessageSend} />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default MessageInputField;

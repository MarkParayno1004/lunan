import { Box } from "@twilio-paste/core";
import { ChatComposer } from "@twilio-paste/core/chat-composer";
import {
  $getRoot,
  ClearEditorPlugin,
  CLEAR_EDITOR_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_ENTER_COMMAND,
  useLexicalComposerContext,
} from "@twilio-paste/lexical-library";
import { useEffect } from "react";
import MessageFile from "./MessageFile";

const EnterKeyPlugin = (props) => {
  const { onEnterKeyPress } = props;
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      () => {
        onEnterKeyPress();
        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor, onEnterKeyPress]);

  return null;
};

const MessagePropPlugin = (props) => {
  const { message } = props;
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (message === undefined || message === null || message.length === 0) {
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    }
  }, [editor, message]);

  return null;
};

const MessageInput = (props) => {
  const { onEnterKeyPress, message } = props;

  return (
    <Box>
      <Box marginLeft={"space40"}>
        <ChatComposer
          config={{
            namespace: "message-input",
            onError: (e) => {
              throw e;
            },
          }}
          ariaLabel="A basic chat composer"
          placeholder="Add your message"
          onChange={(editorState) => {
            editorState.read(() => {
              const text = $getRoot().getTextContent();
              props.onChange(text);
            });
          }}
        >
          <ClearEditorPlugin />
          <MessagePropPlugin message={message} />
          <EnterKeyPlugin onEnterKeyPress={onEnterKeyPress} />
        </ChatComposer>
      </Box>
      {props.assets.length > 0 && (
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {props.assets.map(({ name, size }) => (
            <MessageFile
              key={`${name + "_" + size}`}
              media={{ filename: name, size }}
              onRemove={() => props.onFileRemove(name + "_" + size)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MessageInput;

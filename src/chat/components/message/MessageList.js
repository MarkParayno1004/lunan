import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { saveAs } from "file-saver";

import {
  ChatLog,
  ChatMessage,
  ChatMessageMeta,
  ChatMessageMetaItem,
  ChatBubble,
} from "@twilio-paste/core";

import { getBlobFile } from "../../api";
import { actionCreators } from "../../store";
import ImagePreviewModal from "../modals/ImagePreviewModal";
import MessageMedia from "./MessageMedia";
import {
  getSdkMediaObject,
  getSdkMessageObject,
  getSdkParticipantObject,
} from "../../conversations-objects";
import { getSdkConversationObject } from "../../conversations-objects";
import TimeAgo from "javascript-time-ago";
import Reactions from "./Reactions";
import { MessageStatus } from "./MessageStatus";
import { MAX_MESSAGE_LINE_WIDTH } from "../../constants";
import wrap from "word-wrap";

function getMessageTime(message) {
  const dateCreated = message.dateCreated;

  return dateCreated
    ? new TimeAgo("en-US").format(dateCreated, "twitter-now")
    : "";
}

const MetaItemWithMargin = (props) => (
  <ChatMessageMetaItem>
    <div style={{ marginTop: "5px" }}>{props.children}</div>
  </ChatMessageMetaItem>
);

const MessageList = (props) => {
  const { messages, conversation, lastReadIndex } = props;
  // const theme = useTheme();
  const myRef = useRef(null);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [imagePreview, setImagePreview] = useState(null);
  const [horizonMessageCount, setHorizonMessageCount] = useState(0);
  // const [showHorizonIndex, setShowHorizonIndex] = useState<number>(0);
  const [scrolledToHorizon, setScrollToHorizon] = useState(false);
  const conversationAttachments = useSelector(
    (state) => state.attachments[conversation.sid]
  );

  useEffect(() => {
    if (scrolledToHorizon || !myRef.current) {
      return;
    }
    myRef.current.scrollIntoView({
      behavior: "smooth",
    });
    setScrollToHorizon(true);
  });

  useEffect(() => {
    if (lastReadIndex === -1 || horizonMessageCount) {
      return;
    }
    // const showIndex = 0;
    getSdkConversationObject(conversation)
      .getUnreadMessagesCount()
      .then((count) => {
        setHorizonMessageCount(count ?? 0);
        // setShowHorizonIndex(showIndex);
      });
  }, [messages, lastReadIndex]);

  // Updates the user list based on message authors to be able to get friendly names
  useEffect(() => {
    messages.forEach((message) => {
      const participant = message.participantSid
        ? participantsBySid.get(message.participantSid)
        : null;
      if (participant && participant.identity) {
        if (!users[participant.identity]) {
          const sdkParticipant = getSdkParticipantObject(participant);
          sdkParticipant.getUser().then((sdkUser) => {
            updateUser(sdkUser);
          });
        }
      }
    });
  }, [messages]);

  if (messages === undefined) {
    return <div className="empty" />;
  }

  const { addAttachment, addNotifications, updateUser } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // function setTopPadding(index: number) {
  //   if (
  //     props.messages[index] !== undefined &&
  //     props.messages[index - 1] !== undefined &&
  //     props.messages[index].author === props.messages[index - 1].author
  //   ) {
  //     return theme.space.space20;
  //   }
  //   return theme.space.space50;
  // }

  const onDownloadAttachments = async (message) => {
    const attachedMedia = message.attachedMedia?.map(getSdkMediaObject);
    if (message.index === -1) {
      return undefined;
    }
    if (!attachedMedia?.length) {
      return new Error("No media attached");
    }

    for (const media of attachedMedia) {
      const blob = await getBlobFile(media, addNotifications);
      addAttachment(props.conversation.sid, message.sid, media.sid, blob);
    }

    return;
  };

  const onFileOpen = (file, { filename }) => {
    saveAs(file, filename ?? "");
  };

  const participantsBySid = new Map(props.participants.map((p) => [p.sid, p]));

  const getAuthorFriendlyName = (message) => {
    const author = message.author ?? "";
    if (message.participantSid == null) return author;

    const participant = participantsBySid.get(message.participantSid);
    if (participant == null || participant.identity == null) return author;

    const user = users[participant.identity];
    return user?.friendlyName || author;
  };

  return (
    <ChatLog>
      {messages.map((message) => {
        const messageImages = [];
        const messageFiles = [];
        (message.attachedMedia || []).forEach((file) => {
          const { contentType } = file;
          if (contentType.includes("image")) {
            messageImages.push(file);
            return;
          }
          messageFiles.push(file);
        });
        const attributes = message.attributes;

        const wrappedBody = wrap(message.body ?? "", {
          width: MAX_MESSAGE_LINE_WIDTH,
          indent: "",
          cut: true,
        });

        const isOutbound = message.author === localStorage.getItem("username");
        let metaItems = [
          <ChatMessageMetaItem key={0}>
            <Reactions
              reactions={attributes.reactions}
              onReactionsChanged={(reactions) => {
                getSdkMessageObject(message).updateAttributes({
                  ...attributes,
                  reactions,
                });
              }}
            />
          </ChatMessageMetaItem>,
          <MetaItemWithMargin key={1}>
            <MessageStatus
              message={message}
              channelParticipants={props.participants}
            />
          </MetaItemWithMargin>,
          <MetaItemWithMargin key={2}>
            {isOutbound
              ? `${getAuthorFriendlyName(message)}・${getMessageTime(message)}`
              : `${getMessageTime(message)}・${getAuthorFriendlyName(message)}`}
          </MetaItemWithMargin>,
        ];

        if (isOutbound) {
          metaItems = metaItems.reverse();
        }

        return (
          // todo: delete only when full functionality is transferred over
          // <div key={message.sid + "message"}>
          //   {lastReadIndex !== -1 &&
          //   horizonMessageCount &&
          //   showHorizonIndex === message.index ? (
          //     <Horizon ref={myRef} messageCount={horizonMessageCount} />
          //   ) : null}
          //   <MessageView
          //     reactions={attributes["reactions"]}
          //     text={wrappedBody}
          //     media={
          //       message.attachedMedia?.length ? (
          //         <MessageMedia
          //           key={message.sid}
          //           attachments={conversationAttachments?.[message.sid]}
          //           onDownload={async () =>
          //             await onDownloadAttachments(message)
          //           }
          //           images={messageImages}
          //           files={messageFiles}
          //           sending={message.index === -1}
          //           onOpen={(
          //             mediaSid: string,
          //             image?: ReduxMedia,
          //             file?: ReduxMedia
          //           ) => {
          //             if (file) {
          //               onFileOpen(
          //                 conversationAttachments?.[message.sid][mediaSid],
          //                 file
          //               );
          //               return;
          //             }
          //             if (image) {
          //               setImagePreview({
          //                 message,
          //                 file: conversationAttachments?.[message.sid][
          //                   mediaSid
          //                 ],
          //                 sid: mediaSid,
          //               });
          //             }
          //           }}
          //         />
          //       ) : null
          //     }
          //     author={message.author ?? ""}
          //     getStatus={getMessageStatus(message, props.participants)}
          //     onDeleteMessage={async () => {
          //       try {
          //         await getSdkMessageObject(message).remove();
          //         successNotification({
          //           message: "Message deleted.",
          //           addNotifications,
          //         });
          //       } catch (e) {
          //         unexpectedErrorNotification(e.message, addNotifications);
          //       }
          //     }}
          //     topPadding={setTopPadding(index)}
          //     lastMessageBottomPadding={index === messagesLength - 1 ? 16 : 0}
          //     sameAuthorAsPrev={setTopPadding(index) !== theme.space.space20}
          //     messageTime={getMessageTime(message)}
          //     updateAttributes={(attribute) =>
          //       getSdkMessageObject(message).updateAttributes({
          //         ...attributes,
          //         ...attribute,
          //       })
          //     }
          //   />
          // </div>
          <ChatMessage
            variant={isOutbound ? "outbound" : "inbound"}
            key={`${message.sid}.message`}
          >
            <ChatBubble>
              {wrappedBody}
              <MessageMedia
                key={message.sid}
                attachments={conversationAttachments?.[message.sid]}
                onDownload={async () => await onDownloadAttachments(message)}
                images={messageImages}
                files={messageFiles}
                sending={message.index === -1}
                onOpen={(mediaSid, image, file) => {
                  if (file) {
                    onFileOpen(
                      conversationAttachments?.[message.sid][mediaSid],
                      file
                    );
                    return;
                  }
                  if (image) {
                    setImagePreview({
                      message,
                      file: conversationAttachments?.[message.sid][mediaSid],
                      sid: mediaSid,
                    });
                  }
                }}
              />
            </ChatBubble>
            <ChatMessageMeta
              aria-label={`said by ${getAuthorFriendlyName(message)}`}
            >
              {metaItems}
            </ChatMessageMeta>
          </ChatMessage>
        );
      })}
      {imagePreview
        ? (function () {
            const dateString = imagePreview?.message.dateCreated;
            const date = dateString ? new Date(dateString) : "";
            return (
              <ImagePreviewModal
                image={imagePreview.file}
                isOpen={!!imagePreview}
                author={
                  imagePreview
                    ? getAuthorFriendlyName(imagePreview.message)
                    : ""
                }
                date={
                  date
                    ? date.toDateString() +
                      ", " +
                      date.getHours() +
                      ":" +
                      (date.getMinutes() < 10 ? "0" : "") +
                      date.getMinutes()
                    : ""
                }
                handleClose={() => setImagePreview(null)}
                onDownload={() => {
                  saveAs(
                    imagePreview.file,
                    imagePreview.message.attachedMedia?.find(
                      ({ sid }) => sid === imagePreview.sid
                    )?.filename ?? ""
                  );
                }}
              />
            );
          })()
        : null}
    </ChatLog>
  );
};

export default MessageList;

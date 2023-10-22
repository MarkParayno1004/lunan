import { getMessageStatus } from "../../api";
import { MessageStatus as MessageStatusType } from "../../store/reducers/messageListReducer";
import { useEffect, useState } from "react";
import DeliveredIcon from "../icons/Delivered";
import SendingIcon from "../icons/Sending";
import FailedIcon from "../icons/Failed";
import ReadIcon from "../icons/Read";

const statusStyle = {
  display: "inline-block",
  verticalAlign: "middle",
};

const statusIconStyle = {};

const MessageStatus = (props) => {
  const [status, setStatus] = useState({});

  useEffect(() => {
    getMessageStatus(props.message, props.channelParticipants).then(
      (receipt) => {
        setStatus(receipt);
      }
    );
  }, [props.channelParticipants, props.message]);

  return (
    <>
      {status[MessageStatusType.Delivered] ? (
        <>
          <DeliveredIcon style={{ ...statusStyle, ...statusIconStyle }} />
          {/*{props.channelParticipants.length > 2 && (*/}
          {/*  <span style={statusStyle}>*/}
          {/*    {status[MessageStatusType.Delivered]}*/}
          {/*  </span>*/}
          {/*)}*/}
        </>
      ) : null}
      {status[MessageStatusType.Sending] ? (
        <>
          <SendingIcon style={{ ...statusStyle, ...statusIconStyle }} />
        </>
      ) : null}

      {status[MessageStatusType.Failed] ? (
        <>
          <FailedIcon style={{ ...statusStyle, ...statusIconStyle }} />
          {/*{props.channelParticipants.length > 2 && (*/}
          {/*  <span style={statusStyle}>{status[MessageStatusType.Failed]}</span>*/}
          {/*)}*/}
        </>
      ) : null}

      {status[MessageStatusType.Read] ? (
        <>
          <ReadIcon style={{ ...statusStyle, ...statusIconStyle }} />
          {/*{props.channelParticipants.length > 2 && (*/}
          {/*  <span style={statusStyle}>{status[MessageStatusType.Read]}</span>*/}
          {/*)}*/}
        </>
      ) : null}
    </>
  );
};

export { MessageStatus };

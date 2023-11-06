import React, { useState, useEffect } from "react";
import DeviceSelectionScreen from "./DeviceSelectionScreen/DeviceSelectionScreen";
import IntroContainer from "../IntroContainer/IntroContainer";
import MediaErrorSnackbar from "./MediaErrorSnackbar/MediaErrorSnackbar";
import RoomNameScreen from "./RoomNameScreen/RoomNameScreen";
import { useAppState } from "../../state";
import { useParams } from "react-router-dom";
import useVideoContext from "../../hooks/useVideoContext/useVideoContext";
export var Steps;
(function (Steps) {
  Steps[(Steps["roomNameStep"] = 0)] = "roomNameStep";
  Steps[(Steps["deviceSelectionStep"] = 1)] = "deviceSelectionStep";
})(Steps || (Steps = {}));
export default function PreJoinScreens() {
  const { user } = useAppState();
  const { getAudioAndVideoTracks } = useVideoContext();
  const { URLRoomName } = useParams();
  const [step, setStep] = useState(Steps.roomNameStep);
  const [name, setName] = useState(
    (user === null || user === void 0 ? void 0 : user.displayName) || ""
  );
  const [roomName, setRoomName] = useState("");
  const [mediaError, setMediaError] = useState();
  useEffect(() => {
    if (URLRoomName) {
      setRoomName(URLRoomName);
      if (user === null || user === void 0 ? void 0 : user.displayName) {
        setStep(Steps.deviceSelectionStep);
      }
    }
  }, [user, URLRoomName]);
  useEffect(() => {
    if (step === Steps.deviceSelectionStep && !mediaError) {
      getAudioAndVideoTracks().catch((error) => {
        console.log("Error acquiring local media:");
        console.dir(error);
        setMediaError(error);
      });
    }
  }, [getAudioAndVideoTracks, step, mediaError]);
  const handleSubmit = (event) => {
    event.preventDefault();
    // If this app is deployed as a twilio function, don't change the URL because routing isn't supported.
    // @ts-ignore
    if (!window.location.origin.includes("twil.io") && !window.STORYBOOK_ENV) {
      window.history.replaceState(
        null,
        "",
        window.encodeURI(`/room/${roomName}${window.location.search || ""}`)
      );
    }
    setStep(Steps.deviceSelectionStep);
  };
  return React.createElement(
    IntroContainer,
    null,
    React.createElement(MediaErrorSnackbar, { error: mediaError }),
    step === Steps.roomNameStep &&
      React.createElement(RoomNameScreen, {
        name: name,
        roomName: roomName,
        setName: setName,
        setRoomName: setRoomName,
        handleSubmit: handleSubmit,
      }),
    step === Steps.deviceSelectionStep &&
      React.createElement(DeviceSelectionScreen, {
        name: name,
        roomName: roomName,
        setStep: setStep,
      })
  );
}

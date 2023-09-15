import { useState } from "react";
import { styles } from "./styleSupervisor";
import "./index.css";
import { ChatPopup } from "../ChatPopUp/ChatPopup";
export const AvatarSupervisor = (props) => {
  const [hovered, setHovered] = useState(false);

  //!OPEN CHATBOX
  const [chatOpen, setChatOpen] = useState(false);

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };
  return (
    <>
      <button
        onClick={handleChatToggle}
        style={{ background: "none", borderStyle: "none" }}
      >
        <div style={props.style}>
          <div
            className="ms-3"
            id="transition-3"
            style={{
              ...styles.avatarHello,
              ...{ opacity: hovered ? "1" : "0" },
            }}
          >
            Hi Supervisor!!!
          </div>

          <div
            id="transition-3"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              ...styles.chatWithMeButton,
              ...{
                border: hovered ? "1px solid #f5e9cf" : "4px solid #4d455d",
              },
            }}
          ></div>
        </div>
      </button>
      <ChatPopup isOpen={chatOpen} onClose={handleChatToggle} />
    </>
  );
};

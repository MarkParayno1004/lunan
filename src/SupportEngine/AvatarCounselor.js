import { useState } from "react";
import { styles } from "./styleCounselor";

import "./index.css";
export const AvatarCounselor = (props) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={props.style}>
      <div
        className="ms-4"
        id="transition-3"
        style={{ ...styles.avatarHello, ...{ opacity: hovered ? "1" : "0" } }}
      >
        Hi Counselor!!!
      </div>

      <div
        id="transition-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...styles.chatWithMeButton,
          ...{ border: hovered ? "1px solid #f5e9cf" : "4px solid #4d455d" },
        }}
      ></div>
    </div>
  );
};

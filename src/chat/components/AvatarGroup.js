import React from "react";
import { AvatarGroup as PasteAvatarGroup } from "@twilio-paste/avatar";
import Avatar from "./Avatar";

const AvatarGroup = ({ names, size }) => {
  return (
    <PasteAvatarGroup
      size={size ?? "sizeIcon70"}
      variant="user"
      children={names.map((name) => (
        <Avatar name={name} size={size} />
      ))}
    />
  );
};

export { AvatarGroup };
export default AvatarGroup;

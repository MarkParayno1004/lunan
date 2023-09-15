// ChatPopup.js
import React, { useState } from "react";
import "./ChatPopup.css";

export const ChatPopup = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="chat-popup">
        <div className="chat-header">
          <span>Chat</span>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="chat-content">Chat content goes here...</div>
      </div>
    )
  );
};

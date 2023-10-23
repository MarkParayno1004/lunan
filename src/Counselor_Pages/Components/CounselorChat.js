import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase-config";
import "../../css/Chat.css";
import { db, auth } from "../../firebase/firebase-config";
import App from "../../chat/components/App";
import { Provider } from "react-redux";
import { store } from "../../chat/store";
import { Theme } from "@twilio-paste/core/theme";
import { Box } from "@twilio-paste/core";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export const CounselorChat = () => {
  return (
    <div
      className="container-lg d-flex justify-content-center rounded-5 mt-5 ms-5 pb-3"
      id="ChatForm"
    >
      <Box className="container-lg d-flex justify-content-center rounded-5 mt-5 ms-5 pb-3">
        <Provider store={store}>
          <Theme.Provider theme="twilio">
            <Box>
              <App />
            </Box>
          </Theme.Provider>
        </Provider>
      </Box>
    </div>
  );
};

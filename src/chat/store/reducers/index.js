import { combineReducers } from "redux";

import tokenReducer from "./tokenReducer";
import convoReducer from "./convoReducer";
import sidReducer from "./currentConvoReducer";
import messageReducer from "./messageListReducer";
import loadingReducer from "./loadingReducer";
import participantReducer from "./participantsReducer";
import userReducer from "./userReducer";
import unreadMessagesReducer from "./unreadMessagesReducer";
import attachmentsReducer from "./attachmentsReducer";
import { ActionType } from "../action-types";
import typingDataReducer from "./typingDataReducer";
import lastReadIndexReducer from "./lastReadIndexReducer";
import notificationsReducer from "./notificationsReducer";

export const initialState = {
  token: "",
  sid: "",
  messages: {},
  attachments: {},
  participants: {},
  users: {},
  convos: [],
  unreadMessages: {},
  loadingStatus: true,
  typingData: {},
  lastReadIndex: -1,
  notifications: [],
};

const reducers = (state, action) => {
  if (action.type === ActionType.LOGOUT) {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    return appReducer(initialState, action);
  }

  return appReducer(state, action);
};

const appReducer = combineReducers({
  token: tokenReducer,
  convos: convoReducer,
  sid: sidReducer,
  lastReadIndex: lastReadIndexReducer,
  messages: messageReducer,
  loadingStatus: loadingReducer,
  participants: participantReducer,
  users: userReducer,
  unreadMessages: unreadMessagesReducer,
  attachments: attachmentsReducer,
  typingData: typingDataReducer,
  notifications: notificationsReducer,
});

export default reducers;

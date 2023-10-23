import { conversationsMap } from "../../conversations-objects";
import { ActionType } from "../action-types";

const initialState = [];

const convoSorter = (a, b) =>
  (b.lastMessage?.dateCreated?.getTime() ?? b.dateUpdated?.getTime() ?? 0) -
  (a.lastMessage?.dateCreated?.getTime() ?? a.dateUpdated?.getTime() ?? 0);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPSERT_CONVERSATION:
      const {
        sid,
        friendlyName,
        dateUpdated,
        notificationLevel,
        lastReadMessageIndex,
        lastMessage,
      } = action.payload;
      const filteredClone = state.filter(
        (conversation) => conversation.sid !== action.payload.sid
      );

      conversationsMap.set(action.payload.sid, action.payload);

      return [
        ...filteredClone,
        {
          sid,
          friendlyName,
          dateUpdated,
          notificationLevel,
          lastReadMessageIndex,
          lastMessage: {
            ...lastMessage,
          },
        },
      ].sort(convoSorter);
    case ActionType.UPDATE_CONVERSATION: {
      const stateCopy = [...state];
      const target = stateCopy.find(
        (convo) => convo.sid === action.payload.channelSid
      );

      if (target) {
        Object.assign(target, {
          ...action.payload.parameters,
        });
      }

      return stateCopy;
    }
    case ActionType.REMOVE_CONVERSATION: {
      const stateCopy = [...state];

      conversationsMap.delete(action.payload);

      return stateCopy.filter((convo) => convo.sid !== action.payload);
    }
    default:
      return state;
  }
};

export default reducer;

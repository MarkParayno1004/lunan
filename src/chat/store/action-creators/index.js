import { ActionType } from "../action-types";

export const login = (token) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.LOGIN,
      payload: token,
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: ActionType.LOGOUT,
    });
  };
};

export const upsertConversation = (convo) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.UPSERT_CONVERSATION,
      payload: convo,
    });
  };
};

export const removeConversation = (sid) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.REMOVE_CONVERSATION,
      payload: sid,
    });
  };
};

export const updateCurrentConversation = (sid) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.UPDATE_CURRENT_CONVERSATION,
      payload: sid,
    });
  };
};

export const setLastReadIndex = (index) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.CONVERSATION_LAST_READ_INDEX,
      payload: index,
    });
  };
};

export const upsertMessages = (channelSid, messages) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.ADD_MESSAGES,
      payload: { channelSid, messages },
    });
  };
};

export const pushMessages = (channelSid, messages) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.PUSH_MESSAGES,
      payload: { channelSid, messages },
    });
  };
};

export const removeMessages = (channelSid, messages) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.REMOVE_MESSAGES,
      payload: { channelSid, messages },
    });
  };
};

export const updateLoadingState = (loadingStatus) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.UPDATE_LOADING_STATE,
      payload: loadingStatus,
    });
  };
};

export const updateParticipants = (participants, sid) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.UPDATE_PARTICIPANTS,
      payload: { participants, sid },
    });
  };
};

export const updateUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.UPDATE_USER,
      payload: user,
    });
  };
};

export const updateUnreadMessages = (channelSid, unreadCount) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.UPDATE_UNREAD_MESSAGES,
      payload: { channelSid, unreadCount },
    });
  };
};

export const updateConversation = (channelSid, parameters) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.UPDATE_CONVERSATION,
      payload: { channelSid, parameters },
    });
  };
};

export const addAttachment = (channelSid, messageSid, mediaSid, attachment) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.ADD_ATTACHMENT,
      payload: { channelSid, messageSid, mediaSid, attachment },
    });
  };
};

export const clearAttachments = (channelSid, messageSid) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.CLEAR_ATTACHMENTS,
      payload: { channelSid, messageSid },
    });
  };
};

export const startTyping = (channelSid, participant) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.TYPING_STARTED,
      payload: { channelSid, participant },
    });
  };
};

export const endTyping = (channelSid, participant) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.TYPING_ENDED,
      payload: { channelSid, participant },
    });
  };
};

export const addNotifications = (notifications) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.ADD_NOTIFICATIONS,
      payload: notifications,
    });
  };
};

export const removeNotifications = (toIndex) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.REMOVE_NOTIFICATIONS,
      payload: toIndex,
    });
  };
};

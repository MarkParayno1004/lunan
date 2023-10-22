import { ActionType } from "../action-types";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_ATTACHMENT: {
      const { channelSid, messageSid, mediaSid, attachment } = action.payload;
      state[channelSid] = state[channelSid] ?? {};
      state[channelSid][messageSid] = state[channelSid][messageSid] ?? {};

      return {
        ...state,
        [channelSid]: {
          ...(state[channelSid] || {}),
          [messageSid]: Object.assign(state[channelSid][messageSid], {
            [mediaSid]: attachment,
          }),
        },
      };
    }

    case ActionType.CLEAR_ATTACHMENTS: {
      const { channelSid, messageSid } = action.payload;

      return {
        ...state,
        [channelSid]: {
          ...(state[channelSid] || {}),
          [messageSid]: {},
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;

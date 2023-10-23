import { ActionType } from "../action-types";

const initialState = -1;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CONVERSATION_LAST_READ_INDEX:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;

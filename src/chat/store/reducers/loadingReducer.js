import { ActionType } from "../action-types";

const reducer = (state = true, action) => {
  switch (action.type) {
    case ActionType.UPDATE_LOADING_STATE:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;

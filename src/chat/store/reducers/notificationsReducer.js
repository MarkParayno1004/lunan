import { ActionType } from "../action-types";

const reducer = (state = [], action) => {
  switch (action.type) {
    case ActionType.ADD_NOTIFICATIONS:
      return [...state, ...action.payload];
    case ActionType.REMOVE_NOTIFICATIONS: {
      const removeCount = action.payload;
      if (removeCount + 1 > state.length) {
        return [];
      }
      return state.slice(removeCount, state.length);
    }
    default:
      return state;
  }
};

export default reducer;

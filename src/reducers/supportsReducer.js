import _ from "lodash";
import { CREATE_SUPPORT, DELETE_SUPPORT } from "../actions/types";

 const supportsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SUPPORT:
      return { ...state, [action.payload.node]: action.payload.values };
    case DELETE_SUPPORT:
        return _.omit(state, action.payload.id);
    default:
      return {...state};
  }
};

export default supportsReducer
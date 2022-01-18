import _ from "lodash";
import { CREATE_MEMBER, DELETE_MEMBER } from "../actions/types";

const membersReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_MEMBER:
      return {
        ...state,
        [action.payload.id]: action.payload.nodes,
      };
    case DELETE_MEMBER:
      return _.omit(state, action.payload.id);
    default:
      return {...state};
  }
};

export default membersReducer
import { CREATE_MEMBER } from "../actions/types";

const memberCounterReducer = (state = {id:0}, action) => {
  switch (action.type) {
    case CREATE_MEMBER:
      return {...state, id: action.payload.lastMember};
    default:
      return state;
  }
};

export default memberCounterReducer;

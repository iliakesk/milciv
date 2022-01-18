import _ from "lodash";
import { CREATE_NODE, DELETE_NODE } from "../actions/types";



const nodesReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return { ...state, [action.payload.id]: action.payload.coords };
    case DELETE_NODE:
        return _.omit(state, action.payload.id);
    default:
      return {...state};
  }
};

export default nodesReducer
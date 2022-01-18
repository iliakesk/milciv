import { CREATE_NODE } from "../actions/types";

const nodeCounterReducer = (state = {id:0}, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {...state, id: action.payload.lastNode }; //pairnei to swsto lastNode alla den to allazei sto store enw apo to Nodes xeirokinhta to allazei
    default:
      return state;
  }
};

export default nodeCounterReducer
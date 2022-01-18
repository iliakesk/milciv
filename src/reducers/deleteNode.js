import { DELETE_NODE } from "../actions/types";

const deleteNode = (state = [], action) => {
  switch (action.type) {
    case DELETE_NODE:
      return [
        ...state,
        {
          nodes: state.nodes.filter((id) => id !== action.id), currentNode: action.payload.thisNode 
        },
      ];
    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};

export default deleteNode;
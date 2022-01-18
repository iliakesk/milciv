import { combineReducers } from "redux";
import lastAction from "./lastActionReducer";
import nodes from "./nodesReducer";
import members from "./membersReducer";
import supports from "./supportsReducer";
import lastNode from "./nodeCounterReducer";
import lastMember from "./memberCounterReducer";

const rootReducer = combineReducers({
  lastAction,
  nodes,
  members,
  lastNode,
  lastMember,
  supports,
  // edw einai pou pairnoun to onoma tous ta diafora elements tou state p.x. nodes, members, auth ktl
});
export default rootReducer;
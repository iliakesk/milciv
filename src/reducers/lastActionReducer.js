import { CREATE_NODE, DELETE_NODE,CREATE_MEMBER, DELETE_MEMBER, CREATE_SUPPORT, DELETE_SUPPORT } from "../actions/types";




// export default (state = {action:"not yet", id:"none"}, action) => {
//   console.log(action)
//   switch (action.type){
//     case action.type:
//       return {...state, action: action.type, id:  "fuck off"};
//     default:
//       return {...state};
//   }
  
// };


const lastActionReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return { action: action.type, id: action.payload.id };
    case DELETE_NODE:
      return { action: action.type, id: action.payload.id };
    case CREATE_MEMBER:
      return { action: action.type, id: action.payload.id };
    case DELETE_MEMBER:
      return { action: action.type, id: action.payload.id };
    case CREATE_SUPPORT:
      return { action: action.type, id: action.payload.id };
    case DELETE_SUPPORT:
      return { action: action.type, id: action.payload.id };
    default:
      return {...state};
  }
};

export default lastActionReducer
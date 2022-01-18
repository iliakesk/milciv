import {
  CREATE_NODE,
  DELETE_NODE,
  CREATE_MEMBER,
  DELETE_MEMBER,
  CREATE_SUPPORT,
  DELETE_SUPPORT,
} from "./types";


export const createNode = (text) => ({
  type: CREATE_NODE,
  payload: { lastNode: text.lastNode, id: text.node, coords: text.coords },
});

export const deleteNode = (id) => ({
  type: DELETE_NODE,
  payload:{"id": id},
});

export const createMember = (text) => ({
  type: CREATE_MEMBER,
  payload: { lastMember: text.lastMember, id: text.member, nodes: text.nodes },
});

export const deleteMember = (id) => ({
  type: DELETE_MEMBER,
  payload:{"id": id},
});

export const createSupport = (text) => ({
  type: CREATE_SUPPORT,
  payload: { node: text.supportedNode, values: text.values },
});

export const deleteSupport = (id) => ({
  type: DELETE_SUPPORT,
  payload:{"id": id},
});
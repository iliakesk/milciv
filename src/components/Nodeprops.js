import React, { Component } from "react";
import { createNode, deleteNode, deleteSupport} from "../actions";
import { connect } from "react-redux";
import Supports from "./Supports"

class Nodeprops extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.handleKeyPress = this.handleKeyPress.bind(this);
  // }

  render() {
    return <Supports/>;
  }
}

const mapStateToProps = (state) => {
  return { nodes: state.nodes, supports:state.supports, lastNode:state.lastNode };
};

export default connect(mapStateToProps, { createNode, deleteNode, deleteSupport })(Nodeprops);
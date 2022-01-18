import React, { Component } from "react";
// import Elements from "./Elements";
import { createNode, deleteNode, deleteSupport} from "../actions";
import { connect } from "react-redux";

class Nodes extends Component {
  constructor(props) {
    super(props);
    this.handleCreateNode = this.handleCreateNode.bind(this);
    this.handleDeleteNode = this.handleDeleteNode.bind(this);

    
    // this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  clearValues = (x, y, z) => {
    x.value = "";
    y.value = "";
    z.value = "";
    x.focus();
  };

  validateValues = (x, y, z) => {
    if (x === "" || y === "" || z === "") {
      alert("There should be values");
      return false;
    }
    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      alert("There should be only numbers");
      return false;
    }
    if (this.nodeExists(x, y, z)) {
      alert("This node already exists");
      return false;
    }
    return true;
  };

  nodeExists = (x, y, z) => {
    //ayto yparxei periptwsh na argei poly isws prepei na vrethei kalyterow algorithmos
    let nodes = Object.keys(this.props.nodes);
    if (nodes.length === 0) {
      return false;
    }
    for (let i = 0; i < nodes.length; i++) {
      let x1 = this.props.nodes[nodes[i]]["x"];
      let y1 = this.props.nodes[nodes[i]]["y"];
      let z1 = this.props.nodes[nodes[i]]["z"];
      if (x1 === x && y1 === y && z1 === z) {
        return true;
      }
    }
    return false;
  };

  handleFields = () => {
    let X_input = document.getElementById("firstNode");
    let Y_input = document.getElementById("secondNode");
    let Z_input = document.getElementById("thirdNode");
    let x = X_input.value;
    let y = Y_input.value;
    let z = Z_input.value;
    this.clearValues(X_input, Y_input, Z_input);
    if (this.validateValues(x, y, z)) {
      return { x, y, z };
    } else {
      return false;
    }
  };

  handleCreateNode = (e) => {
    e.preventDefault();
    let coords = this.handleFields();
    let lastNode = this.props.lastNode.id + 1;
    if (coords) {
      this.props.createNode({coords, lastNode, node:lastNode});
    }
  };

  handleDeleteNode() {
    let node = document.getElementById("delnode");
    if (node.value){
      this.props.deleteNode(node.value);
      this.props.deleteSupport(node.value);
    };
  }

  // handleKeyPress(e) {
  //   e.preventDefault();
  //   console.log("pressed enter in nodes");
  //   if (e.keyCode === 13) {
  //     this.handleCreateNode();
  //     // mporw na prosthesw kati gia na leitourgei kai
  //     //to delete me to enterKey analoga me to focus pou exw
  //   }
  // }

  renderListNodes() {
    return Object.keys(this.props.nodes).map((key) => {
      return <option key={key}>{key}</option>;
    });
  }

  renderInputNodes() {
    return (
      <div className="nodes-form">
        <form onSubmit={this.handleCreateNode}>
          <div className="nodes-form-element">
          <label>
            x:
            <input id="firstNode" className="input" type="text" name="x" />
          </label>
          </div>
          <div className="nodes-form-element">
          <label>
            y:
            <input id="secondNode" className="input" type="text" name="y" />
          </label>
          </div>
          <div className="nodes-form-element">
          <label>
            z:
            <input id="thirdNode" className="input" type="text" name="z" />
          </label>
          </div>
          <input
          className="button" type="submit" name="submit" value="Enter node" />
        </form>
      </div>
    );
  }

  renderDelNodes() {
    return (
      <div>
        <label>Delete Node:</label>
        <select className="select" id="delnode" type="text" name="delete-node" onChange={this.renderNodeProperties}> 
          <option></option>
          {this.renderListNodes()}
        </select>

        <input
          className="button"
          type="button"
          value="Delete"
          onClick={this.handleDeleteNode}
        ></input>
      </div>
    );
  }


renderManageNodes(){
  return (
  <div className = "nodeVisible">
    {this.renderInputNodes()}
    {this.renderDelNodes()}
  </div>
  )}

  render() {
    return (
      <div className="nodes">
        {/* AYTO THA XREIASTEI NA ALLAJEI TOULAXISTON SE OTI AFORA TA CLASSNAMES
        GIATI ALLAJA TON SXEDIASMO */}
        <div>
          <label htmlFor="toggle1">Nodes</label>
          <input type="checkbox" id="toggle1"></input>
          {this.renderManageNodes()}
        </div>
        {/* <div>
          <label htmlFor="toggle2">Supports</label>
          <input type="checkbox" id="toggle2"></input>
          <div className = "supportVisible">
            This is supports
          </div>
        </div>
        <div>
          <label htmlFor="toggle4">Elastic</label>
          <input type="checkbox" id="toggle4"></input>
          <div className = "elasticVisible">
            This is for elastic nodes
          </div>
        </div>
        <div>
          <label htmlFor="toggle3">Rigid</label>
          <input type="checkbox" id="toggle3"></input>
          <div className = "rigidVisible">
            This is for rigid nodes
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { nodes: state.nodes, supports:state.supports, lastNode:state.lastNode };
};

export default connect(mapStateToProps, { createNode, deleteNode, deleteSupport })(Nodes);












// //EINAI GIA NA DINEI STOIXEIA TWN KOMVWN
// renderNodeProperties(){
//   let nodeField = document.getElementById("delnode")
//   if (nodeField){
//     let node= nodeField.value
//     console.log(node)
//       return(
//         <div>
//           <div>
//             here properties
//           </div>
//           <div>
//             {node} 
//           </div>
//         </div>
//       )
//     }
//   }
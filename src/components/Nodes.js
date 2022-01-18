import React, { Component } from "react";
import { createNode, deleteNode, deleteSupport} from "../actions";
import { connect } from "react-redux";
import {NavLink} from "react-router-dom";


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
    let node = document.getElementById("choose-node");
    if (node.value){
      this.props.deleteNode(node.value);
      this.props.deleteSupport(node.value);
    };
  }

  renderListNodes() {
    return Object.keys(this.props.nodes).map((key) => {
      return <option key={key}>{key}</option>;
    });
  }

  renderInputNodes() {
    return (
      <div className="form" id="nodes-form">
        <div className="form-section form-section-top-buttons">
              <select id="choose-node" type="text" name="delete-node" onChange={this.renderNodeProperties}> 
                <option></option>
                {this.renderListNodes()}
              </select>
              <div className="node-top-buttons">
                  <input
                  className="btn-modelling"
                  type="button"
                  value="Edit"
                  //onClick={this.handleDeleteNode}
                ></input>
                  <input
                  className="btn-modelling"
                  type="button"
                  value="Delete"
                  onClick={this.handleDeleteNode}
                ></input>
                <input
                  className="btn-modelling"
                  type="button"
                  value="Add new"
                  //onClick={this.handleDeleteNode}
                ></input>
            </div>
        </div>
          <form onSubmit={this.handleCreateNode}>
        <div className="form-section form-section-coordinates">
            <div className="form-subtitle">Coordinates</div>
            <div className="coordinates">
                <div>
                  <label>x:</label>
                  <input id="firstNode" className="input" type="text" name="x" />
                </div>
                <div>
                <label>y:</label>
                  <input id="secondNode" className="input" type="text" name="y" />
                </div>
                <div>
                <label>z:</label>
                  <input id="thirdNode" className="input" type="text" name="z" />
                </div>
            </div>
        </div>
        <div className="form-section form-section-loads">
            <div className="form-subtitle">Loads</div>
            <div className="form-load-inputs">
              <div className="form-load-inputs-section">
                    <div>
                        <label>Px:</label>
                        <input id="Px" className="input" type="text" name="x" />
                    </div>
                    <div>
                        <label>Py:</label>
                        <input id="Py" className="input" type="text" name="y" />
                    </div>
                    <div>
                        <label>Pz:</label>
                        <input id="Pz" className="input" type="text" name="z" />
                    </div>
                </div>
                <div className="form-load-inputs-section">
                    <div>
                        <label>Mx:</label>
                        <input id="Mx" className="input" type="text" name="x" />
                    </div>
                    <div>
                        <label>My:</label>
                        <input id="My" className="input" type="text" name="y" />
                    </div>
                    <div>
                        <label>Mz:</label>
                        <input id="Mz" className="input" type="text" name="z" />
                    </div>
                </div>
            </div>
        </div>
        <div className="form-section form-section-supports">
            <div className="form-subtitle">Supports</div>
                  
        </div>
        <div className="form-section form-section-spring">
            <div className="form-subtitle">Spring Constants</div>
                  
        </div>
        <div className="form-section form-section-displacements">
            <div className="form-subtitle">Initial Displacements</div>
                  
        </div>
        <input
                    className="btn-modelling" type="submit" name="submit" value="Save" />
        </form>

        {/* <label>Insert nodes</label>
        <form onSubmit={this.handleCreateNode}>
          <div className="form-element nodes-form-element">
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
            className="btn-modelling" type="submit" name="submit" value="Save" />
        </form> */}
      </div>
    );
  }

  // renderDelNodes() {
  //   return (
  //     <div>
  //       <label>Delete nodes</label>
  //       <div className="select">
  //         <select id="delnode" type="text" name="delete-node" onChange={this.renderNodeProperties}> 
  //           <option></option>
  //           {this.renderListNodes()}
  //         </select>
      
  //         <input
  //           className="btn-modelling"
  //           type="button"
  //           value="Delete"
  //           onClick={this.handleDeleteNode}
  //         ></input>
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    return (
      
      <div className="model-box">
          <NavLink to="/nodes" className="form-title">Nodes</NavLink>
          {this.renderInputNodes()}
          {/* {this.renderDelNodes()} */}
          <NavLink to="/members" className="form-title">Members</NavLink>
          <NavLink to="/materials" className="form-title">Sections</NavLink>
          <NavLink to="/sections" className="form-title">Materials</NavLink>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { nodes: state.nodes, supports:state.supports, lastNode:state.lastNode };
};

export default connect(mapStateToProps, { createNode, deleteNode, deleteSupport })(Nodes);
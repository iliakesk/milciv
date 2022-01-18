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
              <label>Node:</label>
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
                  <input id="firstNode" className="input" type="text" name="x" placeholder="m" />
                </div>
                <div>
                <label>y:</label>
                  <input id="secondNode" className="input" type="text" name="y" placeholder="m" />
                </div>
                <div>
                <label>z:</label>
                  <input id="thirdNode" className="input" type="text" name="z" placeholder="m" />
                </div>
                <input
                  className="btn-modelling-multiple-nodes"
                  type="button"
                  value="Arrow"
                  onClick={this.handleDeleteNode}
                ></input>
            </div>
        </div>
        <div className="form-section form-section-loads">
            <div className="form-subtitle">Loads</div>
            <div className="form-load-inputs">
              <div className="form-load-inputs-section">
                    <div>
                        <label>Px:</label>
                          <input id="Px" className="input" type="text" name="x" placeholder="KN" />

                    </div>
                    <div>
                        <label>Py:</label>
                          <input id="Py" className="input" type="text" name="y" placeholder="KN" />

                    </div>
                    <div>
                        <label>Pz:</label>
                          <input id="Pz" className="input" type="text" name="z" placeholder="KN" />

                    </div>
                </div>
                <div className="form-load-inputs-section">
                    <div>
                        <label>Mx:</label>
                          <input id="Mx" className="input" type="text" name="z" placeholder="KNm" />

                    </div>
                    <div>
                        <label>My:</label>
                          <input id="My" className="input" type="text" name="z" placeholder="KNm" />

                    </div>
                    <div>
                        <label>Mz:</label>
                          <input id="Mz" className="input" type="text" name="z" placeholder="KNm" />
                    </div>
                </div>
            </div>
        </div>
        <div className="form-section form-section-supports">
            <div className="form-subtitle">Supports</div>
              <div className="form-supports-inputs">
                <div className="form-supports-inputs-section">
                  <label>Translation</label>
                    <div className="form-supports-inputs-section-element">
                        <label>Full support x:</label>
                        <input id="x" className="input-check" type="checkbox" name="x" />
                    </div>
                          <input id="x" className="input" type="text" name="x" placeholder="KNm" />

                    <div className="form-supports-inputs-section-element">
                        <label>Full support y:</label>
                        <input id="y" className="input-check" type="checkbox" checked="true" name="y" />
                    </div>
                          <input id="x" className="input" type="text" name="x" placeholder="KNm" />

                    <div className="form-supports-inputs-section-element">
                        <label>Full support z:</label>
                        <input id="z" className="input-check" type="checkbox" checked="true" name="z" />
                    </div>
                          <input id="x" className="input" type="text" name="x" placeholder="KNm" />

                </div>
                <div className="form-supports-inputs-section">
                  <label>Rotation</label>
                    <div className="form-supports-inputs-section-element">
                        <label>Full support x:</label>
                        <input id="x" className="input-check" type="checkbox" checked="true" name="x" />
                    </div>
                          <input id="x" className="input" type="text" name="x" placeholder="KNrad?" />

                    <div className="form-supports-inputs-section-element">
                        <label>Full support y:</label>
                        <input id="y" className="input-check" type="checkbox" checked="true" name="y" />
                    </div>
                          <input id="x" className="input" type="text" name="x" placeholder="KNrad?" />

                    <div className="form-supports-inputs-section-element">
                        <label>Full support z:</label>
                        <input id="z" className="input-check" type="checkbox" checked="true" name="z" />
                    </div>
                          <input id="x" className="input" type="text" name="x" placeholder="KNrad?" />

                </div>
              </div>
        </div>

        <div className="form-section form-section-displacements">
            <div className="form-subtitle">Initial Displacements</div>
            <div className="form-displacements-inputs">
                <div className="form-displacements-inputs-section">
                  <label>Translation</label>
                  <div>
                        <label>x:</label>
                          <input id="dx" className="input" type="text" name="dx" placeholder="m" />

                    </div>
                    <div>
                        <label>y:</label>
                        <input id="dy" className="input" type="text" name="dy" placeholder="m" />

                    </div>
                    <div>
                        <label>z:</label>
                          <input id="dz" className="input" type="text" name="dz" placeholder="m" />

                    </div>
                </div>
                <div className="form-displacements-inputs-section">
                  <label>Rotation</label>
                  <div>
                        <label>x:</label>
                          <input id="rdx" className="input" type="text" name="rdx" placeholder="rad" />

                    </div>
                    <div>
                        <label>y:</label>
                          <input id="rdy" className="input" type="text" name="rdy" placeholder="rad" />

                    </div>
                    <div>
                        <label>z:</label>
                          <input id="rdz" className="input" type="text" name="rdz" placeholder="rad" />
                    </div>
                </div>
              </div>      
        </div>
        <input
                    className="btn-modelling" type="submit" name="submit" value="Save" />
        </form>

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
          <div className="form-title">Nodes</div>
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
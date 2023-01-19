import React, { Component, useState } from "react";
import { createNode, deleteNode, createSupport, deleteSupport} from "../actions";
import { connect } from "react-redux";
// import {NavLink} from "react-router-dom";
// import { calculate } from "../calculations/createMatrices"
// import { cbrt } from "mathjs";
// import { Spring, animated, useTransition } from 'react-spring'


class Nodes extends Component {
  constructor(props) {
    super(props);
    this.handleCreateNode = this.handleCreateNode.bind(this);
    this.handleDeleteNode = this.handleDeleteNode.bind(this);
    // this.renderInputNodes = this.renderInputNodes.bind(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);

  }

  componentDidMount(){
    this.handleCheckBoxes()
    
  }

  clearValues(arr) {
    arr.forEach((field) => {
      field.value = "";
      field.checked=false;
    })
    //focus on x coordinate field
    arr[1].focus();
  };

  validateValues(arr) {
    arr.forEach((value) => {
      if (isNaN(value)) {
        alert("All the fields should contain numbers");
        return false;
      }
    })
    return true;
  }


  validateNodes (x, y, z) {
    if (x === "" || y === "" || z === "") {
      alert("There should be values in all node coordinate fields");
      return false;
    }if (isNaN(x) || isNaN(x) || isNaN(x)) {
      alert("All coordinate values should be numbers");
      return false;
    }
    if (this.nodeExists(x, y, z)) {
      alert("This node already exists");
      return false;
    }
    return true;
  };

  handleCheckBoxes() {
    let { full_support_fields, support_fields, displacement_fields, isSupport} = this.getAllFields();
    let allboxes = [...full_support_fields, ...support_fields, ...displacement_fields]
    allboxes.map(element => element.disabled=true)

    //eventListener for changing the returning value of checkbox and the enabled/disabled state of preceding text field
    full_support_fields.map((box, index) => {
      return  box.addEventListener('change', function (e) {
                  if (e.target.checked) {
                    e.target.value = "1";
                    support_fields[index].value="";
                    support_fields[index].disabled=true;
                  }else{
                    e.target.value = "";
                    support_fields[index].disabled=false;
                  }
                })
              })
    
    full_support_fields.map((field) => {
        let event = new Event('change');
        return field.dispatchEvent(event);
    }
  )

    //eventListener for changing enabled/disabled state of preceding text and checkbox fields
    isSupport.addEventListener('change', function (e) {
      if (e.target.checked){
        e.target.value = "1";
        allboxes.map(box => box.disabled=false)
      }else{
        e.target.value = "";
        full_support_fields.map(field => field.checked=false)
        allboxes.map(box => box.value="")
        allboxes.map(box => box.disabled=true)
      }
    })
  }


  nodeValues() {
    let {coord_fields, full_support_fields, support_fields, displacement_fields, load_fields, isSupport} = this.getAllFields();

    let allFields = [...coord_fields, ...full_support_fields, ...support_fields, ...displacement_fields, ...load_fields]
    let allValues = allFields.map((field)=>field.value)
    // IF all values are OK it returns the node nodeValues 
    if (this.validateNodes(allValues[0], allValues[1], allValues[2]) & this.validateValues(allValues.slice(10)) ) {
        let nodeData =  this.handleNodeInputData(coord_fields,
                                              full_support_fields,
                                              support_fields,
                                              displacement_fields,
                                              load_fields,
                                              isSupport)
        this.clearValues([isSupport, ...allFields]);
        
        return nodeData;
    }
    return false;
  }

  getAllFields() {
    let coord_fields = ["xcoord", "ycoord", "zcoord"].map((field)=>document.getElementById(field))
    let full_support_fields = ["full-supx", "full-supy", "full-supz", "full-supRx", "full-supRy", "full-supRz"].map((field)=>document.getElementById(field))
    let support_fields = ["supx", "supy", "supz", "supRx", "supRy", "supRz"].map((field)=>document.getElementById(field))
    let displacement_fields = ["dx", "dy", "dz", "rdx", "rdy", "rdz"].map((field)=>document.getElementById(field))
    let load_fields = ["Px", "Py", "Pz", "Mx", "My", "Mz"].map((field)=>document.getElementById(field))
    let isSupport = document.getElementById("is-support");

    return {coord_fields, full_support_fields, support_fields, displacement_fields, load_fields, isSupport}
  }



  handleNodeInputData(...args) {
      let coords = args[0].map((field)=>field.value);
      let full_support_values = args[1].map((field)=>field.value==="1"?"F":"R");
      let spring_support_values = args[2].map((field)=>field.value);
      let displacement_values = args[3].map((field)=>field.value);
      let load_values = args[4].map((field)=>field.value);
      let is_support = args[5].value;

      let node = {x:coords[0], y:coords[1], z:coords[2]};
      let restrains = full_support_values.join('');

      if (restrains === "RRRRRR") {
        is_support = 0
      }

      let spring_supports = {x:spring_support_values[0],
                              y:spring_support_values[1],
                              z:spring_support_values[2],
                              rx:spring_support_values[3],
                              ry:spring_support_values[4],
                              rz:spring_support_values[5]}

      let displacements = {tx:displacement_values[0],
                            ty:displacement_values[1],
                            tz:displacement_values[2],
                            rx:displacement_values[3],
                            ry:displacement_values[4],
                            rz:displacement_values[5]};

      let loads = {Px:load_values[0],
                    Py:load_values[1],
                    Pz:load_values[2],
                    Mx:load_values[3],
                    My:load_values[4],
                    Mz:load_values[5]};

      let node_data = {};
      if (is_support){
        //an den yparxoun loads prepei na kanw kati na min to stelnei?
        node_data = { is_support, restrains, spring_supports, displacements, loads }
      }else{
        node_data = { loads }
      }
    return { node, node_data }
  }


  handleCreateNode(e) {
    e.preventDefault();
    let nodeValues = this.nodeValues()
    let coords = nodeValues.node;
    let node_data = nodeValues.node_data

    let lastNode = this.props.lastNode.id + 1;
    if (coords) {
      this.props.createNode({coords, lastNode, node:lastNode});
    }
    if (node_data.is_support) {
      delete node_data.is_support;
      delete node_data.loads
      this.props.createSupport({ node:lastNode, node_data });
    }

    // if (!Object.values(node_data.loads).every(x => x==='')) {
    //   console.log("NEED TO ADD LOAD HERE")
    // }
  };

  nodeExists(x, y, z) {
    //ayto yparxei periptwsh na argei poly isws prepei na vrethei kalyteros algorithmos
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

  
  // findMember(){
  //   console.log('implement function to find members')
  // }

  handleEditNode(){
    console.log('implement function to edit nodes')
  }

  handleNodeProperties(){
    console.log('implement function to show node properties')
  }

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
                  <select id="choose-node" type="text" name="choose-node" onChange={this.handleNodeProperties}> 
                    <option></option>
                    {this.renderListNodes()}
                  </select>
                  <div className="node-top-buttons">
                      <input
                      className="btn-modelling"
                      type="button"
                      value="Edit"
                      onClick={this.handleEditNode}
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
                      <label for="xcoord">x:</label>
                      <input id="xcoord" type="text" name="xcoord" placeholder="m " />
                    </div>
                    <div>
                    <label for="ycoord">y:</label>
                      <input id="ycoord" type="text" name="ycoord" placeholder="m " />
                    </div>
                    <div>
                    <label for="zcoord">z:</label>
                      <input id="zcoord" type="text" name="zcoord" placeholder="m " />
                    </div>
                </div>
            </div>
            <div className="form-section form-section-supports">
                <div className="form-subtitle">Supports</div>
                  <div className="is-support">
                    <input id="is-support" type="checkbox" name="is-support" value = "" />
                    <label for="is-support">Support</label>
                  </div>
                  <div className="node-inputs">
                    <div className="node-inputs-section">
                            
                            <input id="supx" type="text" name="supx" placeholder="KNm " />
                            <input id="full-supx" type="checkbox" name="full-supx" value = "" />
                            <label for="full-supx">Fixed Tx</label>
                            
                            <input id="supy" type="text" name="supy" placeholder="KNm " />
                            <input id="full-supy" type="checkbox" name="full-supy" value = "" />
                            <label for="full-supy">Fixed Ty</label>
                            
                            <input id="supz" type="text" name="supz" placeholder="KNm " />
                            <input id="full-supz" type="checkbox" name="full-supz" value = "" />
                            <label for="full-supz">Fixed Tz</label>
                    </div>
                    <div className="node-inputs-section">
                        
                            <input id="supRx" type="text" name="supRx" placeholder="KNrad? " />
                            <input id="full-supRx" type="checkbox" name="full-supRx" value = "" />
                            <label for="full-supRx">Fixed Rx</label>
                            
                            <input id="supRy" type="text" name="supRy" placeholder="KNrad? " />
                            <input id="full-supRy" type="checkbox" name="full-supRy" value = "" />
                            <label for="full-supRy">Fixed Ry</label>
                            
                            <input id="supRz" type="text" name="supRz" placeholder="KNrad? " />
                            <input id="full-supRz" type="checkbox" name="full-supRz" value = "" />
                            <label for="full-supRz">Fixed Rz</label>
                    </div>
                  </div>
            </div>

            <div className="form-section form-section-displacements">
                <div className="form-subtitle">Initial Displacements</div>
                <div className="node-inputs">
                    <div className="node-inputs-section">
                      
                      <label>Tx:</label>
                      <input id="dx" type="text" name="dx" placeholder="m " />
                  
                      <label>Ty:</label>
                      <input id="dy" type="text" name="dy" placeholder="m " />
                  
                      <label>Tz:</label>
                      <input id="dz" type="text" name="dz" placeholder="m " />

                    </div>
                    <div className="node-inputs-section">
                      
                      <label>Rx:</label>
                      <input id="rdx" type="text" name="rdx" placeholder="rad " />
                  
                      <label>Ry:</label>
                      <input id="rdy" type="text" name="rdy" placeholder="rad " />
                  
                      <label>Rz:</label>
                      <input id="rdz" type="text" name="rdz" placeholder="rad " />
                        
                    </div>
                  </div>      
            </div>
            <div className="form-section form-section-loads">
                <div className="form-subtitle">Loads</div>
                <div className="node-inputs">
                  <div className="node-inputs-section">
                        
                      <label>Px:</label>
                      <input id="Px" type="text" name="Px" placeholder="KN " />
                  
                      <label>Py:</label>
                      <input id="Py" type="text" name="Py" placeholder="KN " />
                  
                      <label>Pz:</label>
                      <input id="Pz" type="text" name="Pz" placeholder="KN " />
                        
                    </div>
                    <div className="node-inputs-section">
                        
                      <label>Mx:</label>
                      <input id="Mx" type="text" name="Mx" placeholder="KNm " />
                  
                      <label>My:</label>
                      <input id="My" type="text" name="My" placeholder="KNm " />
                  
                      <label>Mz:</label>
                            <input id="Mz" type="text" name="Mz" placeholder="KNm " />
                        
                    </div>
                </div>
            </div>
            
            <input className="btn-modelling" type="submit" name="submit" value="Save" />
            </form>

          </div>
    );
  }


  render() {
    return (
      <div className="model-box">
        {this.renderInputNodes()}
          {/* {<AnimNodes/>} */}
          
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { nodes: state.nodes, supports:state.supports, lastNode:state.lastNode };
};

export default connect(mapStateToProps, { createNode, deleteNode, createSupport, deleteSupport })(Nodes);


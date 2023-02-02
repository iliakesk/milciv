import React, { Component } from "react";
// import Selections from "./Selections";
import { createMember, deleteMember } from "../actions";
import { connect } from "react-redux";
import {NavLink} from "react-router-dom";
import { Spring, animated } from 'react-spring'



class Members extends Component {
  constructor(props) {
    super(props);
    this.handleCreateMember = this.handleCreateMember.bind(this);
    this.handleDeleteMember = this.handleDeleteMember.bind(this);
  }

  clearValues = (start, end) => {
    start.value = "";
    end.value = "";
    start.focus();
  };

  validateValues = (start, end) => {
    if (start === "" || end === "") {
      alert("There should be values");
      return false;
    }
    if (start === end) {
      alert("Starting  and ending node cannot be the same");
      return false;
    }
    //thelei ena validation gia na min mporei na yparxei idio melos kai antitheto melos
    return true;
  };



  // getAllFields() {
  //   let coord_fields = ["xcoord", "ycoord", "zcoord"].map((field)=>document.getElementById(field))
  //   let full_support_fields = ["full-supx", "full-supy", "full-supz", "full-supRx", "full-supRy", "full-supRz"].map((field)=>document.getElementById(field))
  //   let support_fields = ["supx", "supy", "supz", "supRx", "supRy", "supRz"].map((field)=>document.getElementById(field))
  //   let displacement_fields = ["dx", "dy", "dz", "rdx", "rdy", "rdz"].map((field)=>document.getElementById(field))
  //   let load_fields = ["Px", "Py", "Pz", "Mx", "My", "Mz"].map((field)=>document.getElementById(field))
  //   let isSupport = document.getElementById("is-support");
  
  //   return {coord_fields, full_support_fields, support_fields, displacement_fields, load_fields, isSupport}
  // }


  handleFields = () => {
    let nstart_input = document.getElementById("nstart");
    let nend_input = document.getElementById("nend");
    let nstart = nstart_input.value;
    let nend = nend_input.value;
    this.clearValues(nstart_input, nend_input);
    if (this.validateValues(nstart, nend)) {
      return { nstart, nend };
    } else {
      return false;
    }
  };

  handleCreateMember = (e) => {
    e.preventDefault();
    
    let nodes = this.handleFields();
    let lastMember = this.props.lastMember.id;
    if (nodes) {
      this.props.createMember({nodes,member:lastMember, lastMember:lastMember + 1});
    }
  };

  handleDeleteMember() {
    let member = document.getElementById("delmember");
    this.props.deleteMember(member.value);
    //ayto stelnei action akoma kai an den exw epilejei node, den jerw an tha me peirajei sto mellon px an tha kanei trigger kapoio lifecycle method
  }

  // keyPress(e) {
  //   console.log("pressed enter in members");
  //   if (e.keyCode === 13) {
  //     this.handleCreateMember();
  //     // mporw na prosthesw kati gia na leitourgei kai
  //     //to delete me to enterKey analoga me to focus pou exw
  //   }
  // }

  renderListNodes() {
    return Object.keys(this.props.nodes).map((key) => {
      return <option key={key}>{key}</option>;
    });
  }

  renderListMembers() {
    return Object.keys(this.props.members).map((key) => {
      return <option key={key}>{key}</option>;
    });
  }

  findMember(){
    console.log('implement function to find members')
  }

  handleEditMember(){
    console.log('implement function to edit members')
  }



  renderInputMembers() {
    return (
      
      <div className="form" id="members-form">
        <div className="form-section form-section-top-buttons">
              <label>Member:</label>
              <select className="hover"  id="choose-member" type="text" name="choose-member" onChange={this.renderNodeProperties}> 
                <option></option>
                {this.renderListMembers()}
              </select>
              <div className="node-top-buttons">
                  <input
                  className="btn-modelling hover"
                  type="button"
                  value="Edit"
                  onClick={this.handleEditMember}
                ></input>
                  <input
                  className="btn-modelling hover"
                  type="button"
                  value="Delete"
                  onClick={this.handleDeleteMember}
                ></input>
                <input
                  className="btn-modelling hover"
                  type="button"
                  value="Add new"
                  //onClick={this.handleDeleteNode}
                ></input>
            </div>
        </div>
        <form className="form-members" onSubmit={this.handleCreateMember}>
            <div className="form-section form-section-new-nodes">
                <div className="form-subtitle">Add new member</div>
                <div className="coordinates">
                  <label>Start:</label>
                  <select id="nstart" name="nstart" onChange={this.findMember}> 
                    <option></option>
                    {this.renderListNodes()}
                  </select>
                  <label>End:</label>
                  <select id="nend" name="nend" onChange={this.findMember}> 
                    <option></option>
                    {this.renderListNodes()}
                  </select>

                </div>
            </div>
            <div className="form-section form-section-new-nodes">
                <div className="form-subtitle">Section</div>
                <div className="coordinates">
                  <label>Choose section:</label>
                  <select id="choose-section" type="text" name="choose-section"> 
                    <option></option>
                    {this.renderListMembers()}
                  </select>
                </div>
            </div>
            <div className="form-section form-section-loads">
                <div className="form-subtitle">Loads</div>
                <div className="node-inputs">
                  <div className="node-inputs-section">
                        
                      <label>Px:</label>
                      <input className="hover" id="Px" type="text" name="Px" placeholder="KN" />
                  
                      <label>Py:</label>
                      <input className="hover" id="Py" type="text" name="Py" placeholder="KN" />
                  
                      <label>Pz:</label>
                      <input className="hover" id="Pz" type="text" name="Pz" placeholder="KN" />
                        
                    </div>
                    <div className="node-inputs-section">
                        
                      <label>Mx:</label>
                      <input className="hover" id="Mx" type="text" name="Mx" placeholder="KNm" />
                  
                      <label>My:</label>
                      <input className="hover" id="My" type="text" name="My" placeholder="KNm" />
                  
                      <label>Mz:</label>
                      <input className="hover" id="Mz" type="text" name="Mz" placeholder="KNm" />
                        
                    </div>
                </div>
            </div>
            <input className="btn-modelling" type="submit" name="submit" value="Save" />
        </form>
      </div>
    );
  }

  renderDelMembers() {
    return (
          <div className="members-form">
            <div>
              Delete members
            </div>
            <select
              className="select"
              id="delmember"
              type="text"
              name="delete-member">
              <option></option>
              {this.renderMembers()}
            </select>

            <input
              className="favorite"
              type="button"
              value="Delete"
              onClick={this.handleDeleteMember}
            ></input>
          </div>
    );
  }

  render() {
    return (
      <div className="model-box">
          
          {this.renderInputMembers()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { nodes: state.nodes, members: state.members, lastMember:state.lastMember };
};

export default connect(mapStateToProps, { createMember, deleteMember })(
  Members
);
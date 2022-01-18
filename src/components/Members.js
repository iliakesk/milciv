import React, { Component } from "react";
// import Selections from "./Selections";
import { createMember, deleteMember } from "../actions";
import { connect } from "react-redux";
import {NavLink} from "react-router-dom";


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
      this.props.createMember({nodes, lastMember:lastMember + 1});
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

  renderNodes() {
    return Object.keys(this.props.nodes).map((key) => {
      return <option key={key}>{key}</option>;
    });
  }

  renderMembers() {
    return Object.keys(this.props.members).map((key) => {
      return <option key={key}>{key}</option>;
    });
  }

  renderInputMembers() {
    return (
      <div className="members-form">
        <form onSubmit={this.handleCreateMember}>
        <div className="members-form-element">
          <div>
            Insert members
          </div>
          <label>
            Starting node:
            <select
              className="select"
              id="nstart"
              type="text"
              name="start-node">
              <option></option>
              {this.renderNodes()}
            </select>
          </label>
        </div>
        <div className="members-form-element">
          <label>
            Ending node:
            <select className="select" 
              id="nend" 
              type="text" 
              name="end-node">
              <option></option>
              {this.renderNodes()}
            </select>
          </label>
          </div>
          <input type="submit" name="submit" value="Enter member" />
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
          <NavLink to="/nodes" className="form-title">Nodes</NavLink>
          <NavLink to="/members" className="form-title">Members</NavLink>
        {this.renderInputMembers()}
        {this.renderDelMembers()}
          <NavLink to="/materials" className="form-title">Sections</NavLink>
          <NavLink to="/sections" className="form-title">Materials</NavLink>
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
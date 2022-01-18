import React, { Component } from "react";
import { connect } from "react-redux";
import { createNode, createMember} from "../actions";
import sample from "./../resources/sample2"

class Load extends Component {
  constructor(props) {
    super(props);
    this.readModel = this.readModel.bind(this);
  }
  
  readModel = () => {
    let nodes = Object.keys(sample.nodes); //array of node names
    let members = Object.keys(sample.members); //array of member names
  
    nodes.map((node)=>{
      let coords = sample.nodes[node];
      
      setTimeout(() => {
        let lastNode = this.props.lastNode.id +1;
        this.props.createNode({coords, lastNode, node})
      }, 1);
      return null
    })
  
    members.map((member) => {
      let nodes = sample.members[member];

      setTimeout(() => {
        let lastMember = this.props.lastMember.id +1;
        this.props.createMember({member, lastMember, nodes});
      }, 1);
      return null
    })
  }


  render() {
    return (
      <button
        className="button" 
        onClick={()=>{this.readModel()}}>Load</button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    members: state.members,
    nodes: state.nodes,
    lastNode:state.lastNode,
    lastMember:state.lastMember
  };
};

export default connect(mapStateToProps, { createNode, createMember })(Load);
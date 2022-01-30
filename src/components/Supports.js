import React, { Component } from "react";
import { createSupport, deleteSupport } from "../actions";
import { connect } from "react-redux";

class Supports extends Component {
  constructor(props) {
    super(props);
    this.handleChangeSupport = this.handleChangeSupport.bind(this);
    this.handleChangeNode = this.handleChangeNode.bind(this);
  }

  


  validateValues = (nodeField, dx, dy, dz, rx, ry, rz, kx, ky, kz, rkx, rky, rkz) => {
    if (isNaN(dx) || isNaN(dy) || isNaN(dz) || isNaN(rx) || isNaN(ry) || isNaN(rz) || isNaN(kx) || isNaN(ky) || isNaN(kz) || isNaN(rkx) || isNaN(rky) || isNaN(rkz)) {
      alert("There should be only numbers");
      return false;
    }
    if (nodeField ===""){
      alert("Choose a node");
      return false;
    }
    return true;
  };


  handleChangeNode = () => {
    let node = document.getElementById("support-node").value;
    if (node in this.props.supports){
      this.populateFields(this.props.supports[node])
    }else{
      node = {dx:"", dy:"", dz:"", rx:"", ry:"", rz:"", kx:"", ky:"", kz:"", rkx:"", rky:"", rkz:"" };
      this.populateFields(node);
    }

  }


  getSupportFields = () => {
    let DX = document.getElementById("dx-support");
    let DY = document.getElementById("dy-support");
    let DZ = document.getElementById("dz-support");
    let RX = document.getElementById("rx-support");
    let RY = document.getElementById("ry-support");
    let RZ = document.getElementById("rz-support");

    let KX = document.getElementById("kx-support");
    let KY = document.getElementById("ky-support");
    let KZ = document.getElementById("kz-support");
    let RKX = document.getElementById("rkx-support");
    let RKY = document.getElementById("rky-support");
    let RKZ = document.getElementById("rkz-support");

    return [DX, DY, DZ, RX, RY, RZ, KX, KY, KZ, RKX, RKY, RKZ];
  }

  populateFields = (node) => {
    let DX, DY, DZ, RX, RY, RZ, KX, KY, KZ, RKX, RKY, RKZ;
    [DX, DY, DZ, RX, RY, RZ, KX, KY, KZ, RKX, RKY, RKZ] = this.getSupportFields();

    DX.value = node.dx;
    DY.value = node.dy;
    DZ.value = node.dz;
    RX.value = node.rx;
    RY.value = node.ry;
    RZ.value = node.rz;
    KX.value = node.kx;
    KY.value = node.ky;
    KZ.value = node.kz;
    RKX.value = node.rkx;
    RKY.value = node.rky;
    RKZ.value = node.rkz;
  }


  handleFields = () => {
    //get the name of the node
    let nodeField = document.getElementById("support-node")
    let node = nodeField.value;

    //get the values of the fields by destructuring the array that the function "getSupportFields()" returns and mapping to it the function "field => field.value"
    let dx, dy, dz, rx, ry, rz, kx, ky, kz, rkx, rky, rkz;
    [dx, dy, dz, rx, ry, rz, kx, ky, kz, rkx, rky, rkz] = this.getSupportFields().map(field => field.value);


    nodeField.focus();
    if (this.validateValues(node, dx, dy, dz, rx, ry, rz, kx, ky, kz, rkx, rky, rkz)) {
      return {supportedNode:node, values: {dx, dy, dz, rx, ry, rz, kx, ky, kz, rkx, rky, rkz}};
    } else {
      return false;
    }
  };

  handleChangeSupport = (e) => {
    e.preventDefault();
    let values = this.handleFields();
    if (values) {
      this.props.createSupport(values);
    }
  };

  // handleDeleteSupport() {
  //   let node = document.getElementById("delnode");
  //   this.props.deleteNode(node.value);
  // }


  renderNodes() {
    return Object.keys(this.props.nodes).map((key) => {
      return <option key={key}>{key}</option>;
    });
  }

  renderSupports() {
    return (
      <div className="supports-form">
        <form onSubmit={this.handleChangeSupport}>
          <label>
            Choose node:
            <select
              className="select"
              id="support-node"
              type="text"
              name="support-node"
              onChange={this.handleChangeNode}
            >
              <option></option>
              {this.renderNodes()}
            </select>
          </label>
          <div className="support-inputs">
            <div className="support-input">
              <div>
              <label>
                x:
              <input id="dx-support" className="input " type="text" name="x" />
              </label>
              </div>
              <div>
              <label>
                y:
                <input id="dy-support" className="input " type="text" name="y" />
              </label>
              </div>
              <div>
              <label>
                z:
                <input id="dz-support" className="input " type="text" name="z" />
              </label>
              </div>
            </div>
            <div className="support-input">
            <div>
              <label>
                rx:
                <input id="rx-support" className="input " type="text" name="rx" />
              </label>
              </div>
              <div>
              <label>
                ry:
                <input id="ry-support" className="input " type="text" name="ry" />
              </label>
              </div>
              <div>
              <label>
                rz:
                <input id="rz-support" className="input " type="text" name="rz" />
              </label>
              </div>
            </div>
          </div>
          
          <div>
            K:
          </div>
          <div className="support-inputs">
            <div className="support-input">
            <div>
          <label>
            kx:
            <input id="kx-support" className="input supportInput" type="text" name="kx" />
          </label>
          </div>
          <div>
          <label>
            ky:
            <input id="ky-support" className="input supportInput" type="text" name="ky" />
          </label>
          </div>
          <div>
          <label>
            kz:
            <input id="kz-support" className="input supportInput" type="text" name="kz" />
          </label>
          </div>
          </div>
          <div className="support-input">
          <div>
          <label>
            rkx:
            <input id="rkx-support" className="input supportInput" type="text" name="rkx" />
          </label>
          </div>
          <div>
          <label>
            rky:
            <input id="rky-support" className="input supportInput" type="text" name="rky" />
          </label>
          </div>
          <div>
          <label>
            rkz:
            <input id="rkz-support" className="input supportInput" type="text" name="rkz" />
          </label>
          </div>
          </div>
          </div>
          <input
          className="button" type="submit" name="submit" value="Save changes" />
        </form>
      </div>
    );
  }


  render() {
    return (
      <div className="nodes">
        {this.renderSupports()}
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return { nodes: state.nodes};
};

export default connect(mapStateToProps, { createSupport, deleteSupport })(Supports);
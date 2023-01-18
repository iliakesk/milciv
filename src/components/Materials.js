import React, { Component } from "react";
// import { createSupport, deleteSupport } from "../actions";
// import { connect } from "react-redux";
import sample from "./../resources/materials"
import { Spring, animated } from 'react-spring'

class Materials extends Component {
  constructor(props) {
    super(props);
    this.handleChangeMaterial = this.handleChangeMaterial.bind(this);
    this.handleSaveNewMaterial = this.handleSaveNewMaterial.bind(this);
  }

  readModel = () => {
    let materials = Object.keys(sample.materials); //array of material names
    return materials

    // let members = Object.keys(sample.members); //array of member names
  
    // nodes.map((node)=>{
    //   let coords = sample.nodes[node];
      
    //   setTimeout(() => {
    //     let lastNode = this.props.lastNode.id +1;
    //     this.props.createNode({coords, lastNode, node})
    //   }, 1);
    //   return null
    // })
  
    // members.map((member) => {
    //   let nodes = sample.members[member];

    //   setTimeout(() => {
    //     let lastMember = this.props.lastMember.id +1;
    //     this.props.createMember({member, lastMember, nodes});
    //   }, 1);
    //   return null
    // })
  }

  // ayto xreiazeetai mono gia na kanw dokimes gia to pws diavazei to model
  componentDidMount () {
    this.readModel();
  }

  
  renderMaterials() {
    let matnames = Object.keys(sample.materials);
    // let matnames = matcodes.map(c=>sample.materials[c].name)
    return matnames.map((key) => {
      return <option key={key}>{key}</option>;
    });
  }


  // validateValues = (nodeField, dx, dy, dz, rx, ry, rz, kx, ky, kz, rkx, rky, rkz) => {
  //   if (isNaN(dx) || isNaN(dy) || isNaN(dz) || isNaN(rx) || isNaN(ry) || isNaN(rz) || isNaN(kx) || isNaN(ky) || isNaN(kz) || isNaN(rkx) || isNaN(rky) || isNaN(rkz)) {
  //     alert("There should be only numbers");
  //     return false;
  //   }
  //   if (nodeField ===""){
  //     alert("Choose a node");
  //     return false;
  //   }
  //   return true;
  // };


  handleChangeMaterial = () => {
    let m = document.getElementById("new-materials").value;
    if (m==="New") {
      let values = {d:"", E:"", n:"", y:"", u:""};
      this.populateFields(values);
    }else{
      let metal = sample.materials[m]
      let values = {d:metal.density, E:metal.elasticity_modulus, n:metal.poissons_ratio, y:metal.yield_strength, u:metal.ultimate_strength}
      this.populateFields(values);
    }
  }

  handleSaveNewMaterial = (e) => {
    e.preventDefault();
    let newValues = this.getFields();
    // edw thelei kai kapoio validation gia na mi vazei oti values nanai
    let newMaterial = {"density":newValues[0].value,
                      "elasticity_modulus":newValues[1].value,
                      "poissons_ratio":newValues[2].value,
                      "yield_strength":newValues[3].value,
                      "ultimate_strength":newValues[4].value}
    return newMaterial
    // edw thelei na kanw return to apotelesma tis eisagwgis stoixeiwn i na to stelnw sti vasi dedomenwn
  }
  



  getFields = () => {
    let d = document.getElementById("density");
    let E = document.getElementById("elasticity");
    let n = document.getElementById("poisson");
    let y = document.getElementById("yield");
    let u = document.getElementById("ultimate");

    return [d, E, n, y, u];
  }

  populateFields = (values) => {
    let d, E, n, y, u;
    [d, E, n, y, u] = this.getFields();

    d.value = values.d;
    E.value = values.E;
    n.value = values.n;
    y.value = values.y;
    u.value = values.u;
  }


  // handleFields = () => {
  //   //get the name of the node
  //   let nodeField = document.getElementById("support-node")
  //   let node = nodeField.value;

  //   //get the values of the fields by destructuring the array that the function "getSupportFields()" returns and mapping to it the function "field => field.value"
  //   let dx, dy, dz, rx, ry, rz, kx, ky, kz, rkx, rky, rkz;
  //   [dx, dy, dz, rx, ry, rz, kx, ky, kz, rkx, rky, rkz] = this.getSupportFields().map(field => field.value);


  //   nodeField.focus();
  //   if (this.validateValues(node, dx, dy, dz, rx, ry, rz, kx, ky, kz, rkx, rky, rkz)) {
  //     return {supportedNode:node, values: {dx, dy, dz, rx, ry, rz, kx, ky, kz, rkx, rky, rkz}};
  //   } else {
  //     return false;
  //   }
  // };

  // handleChangeSupport = (e) => {
  //   e.preventDefault();
  //   let values = this.handleFields();
  //   if (values) {
  //     this.props.createSupport(values);
  //   }
  // };

  // // handleDeleteSupport() {
  // //   let node = document.getElementById("delnode");
  // //   this.props.deleteNode(node.value);
  // // }



  render() {
    return (
      
      <Spring from={{marginTop:-500}} to={{marginTop:0}}>
        {styles => <animated.div style={styles}>
      <div className="materials-form">
          <form onSubmit={this.handleSaveNewMaterial}>
            <label>
             Modify an existing material or create a new one:
             <select
              className="select"
              id="new-materials"
              type="text"
              name="new-materials"
              onChange={this.handleChangeMaterial}
            >
              <option>New</option>
              {this.renderMaterials()}
            </select>
          </label>
          <div className="nodes-form-element">
            <label>
              density
              <input id="density" className="input" type="text" name="density" />
            </label>
          </div>
          <div className="nodes-form-element">
            <label>
            elasticity
              <input id="elasticity" className="input" type="text" name="elasticity" />
            </label>
          </div>
          <div className="nodes-form-element">
            <label>
            poisson
              <input id="poisson" className="input" type="text" name="poisson" />
            </label>
          </div>
          <div className="nodes-form-element">
            <label>
            yield
              <input id="yield" className="input" type="text" name="yield" />
            </label>
          </div>
          <div className="nodes-form-element">
            <label>
            ultimate
              <input id="ultimate" className="input" type="text" name="ultimate" />
            </label>
          </div>
          <input
          className="button" type="submit" name="create" value="Create" />
          <input
          className="button" type="submit" name="modify" value="Save as" />
        </form>
      </div>
      </animated.div>}
      </Spring>
    );
  }
}


// const mapStateToProps = (state, ownProps) => {
//   return { nodes: state.nodes,supports: state.supports };
// };

// export default connect(mapStateToProps, { createSupport, deleteSupport })(Materials);

export default Materials
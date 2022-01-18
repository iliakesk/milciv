import React, { Component } from "react";
import { connect } from "react-redux";
import * as THREE from "three";
// import { Object3D } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { CREATE_NODE, DELETE_NODE } from "../actions/types";


// const listen = (state, action)=>{
//   console.log(action)
// }


class Canvas extends Component {
  constructor(props) {
    
    super(props);
    this.state = {};
    this.animate = this.animate.bind(this);
    // this.drawMember = this.drawMember.bind(this);
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
  }

  componentDidMount() {
    this.canvas = document.getElementById("canvas");
    this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.canvas.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.canvas.offsetWidth / this.canvas.offsetHeight,
      1,
      500
    );
    var controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.minAzimuthAngle = 30;
    // controls.maxAzimuthAngle = 30;
    this.camera.position.set(30, 40, 50);
    setTimeout(()=>controls.update(),3000);
    // controls.update();
    this.animate();
  }

  drawNode(x, y, z, id) {
    const geometry = new THREE.SphereGeometry( 0.1, 10, 10 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(x,y,z)
    // sphere.translateX(x);
    // sphere.translateX(y);
    // sphere.translateX(z);
    sphere.name = "node" + id;
    sphere.type = "node";
    this.scene.add(sphere);
  }

  drawMember(start, end, id) {
    var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    var geometry = new THREE.BufferGeometry();
    var points = [new THREE.Vector3(start[0], start[1], start[2]), new THREE.Vector3(end[0], end[1], end[2])];
    geometry.setFromPoints(points);
    var line = new THREE.Line(geometry, material);
    line.name = id;
    line.type = "member";
    this.scene.add(line);
  }

  // shouldComponentUpdate(state) { 
  //   let allNodes = this.props.nodes;
  //   if (this.state.nodes<=Object.keys(allNodes).length) { 
  //     return true;
  //   }
  //   return false;
    
  // }

  componentDidUpdate(prevProps) {

    let allMembers = this.props.members;
    let allNodes = this.props.nodes;
    let memberId = this.props.lastMember.id;
    // let nodeId = this.props.lastNode.id; //otan paw xeirokinhta einai ok giati diavazei me ton lastNode. otan omws fortwnw arxeio tote den vazei th seira pou exw sto arxeio alla dikia tou apo thn arch symfwna me to lastNode

        //to sygkekrimeno exei thema giati to mono poy kanei einai na emfanizei ton teleytaio komvo sto array kai oxi tis allages poy eginan stoys komvoyw kai ta melh. mallon tha prepei na tou dwsw prosvasi sta action deletenode deletemember ktl
    // if (Object.keys(allNodes).length > 0 ) {
    if (this.props.lastAction.action==="CREATE_NODE") {
      let node = Object.keys(allNodes).pop();
      this.drawNode(allNodes[node]["x"], allNodes[node]["y"], allNodes[node]["z"], node)
    }else if (this.props.lastAction.action==="DELETE_SUPPORT") {
      let item = this.scene.getObjectByName("node"+this.props.lastAction.id);
      this.scene.remove(item);
    }
    if (this.props.lastAction.action==="CREATE_MEMBER") {
      //to parakatw mporei na ginei kai ligo pio syntomo kai texniko
      let member = Object.keys(allMembers).pop();
      let node_start = allMembers[member].nstart;
      let node_end = allMembers[member].nend;
      let start = this.props.nodes[node_start];
      let end = this.props.nodes[node_end];
      let coords_start = [start["x"], start["y"], start["z"]];
      let coords_end = [end["x"], end["y"], end["z"]];
      this.drawMember(coords_start, coords_end, memberId);
    }

    this.animate();
    
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return <div className="canvas" id="canvas"></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    members: state.members,
    nodes: state.nodes,
    lastMember: state.lastMember,
    lastNode: state.lastNode,
    lastAction: state.lastAction
  };
};
export default connect(mapStateToProps)(Canvas);
import React, { Component } from "react";
// import drawMember from "../draw3d/three1.js";
import { connect } from "react-redux";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.drawMember = this.drawMember.bind(this);
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x111111 );
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
    // controls.minAzimuthAngle = 500;
    // controls.maxAzimuthAngle = 500;
    this.camera.position.set(50, 50, 50);

    controls.update();

    //The following constructs a cube
    const sample = {
      1: [-10, -10, 0, 10, -10, 0],
      2: [10, -10, 0, 10, 10, 0],
      3: [10, 10, 0, -10, 10, 0],
      4: [-10, 10, 0, -10, -10, 0],
      5: [-10, -10, 10, 10, -10, 10],
      6: [10, -10, 10, 10, 10, 10],
      7: [10, 10, 10, -10, 10, 10],
      8: [-10, 10, 10, -10, -10, 10],
      9: [-10, -10, 0, -10, -10, 10],
      10: [10, -10, 0, 10, -10, 10],
      11: [10, 10, 0, 10, 10, 10],
      12: [-10, 10, 0, -10, 10, 10],
    };
    for (let i = 1; i < 13; i++) {
      let start = [sample[i][0], sample[i][1], sample[i][2]];
      let end = [sample[i][3], sample[i][4], sample[i][5]];
      this.drawMember(start, end, i);
    }
    this.animate();
  }

  drawMember(start, end, id) {
    var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(start[0], start[1], start[2]));
    geometry.vertices.push(new THREE.Vector3(end[0], end[1], end[2]));

    var line = new THREE.Line(geometry, material);
    line.name = id;
    line.type = "member";
    this.scene.add(line);
    // this.renderer.render(this.scene, this.camera); //mallon den xreiazetai
  }

  // function remove a child from the scene(){
  // this.scene.children.forEach((child) => {
  //   if (child.type === "member" && child.name === "6") {
  //     this.scene.remove(child);
  //   }
  // });}

  componentDidUpdate() {
    let countMembers = this.props.members;
    // let countNodes = this.props.nodes;
    let memberId = this.props.currentMember;
    if (Object.keys(countMembers).length > 0) {
      let i = Object.keys(countMembers).length;
      let member = countMembers[i];
      let node_start = member["nstart"];
      let node_end = member["nend"];
      let start = this.props.nodes[node_start];
      let end = this.props.nodes[node_end];
      let coords_start = [start["x"], start["y"], start["z"]];
      let coords_end = [end["x"], end["y"], end["z"]];
      this.drawMember(coords_start, coords_end, memberId);
    }
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return <div className="canvas" id="canvas"></div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { members: state.members, nodes: state.nodes };
};
export default connect(mapStateToProps)(Canvas);
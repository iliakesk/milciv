import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as THREE from "three";
// import { Object3D } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from 'three/examples/jsm/controls/DragControls';

// import { CREATE_NODE, DELETE_NODE } from "../actions/types";


// const listen = (state, action)=>{
//   console.log(action)
// }


class Canvas extends Component {
  constructor(props) {
    
    super(props);
    this.state = {};
    // [this.camx, this.camy, this.camz] = [-50, -100, 50]
    [this.camx, this.camy, this.camz] = [-1.2, -2.4, 1.2]
    this.animate = this.animate.bind(this);
    // this.drawMember = this.drawMember.bind(this);
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    // this.sizes = {
    //   width: window.innerWidth,
    //   height: window.innerHeight
    // }
    this.group = new THREE.Group()
    this.scene.add(this.group)
    THREE.Object3D.DefaultUp.set(0, 0, 1);
    
  }

  componentDidMount() {
    this.canvas = document.getElementById("canvas");
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    // this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.canvas.appendChild(this.renderer.domElement);
    this.sizes = {
      width: this.canvas.clientWidth,
      height: this.canvas.clientHeight
    }
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.sizes.width / this.sizes.height,
      1,
      1000
    );
    
    let controls = new OrbitControls(this.camera, this.canvas);
    // controls.enableDamping = true;
    this.camera.position.set(this.camx*20, this.camy*20, this.camz*20);
    // setTimeout(()=>controls.update(),1000);
    this.animate();
    // controls.update()
    this.drawAxes()
    
    // controls.addEventListener('start', function (event) {
    //   DragControls.enabled = true;
    //   });
      
    //   controls.addEventListener('end', function (event) {
    //     DragControls.enabled = false;
    //   });

    window.addEventListener('resize', () =>
      {
        this.sizes.width = this.canvas.clientWidth
        this.sizes.height = this.canvas.clientHeight
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        // this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })

      // the following not working in safari?
      window.addEventListener('dblclick', ()=>
        {
          const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
          if(!fullscreenElement)
            {
              if(this.canvas.requestFullscreen){
                this.canvas.requestFullscreen()
              }else if(this.canvas.webkitRequestFullscreen){
                this.canvas.webkitRequestFullscreen()
              }
            }else{
              if(this.canvas.exitFullscreen){
                this.canvas.exitFullscreen()
              }else if(this.canvas.webkitExitFullscreen){
                this.canvas.webkitExitFullscreen()
              }
            }
      }
      )
  }

  drawAxes(){
    const axesHelper = new THREE.AxesHelper( 5 );
    // axesHelper.position.set(-5, -5, 0)
    this.scene.add( axesHelper );
    // let  textGeo = new THREE.TextGeometry('Y', {
    //   size: 45,
    //   height: 52,
    //   curveSegments: 6,
    //   style: "normal"       
    // });
    
    // let  color = new THREE.Color();
    // color.setRGB(255, 250, 250);
    // let  textMaterial = new THREE.MeshBasicMaterial({ color: color });
    // let  text = new THREE.Mesh(textGeo , textMaterial);
    
    // text.position.x = axesHelper.position.x;
    // text.position.y = axesHelper.position.y;
    // text.position.z = axesHelper.position.z;
    // text.rotation = this.camera.rotation;
    // this.scene.add(text);
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
    this.group.add(sphere);
  }

  drawMember(start, end, id) {
    var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    var geometry = new THREE.BufferGeometry();
    var points = [new THREE.Vector3(start[0], start[1], start[2]), new THREE.Vector3(end[0], end[1], end[2])];
    geometry.setFromPoints(points);
    var line = new THREE.Line(geometry, material);
    line.name = id;
    line.type = "member";
    this.group.add(line);
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

    // δινει το bounding box για το group
    let bbox = new THREE.Box3().setFromObject(this.group);
    this.camera.position.set(this.camx * bbox.max.x, this.camy * bbox.max.y, this.camz * bbox.max.z)
    console.log(bbox)
    // προσθετει στο scene βοηθητικο bounding box για το group
    // var helper = new THREE.BoundingBoxHelper(this.group, 0xff0000);
    // helper.update();
    // this.group.add(helper);
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.camera.lookAt(new THREE.Vector3(15,15,15))
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
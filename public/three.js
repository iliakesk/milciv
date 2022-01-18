import * as THREE from "./three/build/three.module.js";
import { OrbitControls } from "./three/examples/jsm/controls/OrbitControls.js";
// import reducers from "../src/reducers";
// import store from "../src/draw3d/store.js";

// import { createStore } from "../node_modules/redux/src";
// import rootReducer from "./src/reducers/index.js";
// const store = createStore(rootReducer);
// console.log(store.getState());

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

var renderer = new THREE.WebGLRenderer();
let canvas = document.getElementById("canvas");
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
// console.log(canvas.offsetWidth);
canvas.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(
  45,
  canvas.offsetWidth / canvas.offsetHeight,
  1,
  500
);
var controls = new OrbitControls(camera, renderer.domElement);
// controls.minAzimuthAngle = 500;
// controls.maxAzimuthAngle = 500;
camera.position.set(50, 20, 40);

controls.update();

var scene = new THREE.Scene();

// export default store;

export default function drawElement(start, end) {
  var material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(start[0], start[1], start[2]));
  geometry.vertices.push(new THREE.Vector3(end[0], end[1], end[2]));

  var line = new THREE.Line(geometry, material);

  scene.add(line);
  renderer.render(scene, camera);
}

for (let i = 1; i < 13; i++) {
  let start = [sample[i][0], sample[i][1], sample[i][2]];
  let end = [sample[i][3], sample[i][4], sample[i][5]];
  drawElement(start, end);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

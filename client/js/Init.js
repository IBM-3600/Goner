//--------- import/require resources

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export let THREE = require("three");
var ctx = document.getElementById("ctx");
//
//------------------Temp store
export const initStateOf_object = new Map();
export const updatedStateOf_object = new Map();
//
export var old_size = 0;
export var new_size = 0;
//------------------------------init -export fields
//class def
class Costume_scene extends THREE.Scene {
  static list_of_children = new Map();
  constructor() {
    super();
  }
  add(obj) {
    if (obj != null) {
      super.add(obj);
      Costume_scene.list_of_children.set(obj.name, obj);
    }
  }
  getChild(name) {
    return Costume_scene.list_of_children.get(name);
  }
}

//----------------- costume functions

export const get_ObjectDimension = (obj) => {
  var measure1 = new THREE.Vector3();
  //
  var obj1_boundingBox = new THREE.Box3();
  //
  obj1_boundingBox.setFromObject(obj);
  //
  obj1_boundingBox.getSize(measure1);

  return measure1; //return Vector3
};
//--------------
export let Player = require("./Player");

export const scene = new THREE.Scene();
//export const scene = new Costume_scene();
export const raycast = new THREE.Raycaster();
const arrowHelperX = new THREE.ArrowHelper(
  new THREE.Vector3(1, 0, 0).normalize(),
  new THREE.Vector3(0, 0, 0),
  2,
  0xffff00
);
arrowHelperX.name = "arrowHelperX";
scene.add(arrowHelperX);
const arrowHelperY = new THREE.ArrowHelper(
  new THREE.Vector3(0, 1, 0).normalize(),
  new THREE.Vector3(0, 0, 0),
  2,
  0x225511
);
arrowHelperY.name = "arrowHelperY";
scene.add(arrowHelperY);
const arrowHelperZ = new THREE.ArrowHelper(
  new THREE.Vector3(0, 0, 1).normalize(),
  new THREE.Vector3(0, 0, 0),
  2,
  0x2fbf01
);
arrowHelperZ.name = "arrowHelperZ";
scene.add(arrowHelperZ);
// const axesHelper = THREE.AxesHelper();
// scene.add(axesHelper);
//camera1
export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 20;
camera.rotation.x = 0.5;
camera.name = "camera";
//camera2
export const camera1 = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera1.position.z = 40;
camera1.name = "camera-world";
export const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  canvas: ctx,
});

renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement); //can be removed but important
document.body.append(ctx);
//--------------------------------------- end export field

//controls = new OrbitControls(camera, renderer.domElement);

//controls.update();
//light
const light = new THREE.AmbientLight(0xffffff, 0.5);
light.position.x = 2;
light.position.y = 3;
light.position.z = 4;
light.name = "light";
scene.add(light);
//light2
const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
light2.position.x = 10;
light2.position.y = 5;
light2.position.z = 9;
light2.name = "light2";
scene.add(light2);
//plane
const planeGeometry = new THREE.PlaneGeometry(25, 25);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xff11ff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.name = "plane";
scene.add(plane);
plane.position.set(0, 0, -0.5);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

// module.exports = { renderer };

const geo1 = new THREE.BoxGeometry(1, 1, 3);
const mat1 = new THREE.MeshStandardMaterial({ color: 0x12ff34 });
const cube1 = new THREE.Mesh(geo1, mat1);
cube1.position.set(1, 7, 1);
cube1.name = "cube1";
scene.add(cube1);

const geo2 = new THREE.BoxGeometry(1, 1, 3);
const mat2 = new THREE.MeshStandardMaterial({ color: 0x12ff34 });
const cube2 = new THREE.Mesh(geo2, mat2);
cube2.position.set(9, 5, 1);
cube2.name = "cube2";
scene.add(cube2);

const geo3 = new THREE.BoxGeometry(1, 1, 3);
const mat3 = new THREE.MeshStandardMaterial({ color: 0x12ff34 });
const cube3 = new THREE.Mesh(geo3, mat3);
cube3.position.set(-10, 9, 1);
cube3.name = "cube3";
scene.add(cube3);

const geo4 = new THREE.BoxGeometry(1, 1, 3);
const mat4 = new THREE.MeshStandardMaterial({ color: 0x12ff34 });
const cube4 = new THREE.Mesh(geo4, mat4);
cube4.position.set(-6, 11, 1);
cube4.name = "cube4";
scene.add(cube4);

const geo5 = new THREE.BoxGeometry(1, 1, 3);
const mat5 = new THREE.MeshStandardMaterial({ color: 0x12ff34 });
const cube5 = new THREE.Mesh(geo5, mat5);
cube5.position.set(-4, 3, 1);
cube5.name = "cube5";
scene.add(cube5);

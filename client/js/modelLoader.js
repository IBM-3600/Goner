//const THREE = require("three");
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
const _3d_modelList = ["BoxMan3"];

const loader = new FBXLoader();
//var scene = new THREE.Scene();
document.addEventListener("DOMContentLoaded", () => {
  _3d_modelList.forEach((mode_name) => {
    loader.load(`client/models/3d_models/${mode_name}.fbx`, (object) => {
      object.position.set(0, 0, 0);
      scene.add(object);
      console.log("external mesh loaded");
    });
  });
});

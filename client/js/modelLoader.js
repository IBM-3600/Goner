const _3d_modelList = ["BoxMan"];

const loader = new THREE.FBXLoader();

document.addEventListener("DOMContentLoaded", () => {
  for (var i = 0; i < _3d_modelList.length; i++) {
    loader.load(`../models/3d_models/${_3d_modelList[i]}.fbx`, (object) => {
      object.setPosition(0, 0, 0);
      scene.add(object);
      console.log("external mesh loaded");
    });
  }
});

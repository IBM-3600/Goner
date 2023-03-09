const _3d_modelList = ["BoxMan"];

const loader = new THREE.GLTFLoader();

document.addEventListener("load", () => {
  _3d_modelList.forEach((mode_name) => {
    loader.Load(`client/models/3d_models/${mode_name}.fbx`, (object) => {
      object.setPosition(0, 0, 0);
      scene.add(object);
      console.log("external mesh loaded");
    });
  });
});

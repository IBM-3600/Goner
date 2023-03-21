const { socket } = require("./../socket_init.js");
const {
  scene,
  THREE,
  get_ObjectDimension,
  initStateOf_object,
  updatedStateOf_object,
} = require("./../Init.js");

socket.on("c-scale-event", (data) => {
  const obj = scene.children.find(
    (child) => child instanceof THREE.Mesh && child.name === data.name
  );
  if (obj != null) {
    // const ref = scene.getChild(data.name);
    measure1 = get_ObjectDimension(obj);
    if (!initStateOf_object.has(data.name)) {
      initStateOf_object.set(data.name, measure1);
    }
    //measure2 = get_ObjectDimension(ref);
    //

    obj.scale.set(data.ratio.x, data.ratio.y, data.ratio.z);
    measure2 = get_ObjectDimension(obj);
    console.log("scale obj");
    updatedStateOf_object.set(data.name, measure2);
    console.log(
      `obj:[${measure1.x},${measure1.y},${measure1.z}]::ref:[${measure2.x},${measure2.y},${measure2.z}]`
    );
  }
});

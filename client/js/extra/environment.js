const { scene, THREE } = require("../Init");

const geo6 = new THREE.BoxGeometry(1, 1, 3);
const mat6 = new THREE.MeshStandardMaterial({ color: 0xff2baf });
const cube6 = new THREE.Mesh(geo6, mat6);
cube6.position.set(-10, 12, 1);
cube6.name = "cube6";
scene.add(cube6);

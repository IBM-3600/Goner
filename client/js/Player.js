const THREE = require("three");
class Player {
  constructor(id) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.mesh;

    //this.pos ={'x':this.x,'y':this.y,'z':this.z};
  }

  createPlayer() {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.name = this.id;
    this.mesh.position.set(this.x, this.y, this.z);
    // this.model = mesh;
    return this.mesh;
  }
  setPosition(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    if (this.mesh) {
      return this.mesh.position.set(this.x, this.y, this.z);
    }
  }
  UpdatePosition(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    if (this.mesh) {
      return this.mesh.position.set(this.x, this.y, this.z);
    }
  }
  getCurrentPosition() {
    let x = this.x;
    let y = this.y;
    let z = this.z;
    return { x: x, y: y, z: z };
  }
}

module.exports = Player;

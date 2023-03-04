class Player {
  constructor(id) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.speed = 2;
    this.input = {
      pressRight: false,
      pressLeft: false,
      pressForward: false,
      pressBackward: false,
      pressJump: false,
      pressAttack: false,
    };
  }
  pushPosition() {
    console.log(this.x + "" + this.y + "" + this.z); // return { x: this.x, y: this.y, z: this.z };
  }
  updatePosition() {
    if (this.input.pressRight) {
      this.x += 0.1 * this.speed;
    }
    if (this.input.pressLeft) {
      this.x += -0.1 * this.speed;
    }
    if (this.input.pressForward) {
      this.y += 0.1 * this.speed;
    }
    if (this.input.pressBackward) {
      this.y += -0.1 * this.speed;
    }
    // if (this.input.pressJump) {
    //   this.z = this.speed;
    // }
  }
  reset() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
}
module.exports = Player;

class Physics {
  constructor() {
    this.GRAVITATIONAL_CONSTANT = 9.8;
  }
  Distance = ({ x, y }, { x1, y1 }) => {
    return Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
  };
}

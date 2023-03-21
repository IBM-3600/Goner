const { socket } = require("./socket_init");
var SelfId;
export function getId(id) {
  SelfId = id;
}
document.onkeydown = (e) => {
  e.preventDefault();
  if (e.key == "d") {
    //d
    socket.emit("keypress", { id: SelfId, inputId: "right", status: true });
  }
  if (e.key == "s") {
    //s
    socket.emit("keypress", {
      id: SelfId,
      inputId: "backward",
      status: true,
    });
  }
  if (e.key == "a") {
    //a
    socket.emit("keypress", { id: SelfId, inputId: "left", status: true });
  }
  if (e.key == "w") {
    //w
    socket.emit("keypress", { id: SelfId, inputId: "forward", status: true });
  }
};
document.onkeyup = (e) => {
  e.preventDefault();
  if (e.key == "d")
    //d
    socket.emit("keypress", { id: SelfId, inputId: "right", status: false });
  if (e.key == "s")
    //s
    socket.emit("keypress", {
      id: SelfId,
      inputId: "backward",
      status: false,
    });
  if (e.key == "a")
    //a
    socket.emit("keypress", { id: SelfId, inputId: "left", status: false });
  if (e.key == "w")
    //w
    socket.emit("keypress", {
      id: SelfId,
      inputId: "forward",
      status: false,
    });
};
var camera1;
export function getCamera1(cam) {
  camera1 = cam;
}
var input = { x: 0, y: 0, z: 0 };
document.addEventListener("keydown", (event) => {
  var sp = 10;

  if (event.key == "left arrow") input.x = input.x + sp;

  if (event.key == "up arrow") input.y -= input.y - sp;

  if (event.key == "right arrow") input.x -= input.x - sp;

  if (event.key == "down arrow") input.y = input.y + sp;

  camera1.position.set(input.x, input.y);
  //camera1.position.y = input.y;
  // socket.emit("player-input", input);
});

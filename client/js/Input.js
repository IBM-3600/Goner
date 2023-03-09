//Handle inputs
document.onkeydown = (e) => {
  e.preventDefault();
  if (e.keyCode == 68) {
    //d
    socket.emit("keypress", { id: SelfId, inputId: "right", status: true });
  }
  if (e.keyCode == 83) {
    //s
    socket.emit("keypress", {
      id: SelfId,
      inputId: "backward",
      status: true,
    });
  }
  if (e.keyCode == 65) {
    //a
    socket.emit("keypress", { id: SelfId, inputId: "left", status: true });
  }
  if (e.keyCode == 87) {
    //w
    socket.emit("keypress", { id: SelfId, inputId: "forward", status: true });
  }
};
document.onkeyup = (e) => {
  e.preventDefault();
  if (e.keyCode == 68)
    //d
    socket.emit("keypress", { id: SelfId, inputId: "right", status: false });
  if (e.keyCode == 83)
    //s
    socket.emit("keypress", {
      id: SelfId,
      inputId: "backward",
      status: false,
    });
  if (e.keyCode == 65)
    //a
    socket.emit("keypress", { id: SelfId, inputId: "left", status: false });
  if (e.keyCode == 87)
    //w
    socket.emit("keypress", {
      id: SelfId,
      inputId: "forward",
      status: false,
    });
};
document.addEventListener("keydown", (event) => {
  const input = { x: 0, y: 0, z: 0 };
  switch (event.key) {
    case "ArrowUp":
      input.z = -1;
      break;
    case "ArrowDown":
      input.z = 1;
      break;
    case "ArrowLeft":
      input.x = -1;
      break;
    case "ArrowRight":
      input.x = 1;
      break;
  }
  // socket.emit("player-input", input);
});
var mouse_x;
var mouse_y;
document.addEventListener("mousemove", (e) => {
  mouse_x = e.clientX;
  mouse_y = e.clientY;
});

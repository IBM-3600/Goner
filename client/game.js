var socket = io();

const Players = {};
let List_of_connected = {};
socket.on("handshake", () => {
  console.log("hand shake from client side..");
  if (Players)
    for (var p in Players) {
      console.log(p);
    }
});

let SelfId = null;

socket.on("initPlayer", (data) => {
  SelfId = data.id;
  Players[data.id] = data.id;
  console.log(`id${SelfId} `);
  //init player
  createPlayer(data.id, data.x, data.y, data.z, true);
  socket.emit("checkOthers");
});
socket.on("otherPlayer", (data) => {
  console.log(data);
  for (var i in data) {
    if (i != SelfId) {
      //init other player

      createPlayer(i, i.x, i.y, i.z, false);
    }
  }
});
const createPlayer = (id, x, y, z, check) => {
  if (check) {
    List_of_connected[id] = id;
    const player = new Player(id);

    //add player to players list
    Players[id] = player;
    player.setPosition(x, y, z);
    //
    //create three.js mesh in scene
    const mesh = player.createPlayer();
    scene.add(mesh);
  } else {
    List_of_connected[id] = id;
    const player = new Player(id);

    //add player to players list
    player.setPosition(x, y, z);

    //create three.js mesh in scene
    const mesh1 = scene.children.find(
      (child) => child instanceof THREE.Mesh && child.name === id
    );
    if (!mesh1) {
      Players[id] = player;
      console.log("creating other player" + id);
      const mesh = player.createPlayer();
      scene.add(mesh);
    }
  }
};
socket.on("updatePosition", (data) => {
  update(data);
});
const update = (param = []) => {
  for (var i = 0; i <= param.length; i++) {
    const id = param[i];

    if (id) {
      const player = Players[id.id];
      if (player) {
        player.UpdatePosition(id.x, id.y, id.z);
      }
    }
  }
};

socket.on("d_p", (data) => {
  console.log(`player ${Players[data]} disconnected`);
  const player = Players[data];
  if (player) {
    scene.remove(player.mesh);
    delete Players[data];
    console.log("removed player" + data);
  }
});
const Animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(Animate);
};
Animate();

//Resize window
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//Handle inputs
document.onkeydown = (e) => {
  e.preventDefault();
  if (e.keyCode == 68) {
    //d
    socket.emit("keypress", { id: SelfId, inputId: "right", status: true });
  }
  if (e.keyCode == 83) {
    //s
    socket.emit("keypress", { id: SelfId, inputId: "backward", status: true });
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
    socket.emit("keypress", { id: SelfId, inputId: "backward", status: false });
  if (e.keyCode == 65)
    //a
    socket.emit("keypress", { id: SelfId, inputId: "left", status: false });
  if (e.keyCode == 87)
    //w
    socket.emit("keypress", { id: SelfId, inputId: "forward", status: false });
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

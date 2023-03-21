const {
  THREE,
  renderer,
  camera,
  camera1,
  scene,
  raycast,
  Player,
  initStateOf_object,
  old_size,
  new_size,
} = require("./Init.js");
//require("./modelLoader");
require("./extra/environment.js");

const { socket } = require("./socket_init.js");
const pointer = new THREE.Vector2();
var cam_switch = false;
var cam = cam_switch ? camera : camera1;
const switchBtn = document.getElementById("switch_cam");

const user_id = document.getElementById("userId");
const mouse_pos = document.getElementById("mousePosDisplay");

const Players = {};
let List_of_connected = {};
const scam = () => {
  cam_switch = cam_switch ? false : true;
  cam = cam_switch ? camera : camera1;
  console.log(`${cam_switch}`);
  console.log("switch btn click");
};
switchBtn.onclick = scam;
socket.on("return_to_login", () => {
  //go back to login page
  document.location.replace("http://localhost:3002/login");

  console.log("return to login Page");
});

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
  user_id.innerHTML = "<h5>" + data.username + "</h5>";
  console.log(user_id.text);
  Players[data.id] = data.id;
  console.log(`id${SelfId} `);
  //init player
  createPlayer(data.id, data.x, data.y, data.z, data.username, true);
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
const createPlayer = (id, x, y, z, name, check) => {
  if (check) {
    List_of_connected[id] = id;
    const player = new Player(id);

    //add player to players list
    Players[id] = player;
    player.setPosition(x, y, z);
    //

    const mesh = player.createPlayer();

    scene.add(mesh);
  } else {
    List_of_connected[id] = id;
    const player = new Player(id);

    player.setPosition(x, y, z);

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
  updatePos(data);
});
const updatePos = (param = []) => {
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
    delete List_of_connected[data];
    console.log("removed player" + data);
  }
});
var click = false;

const update = () => {
  raycast.setFromCamera(pointer, camera);
  const intersect = raycast.intersectObjects(scene.children);
  for (let i = 0; i < intersect.length; i++) {
    if (intersect[i].object) {
      if (click) {
        socket.emit("s-scale-event", {
          name: intersect[i].object.name,
          ratio: { x: 2, y: 2, z: 2 },
        });
        click = false;
      }
      // intersect[i].object.scale.set(2, 2, 2);
    }
  }
};
const Animate = () => {
  update();
  window.requestAnimationFrame(Animate);
  mouse_pos.innerHTML = "<p>x" + mouse_x + "y" + mouse_y + "</p>";
  renderer.render(scene, cam);
};
Animate();

//Resize window
window.addEventListener("resize", () => {
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//mouse related logic

var mouse_x;
var mouse_y;

document.addEventListener("mousemove", (e) => {
  mouse_x = e.clientX;
  mouse_y = e.clientY;
});

document.addEventListener("mousedown", (e) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  click = true;
});
const { getId, getCamera1 } = require("./Input.js");
getId(SelfId);
getCamera1(camera1);
require("./extra/event.js");

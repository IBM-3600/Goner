const express = require("express");
const app = express();
const http = require("http");
const serv = http.createServer(app);
const path = require("path");
const { Server } = require("socket.io");
var bodyParser = require("body-parser");
const server_config = {};
const user = {
  name: "",
  username: "",
  email: "",
  password: "",
};
const userList = {};
const Player = require("./Entity");
//USE
const file1 = path.join(__dirname, "../client");
app.use("/client", express.static(file1));
app.use(bodyParser.urlencoded({ extended: false }));
//GET
const file_index = path.join(__dirname, "../client/html/index.html");
app.get("/", (req, res) => {
  res.sendFile(file_index);
});
const file2 = path.join(__dirname, "../client/goner.html");
const loginFile = path.join(__dirname, "../client/html/loginpage.html");
const adminFile = path.join(__dirname, "../client/html/admin.html");
// app.get("/goner", (req, res) => {
//   res.sendFile(file2);
//   const { Name, UserName, Email, Password } = req.body;
//   console.log(`${Name}||${UserName}||${Email}||${Password}`);
// });

app.get("/login", (req, res) => {
  res.sendFile(loginFile);
});
//post
app.post("/goner", (req, res) => {
  const { Name, UserName, Email, Password } = req.body;
  user.name = Name;
  user.username = UserName;
  user.email = Email;
  user.password = Password;
  // add user to userList
  userList[Email] = user;
  if (Name != "admin") {
    res.sendFile(file2);
  } else {
    res.sendFile(adminFile);
  }

  console.log(`${Name}||${UserName}||${Email}||${Password}`);
});

//LISTEN AT PORT:3002
serv.listen(3002);

//creating socket list
const SOCKET_LIST = {};
//creating player list
const PLAYER_LIST = {};
//list environment event
const env_event_list = new Map();
const env_event_list_1 = {};
let CurrentInputId = -1;
let initOther = {};
let newPlayerCount = 0;
let oldPlayerCount = 0;
//DEBUG opt
var Debug = true;
var io = new Server(serv, server_config);
//SERVER
io.sockets.on("connection", (socket) => {
  console.log("hand shake from server side...");
  //GEN socket id
  socket.id = user.email;
  var player;
  if (socket.id == "") {
    socket.emit("return_to_login");
  }
  //create PLAYER
  player = new Player(socket.id);
  //add to socket list
  console.log(`socket : ${socket.id} created`);
  for (var u in userList) {
    console.log(`online:${u}`);
  }
  SOCKET_LIST[socket.id] = socket;
  PLAYER_LIST[socket.id] = player;
  var x = player.x;
  var y = player.y;
  var z = player.z;
  initOther[socket.id] = {
    id: socket.id,
    x: x,
    y: y,
    z: z,
    username: user.username,
  };
  newPlayerCount++;

  socket.emit("handshake");
  socket.emit("initPlayer", {
    id: socket.id,
    x: x,
    y: y,
    z: z,
    username: user.username,
  });
  for (var [key, value] of env_event_list.entries()) {
    socket.emit("c-scale-event", value);
    io.emit("c-scale-event", value);
  }
  socket.on("checkOthers", () => {
    if (newPlayerCount > 1) {
      // for (var i in SOCKET_LIST) {
      // const socket1 = SOCKET_LIST[i];

      io.emit("otherPlayer", initOther);

      //}
    }
  });
  socket.on("keypress", (data) => {
    //
    CurrentInputId = data.id;
    if (data.inputId == "right") {
      player.input.pressRight = data.status;
    }
    if (data.inputId == "left") {
      player.input.pressLeft = data.status;
    }
    if (data.inputId == "forward") {
      player.input.pressForward = data.status;
    }
    if (data.inputId == "backward") {
      player.input.pressBackward = data.status;
    }
  });
  //----manip--- events

  socket.on("s-scale-event", (data) => {
    io.emit("c-scale-event", data);
    env_event_list.set(data.name, data);

    console.log("sent scale event");
  });
  //----------Chat events-------
  // "send-msg-ts" => sending message to server
  // "send-msg-tc" => sending message to client
  // "send-msg-tcs" => sending message to clients
  socket.on("send-msg-ts", (data) => {
    if (data.receiver != "") {
      console.log("send msg to -- client");
    } else {
      io.except(data.sender).emit("send-msg-tcs", {
        name: data.name,
        msg: data.msg,
      });
    }
  });
  //------------- Eval command----
  socket.on("eval_command", (data) => {
    console.log(data.msg);
    if (!Debug) return;

    var res = eval(data.msg);
    socket.emit("server_res", res);
  });
  //-------------------
  socket.on("disconnect", () => {
    newPlayerCount--;
    for (var i in SOCKET_LIST) {
      var socket1 = SOCKET_LIST[i];
      socket1.emit("d_p", socket.id);
    }
    console.log(`socket : ${socket.id} removed`);
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
    delete userList[socket.id];
    delete initOther[socket.id];
    //
  });
});
setInterval(() => {
  var movePack = [];
  for (var p in PLAYER_LIST) {
    var playerM = PLAYER_LIST[p];

    playerM.updatePosition();
    movePack.push({
      id: playerM.id,
      x: playerM.x,
      y: playerM.y,
      z: playerM.z,
    });
  }

  io.emit("updatePosition", movePack);
  movePack = [];
}, 1000 / 32);

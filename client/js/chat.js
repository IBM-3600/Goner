import { socket } from "./socket_init";
const { keys, key_set } = require("./keys_constant.js");
let btn = document.getElementById("view_btn");
var chat = document.getElementById("chat");
//    chat.style.left = 0 +'px';
btn.onclick = come_to_view;
function come_to_view() {
  console.log(chat.style.left);
  console.log("btn clicked");
  if (chat.style.left != "0px") {
    chat.style.left = 0 + "px";
  } else {
    chat.style.left = -300 + "px";
  }
}
var message = "";
var letter = "";
var input_box = document.querySelector(".chat-input-box");
var message_box = document.querySelector(".chat-message-box");
var chat_field = document.getElementById("chat-input-field");
var submit_btn = document.getElementById("submit-btn");
var form = document.getElementById("chat-form");
var user_id = document.getElementById("userId");

// -----------creating new dom elements-----
var m_sender = document.createElement("div");
m_sender.className = "sender";

var m_receiver = document.createElement("div");
m_receiver.className = "receiver";

var m_status = document.createElement("div");
m_status.className = "status";

m_sender.appendChild(m_status);
m_receiver.appendChild(m_status);

//---------------------------------
var check_focus = false;
chat_field.onfocus = () => (check_focus = true);
chat_field.onblur = () => (check_focus = false);
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  console.log(e.key);
  if (check_focus) {
    if (key_set.has(e.key) || keys.has(e.keyCode)) {
      //letter = keys.get(e.which);
      letter = e.key;
      message += letter;
      chat_field.value = message;
    }
    if (e.key == "Backspace") {
      console.log(chat_field.value + ":backspace");
      console.log(chat_field.selectionStart);

      if (chat_field.selectionStart != message.length) {
        let message_slice1 = message.slice(0, chat_field.selectionStart);
        let message_slice2 = "";

        if (chat_field.selectionStart + 1 < message.length) {
          message_slice2 = message.slice(
            chat_field.selectionStart + 1,
            message.length
          );
        }
        // message = message.filter((letters) => {
        //   return letters != message_slice;
        // });
        let caretPos = chat_field.selectionStart;
        message = "";
        message = message_slice1 + message_slice2;
        console.log(message + ":slice");
        chat_field.value = message;
        chat_field.selectionStart = caretPos - 1;
        console.log(chat_field.value + ":after backspace");
      } else {
        message = message.slice(0, chat_field.selectionStart - 1);
        chat_field.value = message;
      }
    }
  }
});
form.onsubmit = (e) => {
  e.preventDefault();
  if (message != "") {
    let dev_opt = message.slice(0, 2);
    if (dev_opt == "=>") {
      socket.emit("eval_command", { msg: message.slice(2) });
      message = "";
      chat_field.value = "";
    } else {
      message_box.innerHTML += "<li class='sender'>" + message + "</li>";
      socket.emit("send-msg-ts", {
        name: user_id.innerText,
        msg: message,
        sender: socket.id,
        receiver: "",
      });
      message = "";
      chat_field.value = "";
    }
  } else {
    alert("please enter text");
  }
};
// submit_btn.onclick = () => {
//   console.log("send" + user_id.innerText);
//   socket.emit("send-msg-ts", {
//     name: user_id.innerText,
//     msg: message,
//     sender: socket.id,
//     receiver: "",
//   });
//   message = "";
//   chat_field.value = "";
// };
//socket.on("send-msg-tc", (data) => {});
socket.on("send-msg-tcs", (data) => {
  m_receiver.innerText = data.msg;
  message_box.innerHTML += "<li class='receiver'>" + data.msg + "</li>";
  // message_box.appendChild(m_receiver);
});

socket.on("server_res", (data) => {
  console.log(data);
});

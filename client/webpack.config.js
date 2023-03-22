var path = require("path");
module.exports = {
  mode: "development",
  context: path.join(__dirname, "js"),
  entry: {
    game: "./game.js",
    // chat: "./chat.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
};

// Leaderboard.js
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema(
  {
    playerName: {
      type: String,
      required: true,
    },
    time: String,
    mode: {
      type: String,
    },
  },
  { timestamps: true }
);

const easy = mongoose.model("easy", leaderboardSchema);
const medium = mongoose.model("medium", leaderboardSchema);
const hard = mongoose.model("hard", leaderboardSchema);
const harder = mongoose.model("harder", leaderboardSchema);

module.exports = {
  easy,
  medium,
  hard,
  harder,
};

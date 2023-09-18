const express = require("express");
const router = express.Router();
const { easy, medium, hard, harder } = require("../models/Leaderboard");

// Define a mapping of modes to leaderboard models
const leaderboardModels = {
  easy,
  medium,
  hard,
  harder,
};

// Middleware to handle common error responses
const handleErrors = (res, status, message) => {
  console.error(message);
  return res.status(status).json({ message });
};

// POST route for saving a leaderboard entry
router.post("/:mode", async (req, res) => {
  const { mode } = req.params;
  const { playerName, timeTaken } = req.body; // timeTaken is now a number

  try {
    // Check if the specified mode exists in the mapping
    if (!leaderboardModels[mode]) {
      return handleErrors(res, 400, "Invalid game mode");
    }

    const leaderboardEntry = new leaderboardModels[mode]({
      playerName,
      time: timeTaken, // Save timeTaken as a number
      mode,
    });

    await leaderboardEntry.save();

    // Log playerName
    console.log(`Leaderboard entry saved successfully: ${playerName}`);

    return res
      .status(201)
      .json({ message: `Leaderboard entry saved successfully: ${playerName}` });
  } catch (error) {
    return handleErrors(res, 500, "Error saving leaderboard entry");
  }
});

// GET route for fetching leaderboard entries
router.get("/:mode", async (req, res) => {
  const { mode } = req.params;

  try {
    // Check if the specified mode exists in the mapping
    if (!leaderboardModels[mode]) {
      return handleErrors(res, 400, "Invalid game mode");
    }

    const leaderboard = await leaderboardModels[mode]
      .find({ mode })
      .sort({ time: 1 }) // Sort by time in ascending order
      .limit(5); // Limit to the top 5 entries

    return res.json(leaderboard);
  } catch (error) {
    return handleErrors(res, 500, "Error fetching leaderboard");
  }
});

module.exports = router;

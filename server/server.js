const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDatabase = require("./config/connectDB");
const Leaderboard = require("./models/Leaderboard");

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to the database
connectToDatabase();

// Create a new leaderboard entry
app.post("/leaderboard", async (req, res) => {
  try {
    const { playerName, score } = req.body;
    const leaderboardEntry = new Leaderboard({ playerName, score });
    await leaderboardEntry.save();
    res.status(201).json(leaderboardEntry);
  } catch (error) {
    console.error("Error creating leaderboard entry:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get the leaderboard
app.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ score: -1 }) // Sort by score in descending order
      .limit(10); // Limit to the top 10 entries
    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});

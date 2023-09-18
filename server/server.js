const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDatabase = require("./config/connectDB");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
connectToDatabase();

app.use("/leaderboard", leaderboardRoutes);

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});

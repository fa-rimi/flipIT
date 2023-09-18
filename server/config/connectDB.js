const mongoose = require("mongoose");

async function connectToDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not defined in the environment.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log(`Connected to ${mongoose.connection.name} at ${mongoose.connection.host}:${mongoose.connection.port}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

module.exports = connectToDatabase; // Export the function directly
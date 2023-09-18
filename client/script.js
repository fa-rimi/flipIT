let flippedCards = [];
let clickCount = 0;
let timerInterval;
let secondsElapsed = 0;
let timerStarted = false;
let currentGameMode;

const easyBtn = document.getElementById("easy");
easyBtn.addEventListener("click", () => {
  currentGameMode = "easy"; // Set the current game mode to "easy"
  createNewGameBoard(2, 2);
});

const mediumBtn = document.getElementById("medium");
mediumBtn.addEventListener("click", () => {
  currentGameMode = "medium"; // Set the current game mode to "medium"
  createNewGameBoard(4, 4);
});

const hardBtn = document.getElementById("hard");
hardBtn.addEventListener("click", () => {
  currentGameMode = "hard"; // Set the current game mode to "hard"
  createNewGameBoard(6, 6);
});

const harderBtn = document.getElementById("harder");
harderBtn.addEventListener("click", () => {
  currentGameMode = "harder"; // Set the current game mode to "harder"
  createNewGameBoard(8, 8);
});

function updateClickCount() {
  const clickCountElement = document.getElementById("click-count");
  clickCountElement.textContent = `Click Count: ${clickCount}`;
}

const gameboard = document.querySelector(".gameboard");

function createNewGameBoard(rows, columns) {
  clickCount = 0;
  clearInterval(timerInterval);
  secondsElapsed = 0;
  timerStarted = false;

  const timerElement = document.getElementById("timer");
  timerElement.textContent = "Time: 00:00";

  const totalCards = rows * columns;

  gameboard.innerHTML = "";
  gameboard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  gameboard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  const colors = [];

  for (let i = 0; i < totalCards / 2; i++) {
    const randomColor = randomRgbColor();
    colors.push(randomColor, randomColor);
  }

  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }

  updateClickCount();

  for (let i = 0; i < totalCards; i++) {
    const card = document.createElement("div");
    card.classList.add("memory-cards");
    card.classList.add("flip-card");

    const backFace = document.createElement("div");
    backFace.classList.add("back-face");
    backFace.textContent = "?";

    const frontFace = document.createElement("div");
    frontFace.classList.add("front-face");
    frontFace.style.backgroundColor = colors[i];

    card.appendChild(backFace);
    card.appendChild(frontFace);

    gameboard.appendChild(card);

    card.addEventListener("click", () => {
      if (!card.classList.contains("flipped") && flippedCards.length < 2) {
        if (!timerStarted) {
          timerInterval = setInterval(updateTimer, 1000);
          timerStarted = true;
        }
        card.classList.add("flipped");
        flippedCards.push(card);
        gameLoop();
        clickCount++;
        updateClickCount();
      }
    });
  }
}

function randomRgbColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function gameLoop() {
  const flippedCardCount = flippedCards.length;
  document.querySelectorAll(".flipped");

  if (flippedCardCount === 2) {
    gameboard.style.pointerEvents = "none";
    const [card1, card2] = flippedCards;
    const frontFace1 = card1.querySelector(".front-face");
    const frontFace2 = card2.querySelector(".front-face");
    const color1 = frontFace1.style.backgroundColor;
    const color2 = frontFace2.style.backgroundColor;

    if (color1 === color2) {
      flippedCards = [];
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }

    setTimeout(() => {
      gameboard.style.pointerEvents = "auto";
    }, 1000);
  }
}

function updateTimer() {
  secondsElapsed++;
  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;
  const timerElement = document.getElementById("timer");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  timerElement.textContent = `Time: ${formattedMinutes}:${formattedSeconds}`;

  const allCards = document.querySelectorAll(".memory-cards");
  const flippedCardsCount = document.querySelectorAll(".flipped").length;

  if (flippedCardsCount === allCards.length) {
    clearInterval(timerInterval);
    const timeTakenInSeconds = secondsElapsed; // Calculate the time taken in seconds
    const timeTaken = formatTime(timeTakenInSeconds); // Format it as mm:ss

    console.log(
      "Congratulations! You completed the game in ",
      formattedMinutes,
      " minutes ",
      formattedSeconds,
      " seconds."
    );

    // Display congratulations message first
    gameboard.innerHTML = "";
    const congratulationsMessage = document.createElement("div");
    congratulationsMessage.textContent = `Congratulations! You completed the game in ${formattedMinutes} minutes ${formattedSeconds} seconds.`;
    congratulationsMessage.classList.add("congratulations");
    gameboard.appendChild(congratulationsMessage);

    // Prompt the user for their name with a slight delay
    setTimeout(() => {
      const playerName = prompt("Congratulations! Enter your name:");

      if (playerName) {
        // Make the HTTP request to save the leaderboard entry
        saveLeaderboardEntry(playerName, timeTaken, currentGameMode);
      }
    }, 1000);
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

// Backend Request
async function saveLeaderboardEntry(playerName, mode) {
  try {
    const timeTaken = secondsElapsed; // Use the time from updateTimer
    const formattedTime = formatTime(timeTaken); // Format the time if needed

    const response = await fetch(
      `http://localhost:3001/leaderboard/${currentGameMode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerName, time: formattedTime, mode }),
      }
    );

    if (response.status === 201) {
      // Entry saved successfully
      console.log(`Leaderboard entry saved successfully: ${playerName}`);
    } else {
      // Handle other response statuses if needed
      console.error(
        "Failed to save leaderboard entry. Response status:",
        response.status
      );
    }
  } catch (error) {
    console.error("Error saving leaderboard entry:", error);
    // Handle error, e.g., display an error message to the user
  }
}

let flippedCards = [];
let clickCount = 0;
let timerInterval;
let secondsElapsed = 0;
let timerStarted = false;
let currentGameMode;
let originalColorMode = true;

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

// Color generators 
function toggleColorMode() {
  const colorModeSelect = document.getElementById("color-mode-select");
  const selectedValue = colorModeSelect.value;

  if (selectedValue === "original") {
    originalColorMode = true;
  } else if (selectedValue === "high-contrast") {
    originalColorMode = false;
  }

  console.log(`${selectedValue} selected`);

  if (originalColorMode) {
    // Switch to original color mode using randomRgbColor
    updateCardBackgrounds(randomRgbColor());
  } else {
    // Switch to high-contrast color mode
    updateCardBackgrounds(generateHighContrastColors());
  }
}

function randomRgbColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to generate random colors with high contrast
function generateHighContrastColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const randomColor = randomHighContrastColor();
    colors.push(randomColor);
  }
  return colors;
}

// Function to generate a random high-contrast color
function randomHighContrastColor() {
  const r = Math.random() > 0.3 ? 255 : 0;
  const g = Math.random() > 0.3 ? 255 : 0;
  const b = Math.random() > 0.3 ? 255 : 0;
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to update card backgrounds based on the selected color scheme
function updateCardBackgrounds(colors) {
  const cardElements = document.querySelectorAll(".front-face");

  cardElements.forEach((card, index) => {
    card.style.backgroundColor = colors[index];
  });
}

// Add event listener to the color mode toggle button
const toggleColorModeButton = document.getElementById("color-mode-select");
toggleColorModeButton.addEventListener("click", toggleColorMode);

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

/**
 * @description Updates the game timer display,
 * calculates elapsed time,
 * and checks if the game is completed to display a congratulations message
 * and prompt the player for their name
 *
 * if the playerName is true (or entered)
 * it will callback the saveLeaderboardEntry() function
 */
function updateTimer() {
  secondsElapsed++;
  const minutes = Math.floor(secondsElapsed / 60);
  const remainingSeconds = secondsElapsed % 60;
  const timerElement = document.getElementById("timer");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  timerElement.textContent = `Time: ${formattedMinutes}:${formattedSeconds}`;

  const allCards = document.querySelectorAll(".memory-cards");
  const flippedCardsCount = document.querySelectorAll(".flipped").length;

  if (flippedCardsCount === allCards.length) {
    clearInterval(timerInterval);

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
        saveLeaderboardEntry(playerName, currentGameMode);
      }
    }, 1000);
  }
}

/**
 * Fullstack integration
 * @param {*} playerName
 * @param {*} mode
 * @method fetch
 * @description Sends an HTTP POST request to save the player's name and game time to the leaderboard for the selected game mode
 */
async function saveLeaderboardEntry(playerName, mode) {
  try {
    const timeTakenInSeconds = secondsElapsed; // Use the time from updateTimer()
    // const formattedTime = formatTime(timeTakenInSeconds);

    // currentGameMode is appended to the URL to indicate the game mode being played
    const response = await fetch(
      `http://localhost:3001/leaderboard/${currentGameMode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerName,
          timeTaken: timeTakenInSeconds,
          mode,
        }), // Send timeTakenInSeconds instead of formattedTime
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

// ---- Helper Function ----
// function formatTime(timeTakenInSeconds) {

//   const minutes = Math.floor(timeTakenInSeconds / 60);
//   const seconds = timeTakenInSeconds % 60;
//   const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
//     seconds
//   ).padStart(2, "0")}`;
//   return formattedTime;
// }
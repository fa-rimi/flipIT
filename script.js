/**
 *
 * * Game: flipIT ****
 *
 * 💡 My thought process: (and steps i took)
 * ✨ i will not create divs in HTML because DOM is my best friend ✨
 *
 * user will have the option to click easy, medium, or hard mode
 * when game mode is clicked it will trigger a function to createNewGameBoard
 * game -- will display a different amount of cards 4x4, 6x6, 8x8 =D
 *
 */

// easy mode
const easyBtn = document.getElementById("easy");
easyBtn.addEventListener("click", () => {
  console.log("easy mode activated!");
  // when button is clicked it will trigger a function to create a new gameboard

  createNewGameBoard();
});

// medium mode
const mediumBtn = document.getElementById("medium");
mediumBtn.addEventListener("click", () => {
  console.log("medium mode activated!");
  createNewGameBoard();
});

// hard mode
const hardBtn = document.getElementById("hard");
hardBtn.addEventListener("click", () => {
  console.log("hard mode activated!");
  createNewGameBoard();
});

// new gameboard will have a certain amount of cards (rows, columns), depending on the mode that was clicked
function createNewGameBoard(rows, columns) {
  const totalCards = rows * columns;
}

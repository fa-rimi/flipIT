/**
 *
 * * Game: flipIT ****
 *
 * 💡 My thought process: (and steps i took)
 * ✨ i will not create divs in HTML because DOM is my best friend ✨
 *
 * user will have the option to click easy, medium, or hard mode
 * when game mode is clicked it will trigger a function to createNewGameBoard
 * the game will display a different amount of cards 4x4, 6x6, 8x8 =D
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

// * new game board
// new gameboard will have a certain amount of cards (rows, columns), depending on the mode that was clicked
const gameboard = document.querySelector(".gameboard");
function createNewGameBoard(rows, columns) {
  const totalCards = rows * columns;

  gameboard.innerHTML = "";
  // blank because the gameboard shouldn't have anything in it initially and it will clear out all the cards for every new game
  gameboard.style.gridTemplateColumns(`repeat(${columns}, 1fr)`);
  gameboard.style.gridTemplateRows(`repeat(${rows}, 1fr)`);
  // for the row and column the specific card will repeat based on the amount requested by the mode
  // the card will then only take up 1 fraction(1fr) of the space in the row/column
  // for example: in a 4x4 the cards will repeat (4 column cards and each card will take up 1/4 space)
  
  // create a loop that says that if i <= totalCards it will increment until it reaches the total amount
  // then it will create card divs with memory-card class 
  // within those card divs there are front-face class divs for the hidden parts of the card
  // there are also back-face class divs for the exposed parts of the card
  // in order for it to work i have to attach the front-face & back-face to the card to make sure its one
  // probably using append
  // but i'll have to attach these to the actual gameboard or else its just gonna be idk where
}
/**
 *
 * Credits and Resources:
 *
 * For styling:
 * - https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
 *
 */

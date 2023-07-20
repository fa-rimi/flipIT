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
  createNewGameBoard(2, 2);
  // ! i forgot to add values within the parameters so nothing was displaying
});

// medium mode
const mediumBtn = document.getElementById("medium");
mediumBtn.addEventListener("click", () => {
  console.log("medium mode activated!");
  createNewGameBoard(4, 4);
});

// hard mode
const hardBtn = document.getElementById("hard");
hardBtn.addEventListener("click", () => {
  console.log("hard mode activated!");
  createNewGameBoard(6, 6);
});

// * new game board
// new gameboard will have a certain amount of cards (rows, columns), depending on the mode that was clicked
const gameboard = document.querySelector(".gameboard");
function createNewGameBoard(rows, columns) {
  const totalCards = rows * columns;

  gameboard.innerHTML = "";
  // blank because the gameboard shouldn't have anything in it initially and it will clear out all the cards for every new game
  gameboard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  gameboard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
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
  for (let i = 0; i < totalCards; i++) {
    const card = document.createElement("div");
    // create and add class memory-cards for overall cards
    card.classList.add("memory-cards");
    // create and add class flip-card for card flip function
    card.classList.add("flip-card");

    // card side that player will see
    const backFace = document.createElement("div");
    backFace.classList.add("back-face");
    backFace.textContent = "?";
    // backFace.style.textAlign = 'center';

    // card with color thats hidden
    const frontFace = document.createElement("div");
    frontFace.classList.add("front-face");
    
    card.appendChild(backFace);
    card.appendChild(frontFace);
    gameboard.appendChild(card);

    // function for card flip
    // event listener for memory-card and make it flip on click foreach card
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  }
}
// console.dir(gameboard);

/**
 * 
 * Note to future self:
 * - max amount of colors should be 40-50
 * - make an array of colors -- preferably creating colors from math.random and hex code values as oppose to writing out all the
 *   colors to be efficient.
 * - figure out how to make 2 colors repeat to make a pair of cards 
 * - work on randomizing/shuffling colors and applying it to the front-face class
 * 
 * afterwards:
 * * take a break babes, you need it **
 * - figure out gameloop
 *      - if one card is clicked 
 *          - run timeOut function - startTimeout()
 *      - else check if cards match in color
 *          - clearTimeout()
 *          - check if cards match - matchCard() 
 * 
 * - create a startTimeout function
 *      - when first card is flipped
 *      - second card needs to be clicked in under 1.5 seconds or it will unflip
 * 
 * - create a matchCard function
 * 
 * 
 * future: 
 * - add a moves counter 
 * - add a timeout so after and secondscounter
 * 
 */

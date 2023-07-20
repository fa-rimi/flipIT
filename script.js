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

let flippedCards = []; // Array to store and keep track of all the player's flipped cards
let clickCount = 0; // clickCount is 0 because there hasn't been any clicks yet

function updateClickCount() {
  const clickCountElement = document.getElementById("click-count");
  clickCountElement.textContent = `Click Count: ${clickCount}`;
}

// * new game board
// new gameboard will have a certain amount of cards (rows, columns), depending on the mode that was clicked
const gameboard = document.querySelector(".gameboard");
function createNewGameBoard(rows, columns) {
  const totalCards = rows * columns;

  // blank because the gameboard shouldn't have anything in it initially and it will clear out all the cards for every new game
  gameboard.innerHTML = "";
  // for the row and column the specific card will repeat based on the amount requested by the mode
  // the card will then only take up 1 fraction(1fr) of the space in the row/column
  // for example: in a 4x4 the cards will repeat (4 column cards and each card will take up 1/4 space)
  gameboard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  gameboard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  // generate random colors using rgb value
  // declare a variable name and initialize it as an empty array
  const colors = [];
  // since we need color pairs this is saying that the loop will only run half of the total cards
  for (let i = 0; i < totalCards / 2; i++) {
    // this is calling the function randomRgbColor that returns randomized rgb color values
    const randomColor = randomRgbColor();
    // push each color twice in the array so two cards to have the same color & matching pairs
    colors.push(randomColor, randomColor);
    console.log(colors[i]);
  }

  // shuffle color array using Fisher-Yates shuffle algorithm
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }

  // Update the click count element initially
  updateClickCount();

  // create a loop that says that if i <= totalCards it will increment until it reaches the total amount
  for (let i = 0; i < totalCards; i++) {
    // then it will create card divs with memory-card class
    const card = document.createElement("div");
    // create and add class memory-cards for overall cards
    card.classList.add("memory-cards");
    // create and add class flip-card for card flip function
    card.classList.add("flip-card");

    // within those card divs there are front-face class divs for the hidden parts of the card
    // card side that player will see
    const backFace = document.createElement("div");
    backFace.classList.add("back-face");
    backFace.textContent = "?";
    // backFace.style.textAlign = 'center';

    // there are also back-face class divs for the exposed parts of the card
    // card with color thats hidden
    const frontFace = document.createElement("div");
    frontFace.classList.add("front-face");
    frontFace.style.backgroundColor = colors[i]; // apply random colors here

    // in order for it to work i have to attach the front-face & back-face to the card to make sure its one
    card.appendChild(backFace);
    card.appendChild(frontFace);

    // but i'll have to attach these to the actual gameboard or else its just gonna be idk where
    gameboard.appendChild(card);

    // event listener for memory-card and make it flip foreach card and apply game loop function
    card.addEventListener("click", () => {
      // Inside the card click event listener, add the card to the flippedCards array
      // check if the card is not flipped and there are less than 2 cards flipped
      if (!card.classList.contains("flipped") && flippedCards.length < 2) {
        // if conditions are met it will add the clicked cards to the flippedCard array using push
        card.classList.add("flipped");
        flippedCards.push(card);

        // once two cards are flipped we will call the gameLoop function
        gameLoop();
        //  increment the clickCount variable to keep track of the total number of card clicks.
        clickCount++;
        console.log("Click Count: ", clickCount);
        // We call the updateClickCount() function to update the displayed click count on the webpage
        updateClickCount();
      }
    });
  }
}

function randomRgbColor() {
  // I multiplied it to 256 because rbg values range from 0 - 255; the 256 is exclusive
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  // The function returns a string in the "rgb(r, g, b)" format, where r, g, and b are random values which will then be applied to the frontFace
  return `rgb(${r}, ${g}, ${b})`;
}

// gameLoop is responsible for checking all of the flipped cards as well as running the game logic
function gameLoop() {
  // creating a constant variable that allows us to keep track of how many cards are currently flipped
  const flippedCardCount = flippedCards.length;

  // create an if else saying if the amount of flipped cards on the board is === 2
  if (flippedCardCount === 2) {
    // lock the gameboard so player cannot flip anymore cards
    gameboard.style.pointerEvents = "none";

    // now check if the cards match
    // assign the first two cards from flippedCards array to variables card1 and card2 so we know the two cards we need to check
    const [card1, card2] = flippedCards;

    // selecting the front-face div elements for card 1 and card 2
    const frontFace1 = card1.querySelector(".front-face");
    const frontFace2 = card2.querySelector(".front-face");

    // getting and storing color 1 into front face of card 1
    const color1 = frontFace1.style.backgroundColor;
    const color2 = frontFace2.style.backgroundColor;

    // check if it matches so if color1 === color2
    if (color1 === color2) {
      // cards match, keep them face-up and clear the flippedCards array so player can move forward and flip two more cards
      flippedCards = [];
    } else {
      // cards don't match, flip them back after a 1 second delay
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        // and clear out flipped cards 
        flippedCards = [];
      }, 1000);
    }

    // unlock the gameboard after so player can move forward with another move
    setTimeout(() => {
      gameboard.style.pointerEvents = "auto";
    }, 1000);
  }
}

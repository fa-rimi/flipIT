/**
 * 
 * * Game: flipIT ****
 * 
 * 💡 My thought process: (and steps i took)
 * ✨ i will not create divs in HTML because DOM is my best friend ✨
 * 
 * user will have the option to click easy, medium, or hard mode
 * when game mode is clicked it will trigger a function to createNewGameBoard
 * 
 */

// easy mode
const easyBtn = document.getElementById('easy')
easyBtn.addEventListener("click", () => {
    console.log("easy mode activated!");
    createNewGameBoard();
});

// medium mode
const mediumBtn = document.getElementById('medium')
mediumBtn.addEventListener("click",() => {
    console.log("medium mode activated!");
    createNewGameBoard();
});

// hard mode
const hardBtn = document.getElementById("hard")
hardBtn.addEventListener("click", () => {
    console.log("hard mode activated!");
    createNewGameBoard();
})

function createNewGameBoard() {
    
}
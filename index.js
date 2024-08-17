const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // UI ko empty karna
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "auto";
        box.classList.remove("win");
        box.style.backgroundColor = ""; // Remove the green background
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    // Update UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPosition.forEach((position) => {
        // All 3 boxes should be non-empty and exactly the same in value
        if (
            gameGrid[position[0]] !== "" &&
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[1]] === gameGrid[position[2]]
        ) {
            // Check if winner is X or O
            answer = gameGrid[position[0]];

            // Disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // Highlight the winning combination
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            // Change background color to green for the winning combination
            boxes[position[0]].style.backgroundColor = "green";
            boxes[position[1]].style.backgroundColor = "green";
            boxes[position[2]].style.backgroundColor = "green";
        }
    });

    // It means we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // Let's check whether there is a tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;
    });

    // Board is filled, game is a tie
    if (fillCount === 9) {  
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
        return;
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // Check if someone won
        checkGameOver();
        // Swap the turn
        if (gameInfo.innerText.includes("Winner") === false && gameInfo.innerText.includes("Tied") === false) {
            swapTurn();
        }
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);

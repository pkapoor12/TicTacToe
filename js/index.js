const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartButton = document.querySelector('#restartButton');
const startButton = document.querySelector('#startButton');
const winConditions = [
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 4],
    [5, 6, 7],
    [6, 7, 8],
    [7, 8, 9],
    [10, 11, 12],
    [11, 12, 13],
    [12, 13, 14],
    [15, 16, 17],
    [16, 17, 18],
    [17, 18, 19],
    [20, 21, 22],
    [21, 22, 23],
    [22, 23, 24],
    [0, 5, 10],
    [5, 10, 15],
    [10, 15, 20],
    [1, 6, 11],
    [6, 11, 16],
    [11, 16, 21],
    [2, 7, 12],
    [7, 12, 17],
    [12, 17, 22],
    [3, 8, 13],
    [8, 13, 18],
    [13, 18, 23],
    [4, 9, 14],
    [9, 14, 19],
    [14, 19, 24],
    [10, 16, 22],
    [5, 11, 17],
    [11, 17, 23],
    [0, 6, 12],
    [6, 12, 18],
    [12, 18, 24],
    [1, 7, 13],
    [7, 13, 19],
    [2, 8, 14],
    [14, 18, 22],
    [9, 13, 17],
    [13, 17, 21],
    [4, 8, 12],
    [8, 12, 16],
    [12, 16, 20],
    [3, 7, 11],
    [7, 11, 15],
    [2, 6, 10]
];
let options = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"
let running = false;

function startGame() {
    startButton.style.visibility = 'hidden';
    restartButton.style.visibility = 'visible';
    cells.forEach(cell => cell.addEventListener("click", cellClickHandler));
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClickHandler() {
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running) {
        return;
    }
    else {
        updateCell(this);
        checkWinner();
        if(running) {
            changePlayer();
        }
    }

    return;
}

function updateCell(cell) {
    const cellIndex = cell.getAttribute("cellIndex")
    options[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    return;
}

function changePlayer() {
    if(currentPlayer == "X") {
        currentPlayer = "O";
    }
    else if(currentPlayer == "O") {
        currentPlayer = "Y";
    }
    else {
        currentPlayer = "X";
    }
    statusText.textContent = `${currentPlayer}'s turn`;
    return;
}

function checkWinner() {
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++) {
        let condition = winConditions[i];
        let cellA = options[condition[0]];
        let cellB = options[condition[1]];
        let cellC = options[condition[2]];
        
        if((cellA == cellB && cellB == cellC) && cellA != "") {
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        statusText.textContent = `${currentPlayer} won!`;
        running = false;
    }
    else if(!options.includes("")) {
        statusText.textContent = 'Draw!';
    }

    return;

}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
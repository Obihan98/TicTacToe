// Setting up the board
var board = document.querySelector(".game-board");
var boardHTML = "";

var number_of_rows = 3;
var number_of_cols = 3;
var boardArray = new Array(number_of_rows);

for (let i = 0; i < number_of_rows; i++){
    boardHTML += '<div class="row">';
    boardArray[i] = new Array(number_of_cols);
    for (let j = 0; j < number_of_cols; j++){
        boardHTML += '<div class="block" id="block-' + j + i + '"><img src="white.jpg" alt=""></div>';
        boardArray[i][j] = 0;
    }
    boardHTML += '</div>';
}
board.innerHTML = boardHTML;

// Event Listener Clicking on Board
var blocks = document.querySelectorAll(".block");
for (let i = 0; i < blocks.length; i++){
    blocks[i].addEventListener("click", function(){
        handleClick(blocks[i].getAttribute("id"), board);
    })
}

// Putting X or O to the board
var turn_count = 0;
function handleClick(id){
    let coordinates = id.slice(6, 8)
    let x = coordinates[0];
    let y = coordinates[1];
    if (turn_count % 2 == 0 && notClicked(x, y, boardArray)){
        document.querySelector("#" + id + " img").setAttribute("src", "x.png");
        boardArray[x][y] = 1;
        turn_count++;
    } else if (turn_count % 2 == 1 && notClicked(x, y, boardArray)){
        document.querySelector("#" + id + " img").setAttribute("src", "o.png");
        boardArray[x][y] = 2;
        turn_count++;
    }
}

function notClicked(x, y, boardArray){
    if (boardArray[x][y] == 0){
        return true;
    } else{
        return false;
    }
}

// Handle the end of the game
for (let i = 0; i < boardArray[0].length; i++){
    boardArray[i].every(col => {
        if (col == 1 || col == 2){
            return true;
        }
    })
}

// Setting up the board
var board = document.querySelector(".game-board");
var boardHTML = "";

var number_of_rows = 3;
var number_of_cols = 3;
var boardArray = new Array(number_of_rows);

function setBoard(){
    boardArray = new Array(number_of_rows);
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
}

setBoard();

// Event Listener Clicking on Board
var blocks = document.querySelectorAll(".block");
for (let i = 0; i < blocks.length; i++){
    blocks[i].addEventListener("click", function(){
        handleClick(blocks[i].getAttribute("id"), board);
    })
}

// Putting X or O to the board
var turn_count = 0;
var winner = 0;
function handleClick(id){
    let coordinates = id.slice(6, 8)
    let x = coordinates[1];
    let y = coordinates[0];

    // When there is no winner
    if (winner == 0){
        if (turn_count % 2 == 0 && notClicked(x, y, boardArray)){
            document.querySelector("#" + id + " img").setAttribute("src", "x.png");
            boardArray[x][y] = 1;
            turn_count++;
        } else if (turn_count % 2 == 1 && notClicked(x, y, boardArray)){
            document.querySelector("#" + id + " img").setAttribute("src", "o.png");
            boardArray[x][y] = -1;
            turn_count++;
        }
    }
    // When there is a winner
    else{

    }
    winner = checkWinner(); 
}

function notClicked(x, y, boardArray){
    if (boardArray[x][y] == 0){
        return true;
    } else{
        return false;
    }
}

// Check Winners
function checkWinner(){
    // Check Rows
    for (let i = 0; i < boardArray[0].length; i++){
        if (boardArray[i].every(element => {
            if (element == 1) return true;
        })){
            return 1;
        } else if (boardArray[i].every(element => {
            if (element == 2) return true;
        })){
            return -1;
        }
    }

    // Check columns
    for (let i = 0; i < boardArray[0].length; i++){
        let colSum = 0;
        for (var j = 0; j < boardArray[0].length; j++){
            colSum += boardArray[j][i];
        }
        if (colSum === 3){
            return 1;
        }
        else if(colSum === -3){
            return -1;
        }
    }

    // Check diagonals
    if(boardArray[0][0] + boardArray[1][1] + boardArray[2][2] === 3){return 1;}
    else if(boardArray[0][0] + boardArray[1][1] + boardArray[2][2] === -3){return -1;}
    if(boardArray[2][0] + boardArray[1][1] + boardArray[0][2] === 3){return 1;}
    else if(boardArray[2][0] + boardArray[1][1] + boardArray[0][2] === -3){return -1;}
    return 0;
}

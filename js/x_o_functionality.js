/// Global Variables
var turn = false;
var gameOver = false;
var winner;

function gameFinished(){
	// dictionary for storing the game stats
	var game_board = {
		1: "",
		2: "",
		3: "",
		4: "",
		5: "",
		6: "",
		7: "",
		8: "",
		9: ""
	}

	// Get all the boxes
	var all_boxes = document.getElementsByClassName("box");
	// console.log(all_boxes);
	// loop through each box in all the boxes
	for (var i=0; i<all_boxes.length; i++){
		// console.log("Element: " + i);
		// console.log(all_boxes[i].className);
		classNames = all_boxes[i].className
		split_classNames = classNames.split(" ");
		// loop through each class name to see if its an 'x' or 'o'
		for (var j=0; j<split_classNames.length; j++){
			if (split_classNames[j] == "x"){
				game_board[i+1] = "x"
				// console.log("There was an x");
			} else if (split_classNames[j] == "o"){
				game_board[i+1] = "o"
				// console.log("There was an o")
			}
		}
	} // closes outer nested for loop

	// 1.) CHECK TO SEE IF GAME IS OVER
	// assume the game is over
	gameOver = true;
	for (var key in game_board){
		console.log(key + ": " + game_board[key]);
		if (game_board[key] == ""){
			gameOver = false;
		}
	}

	// 2.) CHECK IF ANY ROWS HAVE THE SAME variable
	if ((game_board[1] == game_board[2] && game_board[1] == game_board[3]) && game_board[1]!=""){
		gameOver = true;
		winner = game_board[1];
		alert(winner + " has won!");
	}
	else if ((game_board[4] == game_board[5] && game_board[4] == game_board[6]) && game_board[4]!=""){
		gameOver = true;
		winner = game_board[4];
		alert(winner + " has won!");
	} else if ((game_board[7] == game_board[8] && game_board[7] == game_board[9]) && game_board[7]!=""){
		winner = game_board[7];
		alert(winner + " has won!");
		gameOver = true;
	}

	// 3.) CHECK IF ANY COLUMNS HAVE THE SAME variable
	if ((game_board[1] == game_board[4] && game_board[1] == game_board[7]) && game_board[1]!=""){
		gameOver = true;
		winner = game_board[1];
	} 	else if ((game_board[2] == game_board[5] && game_board[2] == game_board[8]) && game_board[2]!=""){
		gameOver = true;
		winner = game_board[2];
		alert(winner + " has won!");
	}
	else if ((game_board[3] == game_board[6] && game_board[3] == game_board[9]) && game_board[3]!=""){
		gameOver = true;
		winner = game_board[2];
		alert(winner + " has won!");
	}

	// 3.) CHECK IF ANY DIAGONALS HAVE THE SAME variable
	if ((game_board[1] == game_board[5] && game_board[1] == game_board[9]) && game_board[1]!=""){
		gameOver = true;
		winner = game_board[1];
		alert(winner + " has won!");
	} else if((game_board[3] == game_board[5] && game_board[3] == game_board[7]) && game_board[3]!=""){
		gameOver = true;
		winner = game_board[3];
		alert(winner + " has won!");
	}
	// console.log(game_board);

}

// clicking box will call changeBackground function!
function changeBackground(eventObj){
	// Get element tag
	var id = eventObj.target.id
	var target = document.getElementById(id);

	// Find the classes of the element tag, to see if unselected
	// if there already is a 'x' or 'o' in class names do not proceed!
	var classNames = target.className;
	var split_str = classNames.split(" ");
	var proceed = true;
	for (var i=0; i<split_str.length; i++){
		var name = split_str[i];
		if (name == 'x' || name == 'o'){
			proceed = false;
		}
	}

	// check whose turn it is, and add appropriate designation
	// only if you can proceed
	if (turn && proceed){
		target.className += " x";
		turn = !turn;
		// check for winner!
		gameFinished();
	}
	else if(!turn && proceed) {
		target.className += " o";
		// toggle turn variable
		turn = !turn;
		gameFinished();
	} else {
		alert("That box has already been selected!!");
	}

	// if Game is Over
	// if (gameOver){
	// 	alert("Game is Over!");
	// 	}


}

function new_game(){
	alert("NEW GAME");
	labeled_boxes = document.getElementsByClassName("x");
	// console.log(labeled_boxes);
}


window.onload = init;
function init(){

// create an event listener for each of the 9 boxes;
for (var i=1; i<10; i++){
	// console.log("box" + i.toString());
	var box_ref = document.getElementById("box" + i.toString());
	box_ref.onclick = changeBackground;
}

	// document.getElementById("new_game").onclick = new_game;
	var new_game_button = document.getElementById("new_game");
	new_game_button.addEventListener("click", new_game);
};
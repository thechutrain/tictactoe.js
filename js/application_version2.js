$(document).ready(function(){
	// // event listener for the new_button clicked!
	$("#new_game").on("click", model.newGame);

	// // event listener for when any of the boxes are clicked!
	// $(".box").on("click", changeBackground);

	// $(".header").on("click", gameOver);

	// TESTING
	view.display_x('box0');
	view.display_o('box1');
	view.clear_x_o();
	view.displayMessage("tap tap tap, is this thing working?");
	// alert(model.winningCombinations);

})

//////// Views //////// 
var view = {
	// VIEWS - properties

	//VIEWS - methods
	display_x: function(box_id){
		var box_id = $("#" + box_id.toString());
		box_id.addClass("x");
		// Control for double selecting a box here or at controller?
		// if (box_id.hasClass("x") || box_id.hasClass('o')){
		// 	// alert("yes");
		// }
	},

	display_o: function(box_id){
		var box_id = $("#" + box_id.toString());
		box_id.addClass("o");
	},

	displayMessage: function(message){
		// assume message is a string
		$('#message').text(message);
		// alert('message passed!');
	},

	displayStats: function(){
		// TO DO!
	},

	clear_x_o: function(){
		$(".box").removeClass("x o");
	},

}

//////// Model //////// 
var model = {
	// Properties
	gameNumber: 0,
	whoseTurn: 0,
	gameBoard: new Array(9),
	winningCombinations: [
		["0", "1", "2"],
		["3", "4", "5"],
		["6", "7", "8"],
		["0", "3", "6"],
		["1", "4", "7"],
		["2", "5", "8"],
		["0", "4", "8"],
		["2", "4", "6"]
		],
	winner: undefined,

	// Methods
	newGame: function(){
		// clear the x & o classes
		view.clear_x_o();
		// reset variables
		this.winner = undefined;
		this.gameBoard = new Array(9);
		this.whoseTurn = 0;
		// display to the user, that theres been a new game
		view.displayMessage("You just started a new game!");
	}
}

//////// Controller //////// 
var controller = {
	
}


//////// Functions for the event listeners! //////// 
	function newGame(){
	// This Function will clear all the classes on the boxes
	$(".box").removeClass("x o");
	};

	function checkCombinations(point1, point2, point3){
		// var to contain winner, if no winner -1 is returned
		var winner;
		if (point1 == point2 && point1 == point3 && point1!=""){
			winner = point1;
		} else{
			winner = "-1";
		}
		return winner;
	};

	function changeBackground(){
		var proceed = true;
		// First check to see if box already has a class
		if ($(this).hasClass("x") || $(this).hasClass("o")){
				alert("That box has been selected already!");
				proceed = false;
		}

		if (proceed == true){
			// find out whose turn it is:
			var whoseTurn = $("#model").find("#whoseTurn").data("turn");
			// alert(whoseTurn);
			if (whoseTurn == 0){
				$(this).addClass('x');
				$(this).data("mark", "x");
				whoseTurn = "1";
			} else {
				$(this).addClass('o');
				$(this).data("mark", "o");
				whoseTurn = "0";
			}
			// change the value of whoseTurn
			$("#model").find("#whoseTurn").data("turn", whoseTurn);

			}

		// Check for winner:
		// 1.) create an array that represents board status
		var gameBoard = new Array(9);
		for (var j=0; j< gameBoard.length; j++){
			var box_number = "#box" + j.toString();
			var box = $(box_number);
			if (box.hasClass("x")){
				// alert("x");
				gameBoard[j] = "x";
			} else if (box.hasClass("o")){
				// alert("o");
				gameBoard[j] = "o";
			} else {
				// alert("No class");
				gameBoard[j] = " ";
			}
		};

		// 2.) check for any winning combinations
	 	// winning combinations
		var winningCombinations =[
		["0", "1", "2"],
		["3", "4", "5"],
		["6", "7", "8"],
		["0", "3", "6"],
		["1", "4", "7"],
		["2", "5", "8"],
		["0", "4", "8"],
		["2", "4", "6"]
		];

		var winner;
		for (var i=0; i < winningCombinations.length; i++){
			var pt1 = gameBoard[winningCombinations[i][0]];
			var pt2 = gameBoard[winningCombinations[i][1]];
			var pt3 = gameBoard[winningCombinations[i][2]];
			// alert("Here are the three points: " + pt1 + ", " + pt2 + ", " + pt3);
			var result = checkCombinations(pt1, pt2, pt3);
			if (result == "x"){
				winner = "x";
			} else if (result == 'o'){
				winner = 'o';
			} 
		};

		if (winner != undefined){
			alert("The winner is: " + winner);
		}


		};


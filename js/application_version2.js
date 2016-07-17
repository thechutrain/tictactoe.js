$(document).ready(function(){
	// // event listener for the new_button clicked!
	$("#new_game").on("click", model.newGame);

	// // event listener for when any of the boxes are clicked!
	// $(".box").on("click", changeBackground);

	// $(".header").on("click", gameOver);

	// TESTING
	view.display_x('box0');
	view.display_o('box1');
	// view.clear_x_o();
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
		// first remove the inner element that hosts png image
		$(".x").children().remove();
		$(".o").children().remove();
		// remove the outer box's class of x or o
		$(".box").removeClass("x o");
	},

}

//////// Model //////// 
var model = {
	// MODEL - Properties
	gameNumber: 0,
	whoseTurn: 0,
	// gameBoard: new Array(9),
	gameBoard: [
	'x','x','o',
	'', '', '',
	'', '', ''],
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

	// MODEL - Methods
	newGame: function(){
		// clear the x & o classes
		view.clear_x_o();
		// reset variables
		model.winner = undefined;
		model.gameBoard = new Array(9);
		model.whoseTurn = 1;
		// display to the user, that theres been a new game
		view.displayMessage("You just started a new game!");
	},

	// this function checks if the game has a winner
	gameWinner: function(){
		// Use a function to check if game has a winning combination
		var checkCombinations = function(point1, point2, point3) {
			// var to contain winner, if no winner -1 is returned
			var winner;
			if (point1 == point2 && point1 == point3 && point1!="" && point1!=undefined){
				winner = point1;
			} else{
				winner = "-1";
			}
			return winner;
		};

		// loop through all the winning combinations to see if winner
		var winner;
		for (var i=0; i < model.winningCombinations.length; i++){
			var pt1 = model.gameBoard[model.winningCombinations[i][0]];
			var pt2 = model.gameBoard[model.winningCombinations[i][1]];
			var pt3 = model.gameBoard[model.winningCombinations[i][2]];
			// alert("Here are the three points: " + pt1 + ", " + pt2 + ", " + pt3);
			var result = checkCombinations(pt1, pt2, pt3);
			if (result == "x"){
				winner = "x";
			} else if (result == 'o'){
				winner = 'o';
			} else{
				winner = -1;
			}
		};
		model.winner = winner;
		return winner;
	},

	// next function here
}

//////// Controller //////// 
var controller = {
	//CONTROLLER - properties

	// CONTROLLER - methods
	
}



$(document).ready(function(){
	controller.initialize_game();
	// TESTING
	// view.display_x('box0');
	// view.display_o('box1');
	// view.clear_x_o();
	view.displayMessage("tap tap tap, is this thing working?");
	// alert(model.winningCombinations);

	// controller.box_eventListener();

})

//////// Views //////// 
var view = {
	// VIEWS - properties

	//VIEWS - methods
	display_x: function(box_id){
		var box_id = $("#" + box_id.toString());
		box_id.addClass("x");
		var x = $('<div class="box_x"></div>');
		box_id.prepend(x);
		// Control for double selecting a box here or at controller?
		// if (box_id.hasClass("x") || box_id.hasClass('o')){
		// 	// alert("yes");
		// }
	},

	display_o: function(box_id){
		var box_id = $("#" + box_id.toString());
		box_id.addClass("o");
		var o = $('<div class="box_o"></div>');
		box_id.prepend(o);
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
	gameBoard: new Array(9),
	freeze_game: false,
	// gameBoard: [
	// 'x','x','o',
	// '', '', '',
	// '', '', ''],
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
		model.freeze_game = false;
		// display to the user, that theres been a new game
		view.displayMessage("You just started a new game!");
		controller.initialize_game();
	},

	gameOver: function(){
		// this function checks if the game is over
		var gameOver = true;
		for (var i = 0; i < model.gameBoard.length; i++) {
			if (typeof(model.gameBoard[i])=='undefined'){
				gameOver = false;
			}
		};
		return gameOver;
	},

	// this function checks if the game has a winner
	gameWinner: function(){
		// Use a function to check if game has a winning combination
		var checkCombinations = function(point1, point2, point3) {
			// var to contain winner, if no winner -1 is returned
			var winner;
			if (point1 == point2 && point1 == point3 && point1!="" && point1!=undefined){
				winner = point1;
				// alert(winner);
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
				break;
			} else if (result == 'o'){
				winner = 'o';
				break;
			} else{
				winner = -1;
			}
		};
		model.winner = winner;
		// alert(model.winner);
		return winner;
	},

	// next function here
}

//////// Controller //////// 
var controller = {
	//CONTROLLER - properties

	// CONTROLLER - methods
	initialize_game: function(){
		// TO DO!
		controller.newGame_eventListener();
		controller.box_eventListener();
	},

	box_eventListener: function(){
		$(".box").on("click", function(){
			var box = $(this);
			var box_id = box.attr('id');
			var box_number = parseInt(box_id.slice(3,4));
			// alert(typeof(box_number));
			// check if it has either x or o class already
			if (box.hasClass("x")){
				view.displayMessage("Sorry, but that box has been selected as 'x' already");
				// alert('x');
			} else if (box.hasClass("o")){
				view.displayMessage("Sorry, but that box has been selected as 'o' already");
				// alert('o');
			} else{
				// Add an x or o to the box!
				if (model.whoseTurn){
						view.display_x(box_id.toString());
						model.gameBoard[box_number] = "x";

				}else{
					// else o
						view.display_o(box_id.toString());
						model.gameBoard[box_number] = "o";
				}
				// toggle the turn
				model.whoseTurn = !model.whoseTurn;
			}

		// Check for winner!
		if (model.gameWinner()!="-1"){
			view.displayMessage("Game Over! The winner for this round is: " + model.winner);
			model.freeze_game = true;
		} else if(model.gameOver()){
			// check that its not a draw
			view.displayMessage("This round is a draw.");
		}
		

		}); // closes event listener

		// // freeze the boxes
		// if (freeze){
		// 	alert("freezing! " + freeze);
		// 	$(".box").off();
		// };

		$(".box").on("click", function(){
			if(model.freeze_game){
				// alert("freezing! " + model.freeze);
				$(".box").off();
			}
		})

	},

	newGame_eventListener: function(){
		$("#new_game").on("click", function(){
			model.newGame();
		})
	}
	
}



function new_game(){
	alert("NEW GAME");
}


window.onload = init;
function init(){
	document.getElementById("new_game").onclick = new_game;
	var new_game_button = document.getElementById("new_game");
	new_game_button.addEventListner("click", new_game);
};
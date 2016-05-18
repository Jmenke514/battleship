// initialize ship present variable
var SHIP = 0;
// initialize hit ship variable
var hitShip = 1;
// initialize hit nothing variable
var hitNothing = -1;
// initialize board as empty array
var board = [];
// initialize torpedo counter
var torpedoUse = 0;
// initialize hit counter
var hitCounter = 0;
// check to see if the game is ended
var gameIsNotOver = true;

function placeShip(length, horizontal){
  var location;
  if(horizontal === true){
    do {
      location = Math.floor(Math.random()*99);
    }
    while(
      (board[location] === SHIP) || //new location if on a ship
      ((location%10) > (10-length)) || //new location if on an edge
      checkForShipHorizontal(location, length) //new location if on a ship
    )
    for(var i = 0; i<length; i++){
      board[location + i] = SHIP;
    }
  }
  if(horizontal === false){
    do {
      location = Math.floor(Math.random()*99);
    }
    while(
      (board[location] === SHIP) || //new location if on a ship
      ((location+length*10) > (109)) || //new location if on the bottom edge
      checkForShipVertical(location, length) //new location if on a ship
    )
    for(var i = 0; i<length; i++){
      board[location + i*10] = SHIP;
    }
  }
}

function checkForShipHorizontal(location, length){
  for(var i = 0; i < length; i++){
    if(board[location + i] === SHIP){// verify no ship at location to be placed
      return true;
    }
    if(board[location + i + 10] ===SHIP){// verify no ship above location to be placed
      return true;
    }
    if(board[location + i - 10] ===SHIP){// verify no ship below location to be placed
      return true;
    }
    if(board[location + i - 1] === SHIP){//verify no ship to the left of location to be placed
      return true;
    }
    if(board[location + i + 1] === SHIP){//verify no ship to the right of location to be placed
      return true;
    }
  }
  return false;
}

function checkForShipVertical(location, length){
  for(var i = 0; i < length; i++){
    if(board[location + i*10] === SHIP){// verify no ship at location to be placed
      return true;
    }
    if(board[location + i*10 - 10] ===SHIP){// verify no ship above location to be placed
      return true;
    }
    if(board[location + i*10 + 10] ===SHIP){// verify no ship below location to be placed
      return true;
    }
    if(board[location + i*10 - 1] === SHIP){//verify no ship to the left of location to be placed
      return true;
    }
    if(board[location + i*10 + 1] === SHIP){//verify no ship to the right of location to be placed
      return true;
    }
  }
  return false;
}

function fireTorpedo(cellId){//changes cell color when clicked on
  var cellInt = parseInt(cellId);//change ID string to integer
  if(board[cellInt]!=hitNothing && board[cellInt]!=hitShip && gameIsNotOver) {//only add torpedo if cell is unused

    // update javascript board
    if(board[cellInt]===SHIP){//check for ship presence
      board[cellInt] = hitShip;
      $("#"+cellId).addClass("showShip")//adds showShip if user clicks on a ship
      hitCounter++;//increment ships hit
      $("#hitCounter").text(hitCounter);//update ships hit on html
      if(hitCounter === 15){// check for winner
        $("#gameOver").text("You Win!");
        gameIsNotOver = false;
      }//end winner check
    }//end ship check
    else{
      board[cellInt] = hitNothing;//add torpedoed location to board
    }

    // update HTML board
    $("#"+cellId).addClass("hitByTorpedo")//adds hitByTorpedo class to designated cell
    torpedoUse++; //increment torpedo use
    $("#torpedoUse").text(25 - torpedoUse);//update torpedo use on html

    //check for torpedo use
    if(torpedoUse === 1){//limits number of torpedos
      $("#gameOver").text("Out of Torpedoes")
      gameIsNotOver = false;
      for (var i=0; i<=99; i++) {
        if(board[i]===SHIP) {
          if(i<=9){
            var checkLocation = "0" + i;
          }
          else{
            checkLocation = i;
          }
          $("#" + checkLocation).addClass("showShip")
        }
      }
    }//end torpedo use check

  };//end torpedo check
}//end fire torpedo function

$(document).ready( function() {

  for (var i=0; i<10; i++) { //iterate row creation 10 times
    var newTableRow = $("tbody").append("<tr></tr>");// create table row and designate the row for appending
    for (var j=0; j<10; j++) { //iterate cell creation 10 times
      newTableRow.append('<td id="' + i + j + '">' + i + j + '</td>');// create cell within designated row
    }
  }

  placeShip(5, false);
  placeShip(4, true);
  placeShip(4, false);
  placeShip(3, true);
  placeShip(3, false);
  placeShip(2, true);
  placeShip(2, false);
  placeShip(1, true);

  $("td").on("click", function(){
    fireTorpedo($(this).attr("id"));//calls fireTorpedo function on clicked cell
  });

}); // end ready

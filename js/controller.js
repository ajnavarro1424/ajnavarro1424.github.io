var game1 = game();
var bsName = "BATTLESHIP".split(""); //The nanme of the game, to be used on the border
$(document).ready(function(){
  //buildTable(); //Builds 144 cell table which is the board
  //findShips();


  $("td:not(.border)").on("click", function() {
    $("#torps2").text(game1.spendTorp());
    //if vessel exists on clicked cell, then add .hit class, else do .miss
    if(convertGrid($(this).attr('id'))){ //only working for SHIPs rn
      $(this).text("Hit").addClass("hit");
      $(".border").addClass("borderAn");
      $(".border").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
      function(e) {
        $(".border").removeClass("borderAn")
      });

    }
    else {
      //Adds red .miss class wheneve u click
      $(this).text("Miss").addClass("miss");
    }
    //Disables the cell if it has been clicked already
    $(this).off("click");
    //Call whoWon() every click to see if the game is over
    if(game1.whoWon() == 1){
      //update the gameWon tag if there is winner
      $("#gameWon2").text("You sunk all the ships! Congradulation!");
      //somehow disable gameplay/board
      $("td").off("click");

    }
    else if(game1.whoWon() == 0){
      //update the gameWon tag to show loss
      $("#gameWon2").text("You're out of torpedoes! Game Over!");
      findShips();
      //disable game board
      $("td").off("click");
    }

  })

  $("button").on("click", function() {
    // clearShips();
    // board = [];
    // game1=game();
    location.reload();
  })

});

function buildTable() {
  var currentRow = 0; //variable keeps track of current row
  var bsCounter = 0; //a counter for the bsName array that will incrment throughtout
  for(var i = 0; i <144; i++){ //for loop creates 144 cell table
    if(i%12==0){ // if counter%12 is 0, make a new row
      currentRow = i/12; //update current row
      $("#board").append('<tr id="row' + currentRow + '"></tr>'); //create a new table row with id "row<currentRow>"

    }
     //makes a new table cell with id "index<i>" under "row<currentRow"
    if(i <= 11 || i >= 132){
      if(i!=0 && i!= 11 && i!= 132 && i!=143){ //If position in array is not the edges

        $("#row"+ currentRow).append('<td class="border">' + bsName[bsCounter] +'</td>'); //adds the current position in bsName to the cell, i.e. "B", "A", etc
        if(bsCounter==bsName.length-1){
          bsCounter=0;
        }
        else{
          bsCounter++;
        }
      }
      else {
        $("#row"+ currentRow).append('<td class="border"></td>');
      }

    }
    else if(i%12 == 0 || i%12 == 11) {
      $("#row"+ currentRow).append('<td class="border">'+bsName[bsCounter]+'</td>'); //for each of the board edges that aren't the four cardinal edges, add a letter
      if(i%12 == 11){ //if it's the right-most edge, increment bsCounter
        bsCounter++;
      }
      if(bsCounter==10){ //bsCoutner resets before heading back to the line 51 logic
        bsCounter=0;
      }
    }
    else {
      $("#row"+ currentRow).append('<td id="' + ((i%12)+(currentRow-1)*10) + '"></td>');
    }
  }
}
//Takes the HTML table cell id and converts it into board array index
function convertGrid(strNum){ //takes the id of the cell as a string
  if(strNum==null){}
  else {
    var spl = strNum.split(""); //splits strNum(board index) into an array
    console.log(strNum);
    if(spl.length<2){ //1-9, all of our single digits
      var row = 1;
      var col = parseInt(spl[0]);
    }//converts each cell into an int
    else { //controls everything that contains 2 digits
      if(spl.length==3){ //clean dis up
        var row = 10;
        var col = 10;
      }
      else if(parseInt(spl[1])==0){
        var row = parseInt(spl[0]);
        var col = 10;
      } else {
        var row = parseInt(spl[0])+1;
        var col = parseInt(spl[1]);
      }
    }
    //compares the newly calculated array[row][col] to the existing board to see if
    //there is a vessel that has been hi
    // if(board[row][col]>=1){
    //   $("#ships2").text(game1.decrementVessel());
    //   return true; //meaning hit
    // }
    // else {
    //   return false; //meaning miss
    // }
    //Decrment the health of the vessel, and if the vessel health is 0, call    //decrementVessel() wihtin decrementVesselXP()
    switch (board[row][col]) {
      case 30:
        $("#carrier2").text(game1.decrementVesselXP(board[row][col]));
        return true;
      case 24:
        $("#battleship2").text(game1.decrementVesselXP(board[row][col]));
        return true;
      case 28:
        $("#battleship2").text(game1.decrementVesselXP(board[row][col]));
        return true;
      case 18:
        $("#cruiser2").text(game1.decrementVesselXP(board[row][col]));
        return true;
      case 21:
        $("#cruiser2").text(game1.decrementVesselXP(board[row][col]));
        return true;
      case 12:
        $("#destroyer2").text(game1.decrementVesselXP(board[row][col]));
        return true;
      case 14:
        $("#destroyer2").text(game1.decrementVesselXP(board[row][col]));
        return true;
      case 6:
        $("#submarine2").text(game1.decrementVesselXP(board[row][col]));
        return true;
      default:
        return false;
    }
  }
}
//Takes the board array index and converts it to to the HTML index
//(i-1)*10+i2
function convertBoard(i, i2){
  return ((i-1)*10)+i2;
}

//findships() takes the board array and converts it to the board index.
//It looks for values associated with certain ship types, and Changes their class.
function findShips(){
  board.forEach(function(e, row){
    e.forEach(function(e2, col){
      if(!$("#"+convertBoard(row,col)).hasClass('hit')){
        switch (e2) {
          case 30:
            $("#"+convertBoard(row,col)).addClass("carrier");
            break;
          case 24:
            $("#"+convertBoard(row,col)).addClass("battleship");
            break;
          case 28:
            $("#"+convertBoard(row,col)).addClass("battleship2");
            break;
          case 18:
            $("#"+convertBoard(row,col)).addClass("cruiser");
            break;
          case 21:
            $("#"+convertBoard(row,col)).addClass("cruiser2");
            break;
          case 12:
            $("#"+convertBoard(row,col)).addClass("destroyer");
            break;
          case 14:
            $("#"+convertBoard(row,col)).addClass("destroyer2");
            break;
          case 6:
            $("#"+convertBoard(row,col)).addClass("submarine");
            break;
        }
      }
        console.log("Found ship: ", e2, row, col);
    });
  });
}

//Hard to implement correctly bc we have a bunch of global variables
function clearShips(){
  board.forEach(function(e, row){
    e.forEach(function(e2, col){
      if(!$("#"+convertBoard(row,col)).hasClass('hit')){
        switch (e2) {
          case 30:
            $("#"+convertBoard(row,col)).removeClass("carrier");
            break;
          case 24:
            $("#"+convertBoard(row,col)).removeClass("battleship");
            break;
          case 28:
            $("#"+convertBoard(row,col)).removeClass("battleship2");
            break;
          case 18:
            $("#"+convertBoard(row,col)).removeClass("cruiser");
            break;
          case 21:
            $("#"+convertBoard(row,col)).removeClass("cruiser2");
            break;
          case 12:
            $("#"+convertBoard(row,col)).removeClass("destroyer");
            break;
          case 14:
            $("#"+convertBoard(row,col)).removeClass("destroyer2");
            break;
          case 6:
            $("#"+convertBoard(row,col)).removeClass("submarine");
            break;
        }
        if($("#"+convertBoard(row,col)).hasClass('miss')){
          $("#"+convertBoard(row,col)).removeClass('miss');
        }
      }
      else{
        ("#"+convertBoard(row,col)).removeClass('hit');
      }
        console.log("Found ship: ", e2, row, col);
    });
  });
}

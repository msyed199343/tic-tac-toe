const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', TTT.testCommand);

    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static checkHorizontal(grid){
    let winner
    grid.forEach( i => i.every( i2 => i2 === 'X') ? winner = 'X' : '' )
    grid.forEach (i => i.every( i2 => i2 === 'O') ? winner = 'O' : '')


 return winner == 'X'? 'X'
   : winner == 'O'? 'O'
   : false

  }


  static checkVertical = (grid) =>{
    let winner
    let col = []
      grid.forEach((row, i) => {
        row.forEach((val, j) => {

              col.length !== 3 ? col.push(grid[j][i]) : ""

        })
        col.every(i => i === col[0]) && col[0] === "X" || col[0] === "O" ? winner = col[0] : ""

        col = []
      })



   return winner === 'X' ? 'X'
    : winner === 'O' ? 'O'
    : false
   }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    let horizontalWinner = this.checkHorizontal(grid)
    let verticalWinner = this.checkVertical(grid)

    return horizontalWinner !== false ? horizontalWinner
    : verticalWinner !== false ? verticalWinner
    : false



  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;

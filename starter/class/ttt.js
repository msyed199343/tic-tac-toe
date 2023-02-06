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
    Screen.addCommand('w', 'Up', this.cursor.up.bind(this));
    Screen.addCommand('s', 'Down', this.cursor.down.bind(this));
    Screen.addCommand('a', 'left', this.cursor.left.bind(this));
    Screen.addCommand('d', 'Right', this.cursor.right.bind(this));
    Screen.addCommand('return', 'Place a move', TTT.placeMove.bind(this));

    this.cursor.setBackgroundColor();
    TTT.turnMessage.call(this);
    Screen.printCommands();

  }


  static turnMessage() {
    Screen.setMessage(`It is ${this.playerTurn}'s turn`)
    Screen.render();
  }

  static placeMove() {
    let row = this.cursor.row;
    let col = this.cursor.col;

    if (Screen.grid[row][col] === ' '){
      Screen.setGrid(row, col, this.playerTurn);

      let winner = TTT.checkWin(Screen.grid);

      if (winner) {
        TTT.endGame(winner);
      }

      if (this.playerTurn === 'O') {
        this.playerTurn = 'X'
      } else this.playerTurn = 'O';

      TTT.turnMessage.call(this);
      Screen.printCommands();

  } else {
      Screen.setMessage(`Spot already taken`);
      Screen.render();
      Screen.printCommands();
    }
  }

 static setPlayerTurn(turn) {
    this.playerTurn = turn;
    Screen.setMessage(`Player ${this.playerTurn}'s move.`);
  }


  static checkDiag = (grid) => {
    this.emptyGridCheck === true ?  false : ""

    let winner
    let diagOne = [grid[0][0], grid[1][1], grid[2][2]]
    let diagTwo = [grid[0][2], grid[1][1], grid[2][0]]

    diagOne.every(i => i === diagOne[0])  ? winner = diagOne[0]
    : diagTwo.every(i => i === diagTwo[0]) ? winner = diagTwo[0]:""

        return winner == 'X'? 'X'
          : winner == 'O'? 'O'
          : "T"
  }

  static checkHorizontal(grid){
    this.emptyGridCheck === true ?  false : ""

    let winner
    grid.forEach( i => i.every( i2 => i2 === 'X') ? winner = 'X' : '' )
    grid.forEach (i => i.every( i2 => i2 === 'O') ? winner = 'O' : '')


 return winner == 'X'? 'X'
   : winner == 'O'? 'O'
   : "T"

  }


  static checkVertical = (grid) =>{
    this.emptyGridCheck === true ?  false : ""

    let winner
    let col = []

      grid.forEach((row, i) => {
        row.forEach((val, j) => {

              col.length !== 3 ? col.push(grid[j][i]) : ""

        })
        let same = (num) => (num === col[0] && num === col[1] && num === col[2])

        col.every(same) && (col[0] === "X" || col[0] === "O") ? winner = col[0] : ""


        col = []
      })

   return winner === 'X' ? 'X'
    : winner === 'O' ? 'O'
    : "T"
   }

   static noWinCheck = grid => {
    // should return true if even one element in 2d array is empty (' ')
    let emptySpacesLeft = false

      grid.forEach(row => {
           row.some(i => i  === ' ') === true ? emptySpacesLeft = true : ""
      });

      return emptySpacesLeft
   }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    let horizontalWinner = this.checkHorizontal(grid)
    let verticalWinner = this.checkVertical(grid)
    let diagWinner = this.checkDiag(grid)
    let finishCheck = this.noWinCheck(grid)

    return horizontalWinner !== "T" ? horizontalWinner
    : verticalWinner !== "T" ? verticalWinner
    : diagWinner !== "T" ? diagWinner
    : this.emptyGridCheck === true ? false
    : (horizontalWinner && verticalWinner && diagWinner) === "T" && finishCheck !== true ? "T"
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

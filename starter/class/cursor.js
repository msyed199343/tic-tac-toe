const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {
    // Move cursor up
    this.row !== 0 ? this.row-- : ""
  }

  down(){

    this.row !== 2 ? this.row++ : ""

  }

  left() {
    // Move cursor left
    this.col !== 0 ? this.col-- : ""
  }

  right() {
    // Move cursor right
    this.col !== 2 ? this.col++ : ""
  }

}

// [0: [0, 1, 2]
//  1: [0, 1, 2]
//  2: [0, 1, 2]
// ]

module.exports = Cursor;

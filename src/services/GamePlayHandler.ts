import { ICell } from "../interfaces/Matrix";

export default class GamePlayHandler {
  amountOfCells: number = 0;

  calculateWinner(
    matrix: Array<Array<ICell>>,
    isFirstPlayer: boolean,
    hPointer: number,
    vPointer: number
  ): boolean {
    return true;
  }

  calculateSequences(
    matrix: Array<Array<ICell>>,
    isFirstPlayer: boolean,
    hPointer: number,
    vPointer: number,
    firstPlayerSequences: any[], //TODO fix any
    secondPlayerSequences: any[] //TODO fix any
  ) {
    let sequenceSet = new Set<string>();
    let firstSequences = firstPlayerSequences;
    let secondSequences = secondPlayerSequences;

    if (isFirstPlayer && firstSequences.length === 0) {
      sequenceSet.add(`${hPointer},${vPointer}`);
      firstSequences.push(sequenceSet);
    } else if (!isFirstPlayer && secondSequences.length === 0) {
      sequenceSet.add(`${hPointer},${vPointer}`);
      secondSequences.push(sequenceSet);
    }

    console.log(32, this.findNearbyCells(matrix, hPointer, vPointer));

    return {
      firstSequences,
      secondSequences
    };
  }

  findNearbyCells(
    matrix: Array<Array<ICell>>,
    hPointer: number,
    vPointer: number
    // isFirstPlayer: boolean
  ) {
    let cellLeft = null;
    let cellRight = null;
    let cellBottom = null;
    let cellTop = null;

    //find nearby cells by horizontal
    if (hPointer <= matrix.length - 1 && hPointer > 0) {
      cellTop = matrix[hPointer - 1][vPointer];
    } else if (hPointer < matrix.length - 1 && hPointer >= 0) {
      cellBottom = matrix[hPointer + 1][vPointer];
    }

    //find nearby cells by vertical
    if (vPointer <= matrix.length - 1 && vPointer > 0) {
      cellLeft = matrix[hPointer][vPointer - 1];
    } else if (vPointer < matrix.length - 1 && vPointer >= 0) {
      cellRight = matrix[hPointer][vPointer + 1];
    }

    return { cellLeft, cellRight, cellBottom, cellTop };
  }

  calculateFinishGame(foundation: number, takenAmount: number): boolean {
    this.amountOfCells = foundation * foundation;
    console.log(15, this.amountOfCells - takenAmount);
    return this.amountOfCells - takenAmount > 0 ? true : false;
  }

  takeCell(
    matrix: Array<Array<ICell>>,
    isFirstPlayer: boolean,
    hPointer: number,
    vPointer: number
  ): Array<Array<ICell>> {
    if (!matrix[hPointer][vPointer].isCellTaken) {
      matrix[hPointer][vPointer].isCellTaken = true;
      matrix[hPointer][vPointer].takenBy = isFirstPlayer ? 1 : 2;
      this.calculateWinner(matrix, isFirstPlayer, hPointer, vPointer);
    }

    return matrix;
  }

  generateMatrix(foundation: number): Array<Array<ICell>> {
    const matrix: Array<Array<ICell>> = [];
    for (var i = 0; i < foundation; i++) {
      matrix.push([]);
      for (var j = 0; j < foundation; j++) {
        const cell = {
          hPointer: i,
          vPointer: j,
          takenBy: 0,
          isCellTaken: false
        };
        matrix[i].push(cell);
      }
    }

    return matrix;
  }
}

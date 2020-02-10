import { ICell } from "../interfaces/Matrix";

export default class GamePlayHandler {
  findWinner() {}

  takeCell(
    matrix: Array<Array<ICell>>,
    isFirstPlayer: boolean,
    hPointer: number,
    vPointer: number
  ): Array<Array<ICell>> {
    if (!matrix[hPointer][vPointer].isCellTaken) {
      matrix[hPointer][vPointer].isCellTaken = true;
      matrix[hPointer][vPointer].takenBy = isFirstPlayer ? 1 : 2;
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

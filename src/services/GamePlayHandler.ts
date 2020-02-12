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
    let firstSequences = firstPlayerSequences;
    let secondSequences = secondPlayerSequences;

    const nearByCells = this.findNearbyCells(matrix, hPointer, vPointer);
    console.log("Nearby cells", nearByCells);
    this.addCellToAccordingSequences(
      isFirstPlayer,
      nearByCells,
      firstSequences,
      secondSequences,
      hPointer,
      vPointer
    );

    return {
      firstSequences,
      secondSequences
    };
  }

  addCellToAccordingSequences(
    isFirstPlayer: boolean,
    nearByCells: any,
    firstSequences: any[],
    secondSequences: any[],
    hPointer: number,
    vPointer: number
  ) {
    let entries: number[] = [];

    let amountEmptyEntries: number = 0;
    for (const item in nearByCells) {
      let temporaryEntries: number[] = [];
      if (nearByCells[item] && isFirstPlayer) {
        temporaryEntries = this.iterateSequence(
          firstSequences,
          `${nearByCells[item].hPointer},${nearByCells[item].vPointer}`
        );

        if (temporaryEntries.length > 0) {
          temporaryEntries.forEach((element: number) => entries.push(element));
        }
      }

      if (nearByCells[item] && !isFirstPlayer) {
        temporaryEntries = this.iterateSequence(
          secondSequences,
          `${nearByCells[item].hPointer},${nearByCells[item].vPointer}`
        );

        if (temporaryEntries.length > 0) {
          temporaryEntries.forEach((element: number) => entries.push(element));
        }
      }
      if (entries.length === 0) {
        amountEmptyEntries++;
      }
    }

    if (amountEmptyEntries === 4) {
      console.log("Is new group", amountEmptyEntries);
      if (isFirstPlayer) {
        firstSequences = this.addNewSequence(
          firstSequences,
          hPointer,
          vPointer
        );
      } else {
        secondSequences = this.addNewSequence(
          secondSequences,
          hPointer,
          vPointer
        );
      }
    } else {
      if (isFirstPlayer) {
        entries.forEach(element => {
          firstSequences[element].add(`${hPointer},${vPointer}`);
        });
      } else {
        entries.forEach(element => {
          secondSequences[element].add(`${hPointer},${vPointer}`);
        });
      }
    }

    // TODO handle situation when nearby cells have a lot of entries in different subsequent
    console.log("INDEX OF SUBSEQUENCE", entries);
    console.log("SEQUENCE 1 ", firstSequences);
    console.log("SEQUENCE 2 ", secondSequences);
  }

  iterateSequence(sequences: any[], cellPointer: string) {
    let indexes: number[] = [];
    sequences.forEach((element, index) => {
      if (element.has(cellPointer)) {
        indexes.push(index);
      }
    });

    return indexes;
  }

  addNewSequence(sequence: any[], hPointer: number, vPointer: number): any[] {
    let sequenceElement = new Set<string>();
    sequenceElement.add(`${hPointer},${vPointer}`);
    sequence.push(sequenceElement);

    return sequence;
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
    }
    if (hPointer < matrix.length - 1 && hPointer >= 0) {
      cellBottom = matrix[hPointer + 1][vPointer];
    }

    //find nearby cells by vertical
    if (vPointer <= matrix.length - 1 && vPointer > 0) {
      cellLeft = matrix[hPointer][vPointer - 1];
    }
    if (vPointer < matrix.length - 1 && vPointer >= 0) {
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

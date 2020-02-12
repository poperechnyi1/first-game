import { ICell } from "../interfaces/Cell";

export default class GamePlayHandler {
  amountOfCells: number = 0;

  calculateWinner(
    firstSequences: any[],
    secondSequences: any[]
  ): { firstLongestGroup: number; secondLongestGroup: number } {
    let firstLongestGroup: number = 0;
    let secondLongestGroup: number = 0;

    firstSequences.forEach(element => {
      if (element.size > firstLongestGroup) {
        firstLongestGroup = element.size;
      }
    });

    secondSequences.forEach(element => {
      if (element.size > secondLongestGroup) {
        secondLongestGroup = element.size;
      }
    });

    return { firstLongestGroup, secondLongestGroup };
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

    let addedToAccordingSequences = this.addCellToAccordingSequences(
      isFirstPlayer,
      nearByCells,
      firstSequences,
      secondSequences,
      hPointer,
      vPointer
    );

    return {
      firstSequences: addedToAccordingSequences.firstSequences,
      secondSequences: addedToAccordingSequences.secondSequences
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
        if (entries.length > 1) {
          firstSequences = this.concatenateSubsequences(
            firstSequences,
            entries
          );
        }
      } else {
        entries.forEach(element => {
          secondSequences[element].add(`${hPointer},${vPointer}`);
        });

        if (entries.length > 1) {
          secondSequences = this.concatenateSubsequences(
            secondSequences,
            entries
          );
        }
      }
    }

    // console.log("INDEX OF SUBSEQUENCE", entries);
    // console.log("SEQUENCE 1 ", firstSequences);
    // console.log("SEQUENCE 2 ", secondSequences);

    return { firstSequences, secondSequences };
  }

  concatenateSubsequences(sequence: any[], entries: number[]): any[] {
    let temporarySet = new Set();
    let newSequences = [];

    //concat  subsequences with crossing cells in one
    entries.forEach((element: number) => {
      let subSequence = sequence[element];
      for (const item of subSequence) {
        temporarySet.add(item);
      }
    });

    newSequences.push(temporarySet);
    //add other subsequence to array
    sequence.forEach((element: any, index: number) => {
      if (entries.indexOf(index) === -1) {
        newSequences.push(element);
      }
    });

    return newSequences;
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
      // this.calculateWinner(matrix, isFirstPlayer, hPointer, vPointer);
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

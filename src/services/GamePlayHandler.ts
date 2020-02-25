import { Cell } from "../types/Cell";
import {
  ILengthsOfGroups,
  ISequencesForPlayers,
  INearByCells
} from "../types/GamePlayHandler";

export default class GamePlayHandler {
  amountOfCells: number = 0;

  calculateWinner(
    firstSequences: Array<Set<string>>,
    secondSequences: Array<Set<string>>
  ): ILengthsOfGroups {
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
    matrix: Array<Array<Cell>>,
    isFirstPlayer: boolean,
    hPointer: number,
    vPointer: number,
    firstPlayerSequences: Array<Set<string>>,
    secondPlayerSequences: Array<Set<string>>
  ): ISequencesForPlayers {
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
    nearByCells: any, //TODO fix any
    firstSequences: Array<Set<string>>,
    secondSequences: Array<Set<string>>,
    hPointer: number,
    vPointer: number
  ): ISequencesForPlayers {
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

    return { firstSequences, secondSequences };
  }

  //TODO remove any
  concatenateSubsequences(
    sequence: Array<Set<string>>,
    entries: number[]
  ): Array<Set<string>> {
    let temporarySet = new Set<string>();
    let newSequences = [];

    //concat  subsequences with crossing cells in one
    entries.forEach((element: number) => {
      let subSequence: Set<string> = sequence[element];
      subSequence.forEach(item => {
        temporarySet.add(item);
      });
    });

    newSequences.push(temporarySet);
    //add other subsequence to array
    sequence.forEach((element: Set<string>, index: number) => {
      if (entries.indexOf(index) === -1) {
        newSequences.push(element);
      }
    });

    return newSequences;
  }

  iterateSequence(
    sequences: Array<Set<string>>,
    cellPointer: string
  ): number[] {
    let indexes: number[] = [];
    sequences.forEach((element, index) => {
      if (element.has(cellPointer)) {
        indexes.push(index);
      }
    });

    return indexes;
  }

  addNewSequence(
    sequence: any[],
    hPointer: number,
    vPointer: number
  ): Array<Set<string>> {
    let sequenceElement = new Set<string>();
    sequenceElement.add(`${hPointer},${vPointer}`);
    sequence.push(sequenceElement);

    return sequence;
  }

  findNearbyCells(
    matrix: Array<Array<Cell>>,
    hPointer: number,
    vPointer: number
  ): INearByCells {
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
    matrix: Array<Array<Cell>>,
    isFirstPlayer: boolean,
    hPointer: number,
    vPointer: number
  ): Array<Array<Cell>> {
    if (!matrix[hPointer][vPointer].isCellTaken) {
      matrix[hPointer][vPointer].isCellTaken = true;
      matrix[hPointer][vPointer].takenBy = isFirstPlayer ? 1 : 2;
    }

    return matrix;
  }

  generateMatrix(foundation: number): Array<Array<Cell>> {
    const matrix: Array<Array<Cell>> = [];
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

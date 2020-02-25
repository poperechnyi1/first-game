import { Cell } from "./Cell";

export interface ILengthsOfGroups {
  firstLongestGroup: number;
  secondLongestGroup: number;
}

export interface ISequencesForPlayers {
  firstSequences: Set<string>[];
  secondSequences: Set<string>[];
}

export interface INearByCells {
  cellLeft: Cell | null;
  cellRight: Cell | null;
  cellBottom: Cell | null;
  cellTop: Cell | null;
}

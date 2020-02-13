import { ICell } from "./Cell";

export interface ILengthsOfGroups {
  firstLongestGroup: number;
  secondLongestGroup: number;
}

export interface ISequencesForPlayers {
  firstSequences: Set<string>[];
  secondSequences: Set<string>[];
}

export interface INearByCells {
  cellLeft: ICell | null;
  cellRight: ICell | null;
  cellBottom: ICell | null;
  cellTop: ICell | null;
}

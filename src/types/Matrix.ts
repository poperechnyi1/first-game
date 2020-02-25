import { Cell } from "./Cell";

export interface IMatrix {
  matrix: Array<Array<Cell>>;
  firstPlayerSequences: Array<any>; //TODO fix any
  secondPlayerSequences: Array<any>;
  takenAmountOfCells: number;
  isGameFinished: boolean;
}

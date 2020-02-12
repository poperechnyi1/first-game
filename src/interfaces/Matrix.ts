import { ICell } from "../interfaces/Cell";

export interface IMatrix {
  matrix: Array<Array<ICell>>;
  firstPlayerSequences: Array<any>; //TODO fix any
  secondPlayerSequences: Array<any>;
  takenAmountOfCells: number;
  isGameFinished: boolean;
}

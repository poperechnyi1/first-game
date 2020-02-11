export interface ICell {
  hPointer: number;
  vPointer: number;
  isCellTaken: boolean;
  takenBy: number;
}

export interface IMatrix {
  matrix: Array<Array<ICell>>;
  firstPlayerSequences: Array<any>; //TODO fix any
  secondPlayerSequences: Array<any>;
  takenAmountOfCells: number;
  isGameFinished: boolean;
}

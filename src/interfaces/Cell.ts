export interface ICellProps {
  vPointer: number;
  hPointer: number;
  isFirstPlayerTurn: boolean;
  switchTurn: any;
  matrix: Array<Array<ICell>>;
  foundation: number;
  takenAmountOfCells: number;
  firstPlayerSequences: []; //TODO add types
  secondPlayerSequences: []; //TODO add types
  takeCell: any;
  isGameFinished: boolean;
  gameOver: any;
  fillUpSequences: any;
  setSequencesLength: any;
}

export interface ICell {
  hPointer: number;
  vPointer: number;
  isCellTaken: boolean;
  takenBy: number;
}

export interface ICellState {
  isHovered: boolean;
  buttonClass: string;
  isButtonClicked: boolean;
  playerClicked: number;
}

export type CellProps = {
  vPointer: number;
  hPointer: number;
  isFirstPlayerTurn: boolean;
  switchTurn: any;
  matrix: Array<Array<Cell>>;
  foundation: number;
  takenAmountOfCells: number;
  firstPlayerSequences: []; //TODO add types
  secondPlayerSequences: []; //TODO add types
  takeCell: any;
  isGameFinished: boolean;
  gameOver: any;
  fillUpSequences: any;
  setSequencesLength: any;
};

export type Cell = {
  hPointer: number;
  vPointer: number;
  isCellTaken: boolean;
  takenBy: number;
};

export type CellState = {
  isHovered: boolean;
  buttonClass: string;
  isButtonClicked: boolean;
  playerClicked: number;
};

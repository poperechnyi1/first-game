export interface ITurnState {
  isFirstPlayerTurn: boolean;
}

export interface ITurnStore extends ITurnState {
  switchTurn: any;
}

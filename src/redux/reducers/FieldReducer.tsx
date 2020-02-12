import { IMatrix } from "../../interfaces/Matrix";

const initialState: IMatrix = {
  matrix: [],
  firstPlayerSequences: [], //save a map for every subSequences
  secondPlayerSequences: [],
  takenAmountOfCells: 1,
  isGameFinished: false
};

export default function matrixStore(state = initialState, action: any) {
  switch (action.type) {
    case "GENERATE_FIELD":
      return {
        matrix: action.matrix,
        firstPlayerSequences: state.firstPlayerSequences,
        secondPlayerSequences: state.secondPlayerSequences,
        takenAmountOfCells: state.takenAmountOfCells,
        isGameFinished: state.isGameFinished
      };
    case "TAKE_A_CELL":
      return {
        matrix: action.matrix,
        firstPlayerSequences: state.firstPlayerSequences,
        secondPlayerSequences: state.secondPlayerSequences,
        takenAmountOfCells: state.takenAmountOfCells + 1,
        isGameFinished: state.isGameFinished
      };
    case "FILL_UP_SEQUENCES":
      return {
        matrix: state.matrix,
        firstPlayerSequences: action.firstPlayerSequences,
        secondPlayerSequences: action.secondPlayerSequences,
        takenAmountOfCells: state.takenAmountOfCells,
        isGameFinished: state.isGameFinished
      };
    case "GAME_OVER":
      return {
        isGameFinished: true
      };

    default:
      return state;
  }
}

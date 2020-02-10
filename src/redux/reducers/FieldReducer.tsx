import {IMatrix} from '../../interfaces/Matrix';

const initialState: IMatrix = {
  matrix: []
};

export default function matrixStore(
  state = initialState,
  action: any
) {
  switch (action.type) {
    case "GENERATE_FIELD":
      return {
        matrix: action.matrix
      };
    case "TAKE_A_CELL":
      return {
        matrix: action.matrix
      };

    default:
      return state;
  }
}

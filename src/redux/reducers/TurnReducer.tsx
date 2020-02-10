import { ITurnState } from "../../interfaces/Turn";

const initialState: ITurnState = {
  isFirstPlayerTurn: true
};

export default function turnStore(
  state = initialState,
  action: any
): ITurnState {
  switch (action.type) {
    case "SWITCH_PLAYER_TURN":
      return {
        isFirstPlayerTurn: !state.isFirstPlayerTurn
      };
    default:
      return state;
  }
}

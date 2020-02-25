import { ITurnState } from "../../types/Turn";

const initialState: ITurnState = {
  isFirstPlayerTurn: true
};

export default function turnStore(
  state: ITurnState = initialState,
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

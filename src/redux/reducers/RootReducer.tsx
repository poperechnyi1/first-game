import { combineReducers } from "redux";
import foundationStore from "./FoundationReducer";
import turnStore from "./TurnReducer";
import matrixStore from "./FieldReducer";

export default combineReducers({
  foundationStore,
  turnStore,
  matrixStore
});

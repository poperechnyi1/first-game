import {combineReducers} from 'redux';
import foundationStore from './FoundationReducer';
import turnStore from './TurnReducer';

export default combineReducers({
  foundationStore, turnStore
})
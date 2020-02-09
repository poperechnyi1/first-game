interface ITurnStore {
    isFirstPlayerTurn: boolean;
  }
  
  const initialState:ITurnStore = {
    isFirstPlayerTurn: true,
  }
  
  export default function turnStore(state = initialState, action:any):ITurnStore{
  
      switch(action.type){
          case 'SWITCH_PLAYER_TURN':
              return {
                isFirstPlayerTurn: !state.isFirstPlayerTurn,
              }
          default:
            return state
      }
  }
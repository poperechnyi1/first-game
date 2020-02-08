interface IAppStore {
  foundation: number;
}

const initialState:IAppStore = {
    foundation: 2,
}

export default function foundationStore(state = initialState, action:any):IAppStore{

    switch(action.type){
        case 'SET_FOUNDATION':
            return {
              foundation: action.foundation,
            }
        default:
          return state
    }
}

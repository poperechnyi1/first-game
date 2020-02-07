interface IAppStore {
  foundation: number;
}

const initialState:IAppStore = {
    foundation: 2,
    
}

export default function rootReducer(state = initialState, action:any){

    switch(action.type){
        case 'SET_FOUNDATION':
            return {
              foundation: action.foundation
            }
    }
    return state;
}



function generateField(foundation:number): any[][]{
  let field:any[][] = [];

  for(var i = 0; i <foundation; i++ )
  {
    field.push(new Array(foundation));
  }

  return field;

}
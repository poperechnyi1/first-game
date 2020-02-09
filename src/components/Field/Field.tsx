import React from 'react';
// import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import Cell from '../Cell/Cell';

class Field extends React.Component {

    generateField(){
        let field = [];
        for(var i = 0; i<8;i++){
            let row = [];
            for(var j = 0; j<8; j++){
                row.push(<Cell key={`${i},${j}`}/>)
            }
        field.push(<div className="row">{row}</div>)
        }

        return (
            <div>
                {field}
            </div>
        )
    }

    render(){
        return (
            <div>{this.generateField()}</div>
        );
    }

}


function mapStateToProps(state:any){
    return {
        foundation: state.foundation
    }
}

function mapDispatchToProps(dispatch:any){
    return {
        onSetFoundation:(foundation:number) => dispatch({type:'SET_FOUNDATION', foundation}),
        onGenerateField:() => dispatch({type:'GENERATE_FIELD'})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Field);
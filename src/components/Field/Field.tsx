import React from 'react';
import {connect} from 'react-redux';
import Cell from '../Cell/Cell';

interface IFoundation {
    foundation:number,
    onSetFoundation:any,
    onGenerateField:any,
}

class Field extends React.Component<IFoundation,{}> {

    generateField(){
        let field = [];
        for(var i = 0; i<8;i++){
            let row = [];
            for(var j = 0; j<8; j++){
                row.push(<Cell key={`${i},${j}`}/>)
            }
        field.push(<div className="row" key={i}>{row}</div>)
        }

        return (
            <div>
                {field}
            </div>
        )
    }

    render(){
        console.log('@@@@@@@@@@ ', this.props.foundation)
        return (
            <div>{this.generateField()}</div>
        );
    }

}


function mapStateToProps(state:any){
    return {
        foundation: state.foundationStore.foundation
    }
}

function mapDispatchToProps(dispatch:any){
    return {
        onSetFoundation:(foundation:number) => dispatch({type:'SET_FOUNDATION', foundation}),
        onGenerateField:() => dispatch({type:'GENERATE_FIELD'})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Field);
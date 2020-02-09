import React from 'react';
// import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import Cell from '../Cell/Cell';

class Field extends React.Component {

    render(){
        return (
            <div><Cell/></div>
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
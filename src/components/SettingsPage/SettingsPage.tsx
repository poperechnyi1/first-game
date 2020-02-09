import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import {connect} from 'react-redux';
import { Dispatch } from "redux";
import Field from '../Field/Field';
import {IFoundation} from '../../interfaces/Foundation';


interface ISettingState {
  open: boolean;
  isFiledVisible:boolean;
}

class SettingPage extends React.Component<IFoundation,{}> {

    state: ISettingState = {
        open: false,
        isFiledVisible: false,
    };

    // //TODO fix with type
    //  useStyles:any = makeStyles(theme => ({
    //                button: {
    //                  display: "block",
    //                  marginTop: theme.spacing(2)
    //                },
    //                formControl: {
    //                  margin: theme.spacing(1),
    //                  minWidth: 120
    //                }
    //              }));

    //              classes = this.useStyles();

    setFoundation(value: number): void {
        this.setState(state=> {
          // Important: read `state` instead of `this.state` when updating.
          return { foundation: value };
        });
    }

    setOpen(isOpen: boolean): void {
        this.setState(state => {
          return { open: isOpen };
        });
    }

    //TODO remove any
    handleChange = (event: any) => {
      console.log(58, event.target.value)
      this.props.onSetFoundation(event.target.value)
        this.setFoundation(event.target.value);
    };

    startGame = () =>{
      console.log(67)
      this.setState(state=>{
        return {
          isFiledVisible: true
        }
      })
    }

    handleClose = () => {
        this.setOpen(false);
    };

    handleOpen = () => {
        this.setOpen(true);
    };



    render() {
        console.log('STORE ', this.props)
        return (
        <div>

                {/* //FIX problem with classes */}
                {/* this.classes.formControl */}
                {!this.state.isFiledVisible ? <div>
        <div>
                <FormControl>
                  <InputLabel id="demo-controlled-open-select-label">
                    Generate field
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={this.props.foundation}
                    onChange={this.handleChange}
                  >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                  </Select>
                </FormControl>
            </div>
            <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>this.startGame()}
                >
                  Start Game
                </Button>
            </div>
            </div> : <Field/>}
                
        </div>
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


export default connect(mapStateToProps,mapDispatchToProps)(SettingPage);
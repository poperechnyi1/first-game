import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";


interface ISettingState {
  foundation: number;
  open: boolean;
}

export default class SettingPage extends React.Component {
                 state: ISettingState = {
                   foundation: 0,
                   open: false
                 };

                //  useStyles = makeStyles(theme => ({
                //    button: {
                //      display: "block",
                //      marginTop: theme.spacing(2)
                //    },
                //    formControl: {
                //      margin: theme.spacing(1),
                //      minWidth: 120
                //    }
                //  }));

                //  classes = this.useStyles();

                 setFoundation(value: number): void {
                   this.setState(state => {
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
                   this.setFoundation(event.target.value);
                 };

                 handleClose = () => {
                   this.setOpen(false);
                 };

                 handleOpen = () => {
                   this.setOpen(true);
                 };

                 handleStart = () => {
                   console.log(this.state.foundation);
                 };

                 render() {
                   return (
                     <div>
                       <div>

                         {/* //FIX problem with classes */}
                         {/* this.classes.formControl */}
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
                             value={this.state.foundation}
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
                           onClick={this.handleStart}
                         >
                           Start Game
                         </Button>
                       </div>
                     </div>
                   );
                 }
               }

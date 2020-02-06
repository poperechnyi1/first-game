import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function SettingPage (){

     const classes = useStyles();
     const [foundation, setFoundation] = React.useState(2);
     const [open, setOpen] = React.useState(false);

     //TODO remove any
     const handleChange = (event: any) => {
        setFoundation(event.target.value);
     };

     const handleClose = () => {
       setOpen(false);
     };

     const handleOpen = () => {
       setOpen(true);
     };

     const handleStart = () => {
         console.log(foundation);
     }

    return (
      <div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              Generate field
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={foundation}
              onChange={handleChange}
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
          <Button variant="contained" color="primary" onClick={handleStart}>
            Start Game
          </Button>
        </div>
      </div>
    );
}

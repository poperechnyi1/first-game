import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Field from "../Field/Field";
import { IFoundation } from "../../interfaces/Foundation";
import InformationTable from "../InformationTable/InformationTable";
import GamePlayHandler from "../../services/GamePlayHandler";
import { ICell } from "../../interfaces/Cell";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions
} from "@material-ui/core";

interface ISettingState {
  open: boolean;
  isFiledVisible: boolean;
  isFinishDialogVisible: boolean;
}

class SettingPage extends React.Component<IFoundation, {}> {
  state: ISettingState = {
    open: false,
    isFiledVisible: false,
    isFinishDialogVisible: true
  };

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
    this.props.onSetFoundation(event.target.value);
    this.setFoundation(event.target.value);
  };

  startGame = () => {
    const GamePlayInstance = new GamePlayHandler();
    const matrix = GamePlayInstance.generateMatrix(this.props.foundation);
    this.props.onGenerateField(matrix);
    this.setState(state => {
      return {
        isFiledVisible: true
      };
    });
  };

  handleClose = () => {
    this.setOpen(false);
  };

  handleOpen = () => {
    this.setOpen(true);
  };

  handleCloseDialog = () => {
    this.setState(state => {
      return { isFinishDialogVisible: false };
    });
    window.location.reload();
  };

  render() {
    return (
      <div>
        {!this.state.isFiledVisible ? (
          <div>
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
                onClick={() => this.startGame()}
              >
                Start Game
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Field />
            <InformationTable />
          </div>
        )}

        {this.props.isGameFinished ? (
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            onClose={() => this.handleCloseDialog()}
            aria-labelledby="customized-dialog-title"
            open={this.state.isFinishDialogVisible}
          >
            <DialogTitle id="customized-dialog-title">
              <b>Game over</b>
            </DialogTitle>
            <DialogContent dividers>
              {this.props.firstPlayerSequencesLength >
              this.props.secondPlayerSequencesLength ? (
                <Typography gutterBottom>
                  <b>The First Player</b> is a winner. Please take our
                  congratulations.
                  <br></br>
                  Points of the <b>First Player</b>:
                  <b>{this.props.firstPlayerSequencesLength}</b>
                  <br></br>
                  Points of the <b>Second Player</b>:
                  <b>{this.props.secondPlayerSequencesLength}</b>
                </Typography>
              ) : null}
              {this.props.firstPlayerSequencesLength <
              this.props.secondPlayerSequencesLength ? (
                <Typography gutterBottom>
                  <b>The Second Player</b> is a winner. Please take our
                  congratulations.
                  <br></br>
                  Points of the <b>First Player</b>:
                  <b>{this.props.firstPlayerSequencesLength}</b>
                  <br></br>
                  Points of the <b>Second Player</b>:
                  <b>{this.props.secondPlayerSequencesLength}</b>
                </Typography>
              ) : null}

              {this.props.firstPlayerSequencesLength ===
              this.props.secondPlayerSequencesLength ? (
                <Typography gutterBottom>
                  <b>The First Player</b> and <b>The Second Player</b> are
                  winners. Please take our congratulations.
                  <br></br>
                  Points of the <b>First Player</b>:
                  <b>{this.props.firstPlayerSequencesLength}</b>
                  <br></br>
                  Points of the <b>Second Player</b>:
                  <b>{this.props.secondPlayerSequencesLength}</b>
                </Typography>
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={() => this.handleCloseDialog()}
                color="primary"
              >
                <b>Play again</b>
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    foundation: state.foundationStore.foundation,
    matrix: state.matrixStore.matrix,
    isGameFinished: state.matrixStore.isGameFinished,
    firstPlayerSequencesLength: state.sequenceStore.firstPlayerSequencesLength,
    secondPlayerSequencesLength: state.sequenceStore.secondPlayerSequencesLength
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onSetFoundation: (foundation: number) =>
      dispatch({ type: "SET_FOUNDATION", foundation }),
    onGenerateField: (matrix: ICell) =>
      dispatch({ type: "GENERATE_FIELD", matrix })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);

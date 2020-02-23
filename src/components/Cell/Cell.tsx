import React from "react";
import Button from "@material-ui/core/Button";
import "./Cell.css";
import { connect } from "react-redux";
import GamePlayHandler from "../../services/GamePlayHandler";
import { CellProps, CellState } from "../../interfaces/Cell";

class Cell extends React.Component<CellProps, CellState> {
  constructor(props: CellProps) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  state = {
    isHovered: false,
    buttonClass: "",
    isButtonClicked: false,
    playerClicked: 0
  };

  handleMouseEnter(): void {
    if (!this.state.isButtonClicked) {
      this.setState(state => {
        return {
          isHovered: true,
          buttonClass: this.props.isFirstPlayerTurn
            ? "firstPlayer"
            : "secondPlayer"
        };
      });
    }
  }

  handleMouseLeave(): void {
    if (!this.state.isButtonClicked) {
      this.setState(state => {
        return { isHovered: false, buttonClass: "" };
      });
    }
  }

  handleClick(): void {
    const GamePlayInstance = new GamePlayHandler();

    if (!this.props.isGameFinished) {
      const updatedMatrix = GamePlayInstance.takeCell(
        this.props.matrix,
        this.props.isFirstPlayerTurn,
        this.props.hPointer,
        this.props.vPointer
      );

      if (!this.state.isButtonClicked) {
        this.props.takeCell({
          matrix: updatedMatrix
        });

        const sequences = GamePlayInstance.calculateSequences(
          this.props.matrix,
          this.props.isFirstPlayerTurn,
          this.props.hPointer,
          this.props.vPointer,
          this.props.firstPlayerSequences,
          this.props.secondPlayerSequences
        );

        this.props.fillUpSequences(
          sequences.firstSequences,
          sequences.secondSequences
        );

        this.setState(state => {
          return {
            isButtonClicked: true
          };
        });

        const sequencesLengths = GamePlayInstance.calculateWinner(
          sequences.firstSequences,
          sequences.secondSequences
        );
        this.props.setSequencesLength(
          sequencesLengths.firstLongestGroup,
          sequencesLengths.secondLongestGroup
        );
        this.props.switchTurn();

        if (
          !GamePlayInstance.calculateFinishGame(
            this.props.foundation,
            this.props.takenAmountOfCells
          )
        ) {
          this.props.gameOver();
        }
      }
    } else {
      this.props.gameOver();
    }
  }

  render() {
    return (
      <div className="Cell">
        <Button
          className={this.state.buttonClass}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
        ></Button>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    isFirstPlayerTurn: state.turnStore.isFirstPlayerTurn,
    matrix: state.matrixStore.matrix,
    foundation: state.foundationStore.foundation,
    takenAmountOfCells: state.matrixStore.takenAmountOfCells,
    firstPlayerSequences: state.matrixStore.firstPlayerSequences,
    secondPlayerSequences: state.matrixStore.secondPlayerSequences,
    isGameFinished: state.matrixStore.isGameFinished
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    switchTurn: () => dispatch({ type: "SWITCH_PLAYER_TURN" }),
    //TODO remove any
    takeCell: (actionObj: any) =>
      dispatch({
        type: "TAKE_A_CELL",
        matrix: actionObj.matrix
        // firstPlayerSequences: actionObj.firstPlayerSequences,
        // secondPlayerSequences: actionObj.secondPlayerSequences
      }),
    gameOver: () => dispatch({ type: "GAME_OVER" }),
    fillUpSequences: (firstPlayerSequences: [], secondPlayerSequences: []) =>
      dispatch({
        type: "FILL_UP_SEQUENCES",
        firstPlayerSequences,
        secondPlayerSequences
      }),
    setSequencesLength: (
      firstPlayerSequencesLength: number,
      secondPlayerSequencesLength: number
    ) =>
      dispatch({
        type: "UPDATE_SEQUENCES",
        firstPlayerSequencesLength,
        secondPlayerSequencesLength
      })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);

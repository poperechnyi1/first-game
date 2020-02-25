import React from "react";
import { connect } from "react-redux";
import { InformationTableProps } from "../../types/InformationTable";

class InformationTable extends React.Component<InformationTableProps, {}> {
  render() {
    return (
      <div>
        <div>Turn: {this.props.isFirstPlayerTurn ? "Player1" : "Player2"}</div>
        <div>Player1: {this.props.firstPlayerSequencesLength}</div>
        <div>Player2: {this.props.secondPlayerSequencesLength}</div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    isFirstPlayerTurn: state.turnStore.isFirstPlayerTurn,
    isGameFinished: state.matrixStore.isGameFinished,
    firstPlayerSequencesLength: state.sequenceStore.firstPlayerSequencesLength,
    secondPlayerSequencesLength: state.sequenceStore.secondPlayerSequencesLength
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    switchTurn: () => dispatch({ type: "SWITCH_PLAYER_TURN" })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InformationTable);

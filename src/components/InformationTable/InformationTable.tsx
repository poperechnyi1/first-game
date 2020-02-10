import React from "react";
import { connect } from "react-redux";

class InformationTable extends React.Component<
  {
    isFirstPlayerTurn: boolean;
  },
  {}
> {
  render() {
    return (
      <div>
        <div>Turn: {this.props.isFirstPlayerTurn ? "Player1" : "Player2"}</div>
        <div>Player1: NaN</div>
        <div>Player2: NaN</div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    isFirstPlayerTurn: state.turnStore.isFirstPlayerTurn
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    switchTurn: () => dispatch({ type: "SWITCH_PLAYER_TURN" })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InformationTable);

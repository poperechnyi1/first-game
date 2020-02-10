import React from "react";
import Button from "@material-ui/core/Button";
import "./Cell.css";
import { connect } from "react-redux";
import { ITurnStore } from "../../interfaces/Turn";

class Cell extends React.Component<
  ITurnStore,
  {
    isHovered: boolean;
    buttonClass: string;
    isButtonClicked: boolean;
    playerClicked: number;
  }
> {
  constructor(props: ITurnStore) {
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
    console.log("CLICK");
    if (!this.state.isButtonClicked) {
        this.setState(state=>{
            return {
              isButtonClicked:true,
            };
        })
        this.props.switchTurn();
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
    isFirstPlayerTurn: state.turnStore.isFirstPlayerTurn
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    switchTurn: () => dispatch({ type: "SWITCH_PLAYER_TURN" })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);

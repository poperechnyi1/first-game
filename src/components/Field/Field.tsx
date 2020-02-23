import React from "react";
import { connect } from "react-redux";
import Cell from "../Cell/Cell";
import "./Field.css";
import { FieldProps } from "../../interfaces/Field";

class Field extends React.Component<FieldProps, {}> {
  generateField() {
    let field = [];
    for (var i = 0; i < this.props.foundation; i++) {
      let row = [];
      for (var j = 0; j < this.props.foundation; j++) {
        row.push(<Cell key={`${i},${j}`} hPointer={i} vPointer={j} />);
      }
      field.push(
        <div className="row" key={i}>
          {row}
        </div>
      );
    }

    return <div>{field}</div>;
  }

  render() {
    return <div className="Field">{this.generateField()}</div>;
  }
}

function mapStateToProps(state: any) {
  return {
    foundation: state.foundationStore.foundation,
    matrix: state.matrixStore.matrix
  };
}

export default connect(mapStateToProps)(Field);

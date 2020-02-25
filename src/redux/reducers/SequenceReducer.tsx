type SequenceState = {
  firstPlayerSequencesLength: number;
  secondPlayerSequencesLength: number;
};

const initialState = {
  firstPlayerSequencesLength: 0,
  secondPlayerSequencesLength: 0
};

export default function sequenceStore(
  state: SequenceState = initialState,
  action: any
) {
  switch (action.type) {
    case "UPDATE_SEQUENCES":
      return {
        firstPlayerSequencesLength: action.firstPlayerSequencesLength,
        secondPlayerSequencesLength: action.secondPlayerSequencesLength
      };

    default:
      return state;
  }
}

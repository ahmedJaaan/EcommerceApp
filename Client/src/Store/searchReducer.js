export function searchReducer(state = { text: "" }, action) {
  switch (action.type) {
    case "SEARCH":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

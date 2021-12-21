const reducer = (state = [], actions) => {
  switch (actions.type) {
    case "GETEVENTS":
      return [...actions.data];
    default:
      return [...state];
  }
};

export default reducer;

const reducer = (state = [], actions) => {
  switch (actions.type) {
    case "GETBLOGS":
      return [...actions.data];
    default:
      return [...state];
  }
};

export default reducer;

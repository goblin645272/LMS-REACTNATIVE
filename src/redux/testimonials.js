const reducer = (state = [], actions) => {
  switch (actions.type) {
    case "GETTESTIMONIALS":
      return [...actions.data];
    default:
      return [...state];
  }
};

export default reducer;

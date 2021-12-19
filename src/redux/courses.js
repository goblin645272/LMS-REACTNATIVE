const reducer = (state = [], actions) => {
  switch (actions.type) {
    case "GETCOURSES":
      return [...actions.data];
    default:
      return [...state];
  }
};

export default reducer;

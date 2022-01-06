const reducer = (
  state = {
    downloadStatusArray: [],
    unregister: [],
  },
  actions
) => {
  switch (actions.type) {
    case "UPDATE_VIDEO":
      return { ...state, downloadStatusArray: actions.data };
    case "UPDATE_UNREGEISTER":
      return { ...state, unregister: actions.data };
    case "UPDATE_ALL":
      return { ...actions.data };
    default:
      return { ...state };
  }
};

export default reducer;

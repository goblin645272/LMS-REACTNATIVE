const reducer = (state = { profile: {}, token: null }, actions) => {
  switch (actions.type) {
    case "LOGIN":
      return { profile: { ...actions.data.result }, token: actions.data.token };

    case "GETPROFILE":
      return { ...state, profile: actions.data };
    case "SETTOKEN":
      return { ...state, token: actions.data };
    case "LOGOUT":
      return { profile: {}, token: null };
    default:
      return { ...state };
  }
};

export default reducer;

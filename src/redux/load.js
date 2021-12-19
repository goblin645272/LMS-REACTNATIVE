const load = (state = false, actions) => {
  switch (actions.type) {
    case "LOAD":
      return true;
    case "UNLOAD":
      return false;
    default:
      return false;
  }
};

export default load;

import { Dimensions } from "react-native";
const deviceWindow = Dimensions.get("window");
const css = {
  scroll: {
    width: deviceWindow.width,
    height: deviceWindow.height,
  },
  banner: {
    width: deviceWindow.width,
    height: deviceWindow.height * 0.3,
  },
  input: {
    marginLeft: deviceWindow.width * 0.04,
    backgroundColor: "#CCD3DF",
    borderRadius: 10,
    marginTop: deviceWindow.height * 0.02,
    marginBottom: deviceWindow.height * 0.02,

    width: deviceWindow.width * 0.7,
    paddingLeft: 10,
  },
};

export default css;

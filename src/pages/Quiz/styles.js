import { Dimensions } from "react-native";
const deviceWindow = Dimensions.get("window");
const css = {
  body: {
    backgroundColor: "#BEE6F7",
    paddingRight: deviceWindow.width * 0.02,
    paddingLeft: deviceWindow.width * 0.02,
  },
  text: {
    fontSize: deviceWindow.height * 0.04,
    fontFamily: "Barlow_600SemiBold",
    marginTop: deviceWindow.height * 0.04,
    color: "#022493",
  },
  question: {
    fontSize: deviceWindow.height * 0.025,
    fontFamily: "Barlow_500Medium",
    marginTop: deviceWindow.height * 0.02,
    color: "#022493",
  },
};

export default css;

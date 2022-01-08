import { Dimensions } from "react-native";
const deviceWindow = Dimensions.get("window");
const css = {
  scroll: {
    width: deviceWindow.width,
    // height: deviceWindow.height,
  },
  background: {
    width: deviceWindow.width,
    height: deviceWindow.height,
    flex: 1,
  },
  header: {
    marginTop: deviceWindow.height * 0.1,
    color: "#022460",
    fontSize: deviceWindow.height * 0.05,
    fontFamily: "Barlow_500Medium",
    textAlign: "center",
    marginBottom: deviceWindow.height * 0.01,
  },
  input: {
    width: deviceWindow.width * 0.9,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3F51B5",
  },
  button: {
    width: deviceWindow.width / 2,
    backgroundColor: "#022460",
  },
  button_text: {
    color: "#FFC00C",
    fontSize: deviceWindow.height * 0.025,
    fontFamily: "Barlow_400Regular",
  },
};

export default css;

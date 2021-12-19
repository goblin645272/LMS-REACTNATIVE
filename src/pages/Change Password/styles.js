import { Dimensions } from "react-native";
const deviceWindow = Dimensions.get("window");
const css = {
  scroll: {
    width: deviceWindow.width,
    height: deviceWindow.height,
  },
  background: {
    width: deviceWindow.width,
    height: deviceWindow.height,
  },
  header: {
    marginTop: deviceWindow.height * 0.1,
    color: "#022460",
    fontSize: deviceWindow.height * 0.05,
    fontFamily: "Barlow_500Medium",
    textAlign: "center",
    marginBottom: deviceWindow.height * 0.01,
  },
  label: {
    textAlign: "left",
    fontSize: deviceWindow.height * 0.02,
    marginTop: deviceWindow.height * 0.01,
    color: "#022460",
  },
  input: {
    marginBottom: deviceWindow.height * 0.01,
    width: deviceWindow.width * 0.8,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3F51B5",
  },
  button: {
    marginTop: deviceWindow.height * 0.01,
    width: deviceWindow.width / 2,
    backgroundColor: "#022460",
  },
  buttonText: {
    color: "#FFC00C",
    fontSize: deviceWindow.height * 0.025,
    fontFamily: "Barlow_400Regular",
  },
};

export default css;

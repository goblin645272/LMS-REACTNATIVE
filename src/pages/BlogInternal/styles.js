import { Dimensions } from "react-native";
const deviceWindow = Dimensions.get("window");
const css = {
  scroll: {
    width: deviceWindow.width,
    height: deviceWindow.height,
  },
  background: {
    width: deviceWindow.width,
    minHeight: deviceWindow.height,
    flex: 1,
  },
  hstack: {
    flex: 1,
    width: deviceWindow.width * 0.85,
    alignItems: "center",
  },
  touchable: {
    flex: 1,
    width: deviceWindow.width * 0.85,
    marginTop: deviceWindow.height * 0.025,
    alignItems: "center",
    marginBottom: 0,
    padding: 0,
  },
  Vstack: {
    width: deviceWindow.width,
    minHeight: deviceWindow.height,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  banner: {
    width: deviceWindow.height * 0.9,
    minHeight: deviceWindow.height * 0.25,
  },
  header: {
    // marginTop: deviceWindow.height * 0.1,
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
  span: {
    width: deviceWindow.width * 0.85,
    backgroundColor: "transparent",
    color: "rgb(2,36,96)",
    textAlign: "justify",
    borderColor: "#3F51B5",
  },
  head: {
    fontSize: deviceWindow.width * 0.08,
    fontFamily: "Barlow_500Medium",
    color: "rgb(2,36,96)",
    // margin: 15,
  },
  body: {
    fontSize: deviceWindow.width * 0.05,
    fontFamily: "Barlow_400Regular",
    color: "rgb(2,36,96)",
    textAlign: "left",
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 0,
  },
};

export default css;

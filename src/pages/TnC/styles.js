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
  Vstack: {
    width: deviceWindow.width,
    minHeight: deviceWindow.height,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
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
  head: {
    fontSize: deviceWindow.width * 0.06,
    fontFamily: "Barlow_500Medium",
    color: "rgb(2,36,96)",
    margin: 15,
  },
  body: {
    fontSize: deviceWindow.width * 0.045,
    fontFamily: "Barlow_400Regular",
    color: "rgb(2,36,96)",
    textAlign: "justify",
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 0,
  },
};

export default css;

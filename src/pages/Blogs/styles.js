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
    marginBottom: deviceWindow.height * 0.01,
  },
  head: {
    fontSize: deviceWindow.width * 0.06,
    fontFamily: "Barlow_600SemiBold",
    color: "rgb(2,36,96)",
    // margin: 1,
  },
  body: {
    fontSize: deviceWindow.width * 0.05,
    fontFamily: "Barlow_400Regular",
    color: "rgb(2,36,96)",
    // margin: 15,
  },
  touchable: {
    backgroundColor: "#BEE6f7",
    borderWidth: 1,
    borderColor: "rgba(2,36,96, 0.2)",
    paddingLeft: 12,
    paddingTop: 18,
    paddingBottom: 18,
    borderRadius: 15,
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

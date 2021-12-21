import { Dimensions } from "react-native";
const deviceWindow = Dimensions.get("window");
const css = {
  body: {
    backgroundColor: "#BEE6F7",
    padding: deviceWindow.height * 0.015,
  },
  headerText: {
    color: "#022460",
    fontSize: deviceWindow.height * 0.03,
    fontFamily: "Barlow_600SemiBold",
  },
  smallText: {
    color: "black",
    fontSize: deviceWindow.height * 0.02,
    fontFamily: "Barlow_500Medium",
  },
  inputBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginBottom: deviceWindow.height * 0.015,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#3F51B5",
    width: "70%",
  },
  button: {
    backgroundColor: "#677CA0",
    width: "70%",
  },
  couponBox: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  couponInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#3F51B5",
    width: deviceWindow.width * 0.5,
  },
  couponButton: {
    width: deviceWindow.width * 0.3,
    height: "100%",
    backgroundColor: "#F3C10C",
    padding: 0,
  },
};

export default css;

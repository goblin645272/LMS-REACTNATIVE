import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
const css = {
  scroll: {
    flex: 1,
    width: width,
    height: height * 1.1,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  background: {
    alignItems: "center",
    backgroundColor: "#BEE6F7",
    borderRadius: 10,
    padding: 10,
    height: height * 1.1,
  },
  header: {
    fontFamily: "Barlow_500Medium",
    fontSize: height * 0.04,
    textAlign: "center",
    color: "#022460",
  },
  label: {
    textAlign: "left",
    fontSize: height * 0.02,
    marginTop: height * 0.01,
    color: "#022460",
  },
  input: {
    width: width * 0.8,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3F51B5",
  },
  button: {
    marginTop: height * 0.03,
    height: height * 0.07,
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 2,
  },
  buttonActive: {
    marginTop: height * 0.03,
    height: height * 0.07,
    backgroundColor: "#022460",
    opacity: 1,
    padding: 10,
    borderRadius: 2,
  },
  caption: {
    textAlign: "center",
    fontSize: height * 0.018,
    marginTop: height * 0.01,
    color: "#022460",
  },
};

export default css;

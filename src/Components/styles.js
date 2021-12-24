import { Dimensions } from "react-native";
const { height } = Dimensions.get("window");
const css = {
  item: {
    borderBottomWidth: 1,
    borderColor: "#022460",
    width: "100%",
  },
  label: {
    fontSize: height * 0.030,
    color: "#022460",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#022460",
    width: "60%",
  },
  buttonText: {
    fontSize: height * 0.025,
    color: "#FFC00C",
  },
};

export default css;

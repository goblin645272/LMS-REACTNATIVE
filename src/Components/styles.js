import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
const css = {
  item: {
    borderBottomWidth: 1,
    borderColor: "#022460",
    width: "100%",
  },
  label: {
    fontSize: 20,
    color: "#022460",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#022460",
    width: "60%",
  },
  buttonText: {
    color: "#FFC00C",
  },
};

export default css;

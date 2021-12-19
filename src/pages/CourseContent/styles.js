import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
const css = {
  scroll: {
    height,
    width,
  },
  card: {
    backgroundColor: "#BEE6F7",
    width: "100%",
    height: height * 0.45,
    padding: 10,
    borderRadius: 10,
  },
  background: {
    height,
    width,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.05,
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
  },
};

export default css;

import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const css = {
  image: {
    width,
    height: height * 0.3,
    marginBottom: height * 0.03,
  },
  text_1: {
    textAlign: "center",
    fontSize: height * 0.035,
    fontFamily: "Barlow_600SemiBold",
    color: "#000260",
    marginBottom: height * 0.04,
  },
  text_2: {
    textAlign: "center",
    fontSize: height * 0.035,
    fontFamily: "Barlow_400Regular",
    color: "#000260",
    marginBottom: height * 0.04,
  },
  background: {
    height: height,
  },
};

export default css;

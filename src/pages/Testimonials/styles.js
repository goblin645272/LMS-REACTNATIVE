import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const css = {
  scroll: {
    flex: 1,
    height,
    width,
  },
  banner: {
    width,
    height: height * 0.3,
    marginBottom: height * 0.03,
  },
  video: {
    minWidth: width * 0.8,
    minHeight: height * 0.25,
    backgroundColor: "transparent",
  },
  card: {
    marginTop: height * 0.025,
    height: height * 0.32,
  },
  cardText: {
    textAlign: "center",
    fontSize: height * 0.03,
    fontFamily: "Barlow_600SemiBold",
  },
  button: {
    width: width / 2,
    backgroundColor: "#022460",
  },
  buttonText: {
    color: "#FFC00C",
    fontSize: height * 0.025,
    fontFamily: "Barlow_400Regular",
  },
};

export default css;

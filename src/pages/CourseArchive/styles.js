import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const css = {
  header: {
    color: "rgb(2,36,96)",
    fontSize: height * 0.027,
    fontFamily: "Barlow_600SemiBold",
    marginBottom: height * 0.01,
  },
  slider: {
    color: "rgb(2,36,96)",
    fontSize: height * 0.035,
    fontFamily: "Barlow_600SemiBold",
    marginBottom: height * 0.01,
  },
  sliderActive: {
    color: "#FFC00C",
    fontSize: height * 0.035,
    paddingBottom: height * 0.01,
    fontFamily: "Barlow_600SemiBold",
    marginBottom: height * 0.01,
    borderBottomWidth: 4.5,
    borderColor: "#FFC00C",
  },
  mode: {
    marginTop: height * 0.05,
    width,
    paddingLeft: width * 0.15,
    paddingRight: width * 0.15,
    marginBottom: height * 0.01,
  },
  content: {
    width: width * 0.92,
    height: height * 0.17,
    borderRadius: 20,
    alignItems: "center",
    paddingTop: height * 0.01,
    paddingBottom: height * 0.02,
  },
  contentTextDate: {
    fontSize: height * 0.035,
    color: "white",
    fontFamily: "Barlow_600SemiBold",
    marginBottom: height * 0.01,
  },
  contentTextCourse: {
    fontSize: height * 0.027,
    color: "white",
    fontFamily: "Barlow_600SemiBold",
  },
  contentTextLink: {
    fontSize: height * 0.02,
    color: "white",
    fontFamily: "Barlow_600SemiBold",
  },
};

export default css;

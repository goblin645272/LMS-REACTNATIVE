import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
const css = {
  background: {
    flex: 1,
    height,
    width,
    padding: width * 0.035,
    
  },
  courseDetails: {
    width: width * 0.95,
    height: height * 0.2,
    padding: width * 0.035,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  courseText: {
    textAlign: "center",
    color: "#022460",
    fontFamily: "Barlow_500Medium",
    fontSize: height * 0.03,
  },
  progress: {
    padding: width * 0.035,
  },
  progressText: {
    fontSize: height * 0.024,
    color: "#022460",
    fontFamily: "Barlow_500Medium",
  },
  progressPercent: {
    fontSize: height * 0.027,
    color: "#022460",
    fontFamily: "Barlow_600SemiBold",
  },
  content: {
    marginTop: height * 0.03,
    padding: width * 0.02,
    width: width * 0.93,
    height: height * 0.17,
    borderRadius: 20,
    justifyContent: "center",
  },
  contentText: {
    fontSize: height * 0.04,
    color: "white",
    fontFamily: "Barlow_500Medium",
  },
};
export default css;

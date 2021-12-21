import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
const css = {
  background: {
    flex: 1,
    height,
    width,
    padding: 10,
  },
  courseDetails: {
    width: width * 0.95,
    height: height * 0.775,
    padding: 10,
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
    padding: 10,
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
    padding: 20,
    width: width * 0.95,
    height: height * 0.15,
    borderRadius: 20,
    justifyContent: "center",
  },
  contentText: {
    fontSize: height * 0.04,
    color: "white",
    fontFamily: "Barlow_500Medium",
  },
  container: {
    height: height * 0.93,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    color: "white",
  },
};
export default css;

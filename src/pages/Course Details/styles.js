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
    width: width * 0.93,
    height: height * 0.2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  inputBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginBottom: height * 0.015,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#3F51B5",
    width: "70%",
  },
  inputModal: {
    marginTop: height * 0.025,
    marginBottom: height * 0.025,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ffffff",
    width: "70%",
    color: "#ffffff",
  },
  courseText: {
    textAlign: "center",
    color: "#022460",
    fontFamily: "Barlow_600SemiBold",
    fontSize: height * 0.023,
  },
  modalText: {
    textAlign: "center",
    color: "#ffffff",
    fontFamily: "Barlow_600SemiBold",
    fontSize: height * 0.02,
    marginBottom: height * 0.025,
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
  courseName: {
    fontSize: height * 0.03,
    color: "#022460",
    fontFamily: "Barlow_500Medium",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
};
export default css;

import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
const css = {
  scroll: {
    flex: 1,
    width: width,
  },
  background: {
    alignItems: "center",
    backgroundColor: "#BEE6F7",
    padding: 10,
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
  Courses: {
    width: width,
  },
  CourseHeader: {
    fontFamily: "Barlow_500Medium",
    fontSize: height * 0.04,
    textAlign: "center",
    color: "#022460",
    marginBottom: height * 0.02,
  },
  CoursesContainer: {
    backgroundColor: "#98B8C6",
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.02,
    borderRadius: 5,
  },
  card: {
    backgroundColor: "white",
    width: width * 0.8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  CourseName: {
    fontFamily: "Barlow_500Medium",
    fontSize: height * 0.025,
    textAlign: "center",
    color: "#022460",
  },
  CourseButton: {
    backgroundColor: "#F3C10C",
    height: 40,
  },
  CouponInput: {
    width: width * 0.65,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3F51B5",
  },
};

export default css;

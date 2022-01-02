import { Dimensions } from "react-native";
const deviceWindow = Dimensions.get("window");
const css = {
  scroll: {
    width: deviceWindow.width,
  },
  background: {
    width: deviceWindow.width,
    flex: 1,
  },
  banner: {
    minHeight:
      deviceWindow.width > 400
        ? deviceWindow.height * 0.4
        : deviceWindow.height * 0.25,
    minWidth: deviceWindow.width,
  },
  bannerContent: {
    maxHeight: deviceWindow.height * 0.27,
    width: deviceWindow.width * 0.7,
    alignItems: "center",
  },

  bannerText: {
    fontSize: deviceWindow.width * 0.035,
    fontFamily: "Barlow_500Medium",
    color: "rgb(2,36,96)",
    margin: 15,
    textAlign: "center",
  },
  bannerButton: {
    width: deviceWindow.width * 0.3,
    backgroundColor: "rgba(2, 36, 96, 0.6)",
    padding: 10,
  },
  bannerButtonText: {
    color: "#f4c10c",
  },
  header: {
    fontSize: deviceWindow.height * 0.035,
    color: "#1D3D76",
    fontFamily: "Barlow_500Medium",
    marginTop: deviceWindow.height * 0,
    marginLeft: deviceWindow.width * 0.04,
    marginBottom: deviceWindow.height * 0.035,
  },
  noCourse: {
    fontSize: deviceWindow.height * 0.02,
    color: "#1D3D76",
    fontFamily: "Barlow_500Medium",
    marginTop: deviceWindow.height * 0,
    marginLeft: deviceWindow.width * 0.04,
    marginBottom: deviceWindow.height * 0.035,
  },
  horizontal: {
    width: deviceWindow.width,
    height: deviceWindow.height * 0.33,
    // borderWidth: 1,
  },
  courseCard: {
    height: deviceWindow.height * 0.35,
    width:
      deviceWindow.width > 400
        ? deviceWindow.width * 0.35
        : deviceWindow.width * 0.5,
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  courseImage: {
    height: deviceWindow.height * 0.12,
    resizeMode: "cover",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width:
      deviceWindow.width > 400
        ? deviceWindow.width * 0.35
        : deviceWindow.width * 0.5,
  },
  courseContainer: {
    height: deviceWindow.height * 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#022460",
    width:
      deviceWindow.width > 400
        ? deviceWindow.width * 0.35
        : deviceWindow.width * 0.5,
  },
  courseContainerRound: {
    height: deviceWindow.height * 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#022460",
    width:
      deviceWindow.width > 400
        ? deviceWindow.width * 0.35
        : deviceWindow.width * 0.5,
    // borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  courseName: {
    color: "white",
    textAlign: "center",
    fontFamily: "Barlow_500Medium",
    fontSize: deviceWindow.height * 0.016,
  },
  courseButtons: {
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: deviceWindow.height * 0.06,
    justifyContent: "space-between",
  },
  courseButton: {
    marginTop: 5,
    backgroundColor: "#355080",
    height: deviceWindow.height * 0.04,
    width: deviceWindow.width * 0.2,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  courseButtonText: {
    color: "white",
    fontFamily: "Barlow_500Medium",
    fontSize: deviceWindow.height * 0.015,
  },
};

export default css;

import { Dimensions } from "react-native";
const deviceWindow = Dimensions.get("window");
const css = {
  scroll: {
    width: deviceWindow.width,
    height: deviceWindow.height,
    flex: 1,
  },
  banner: {
    width: deviceWindow.width,
    height: deviceWindow.height * 0.3,
    maxHeight: deviceWindow.height * 0.3,
    flex: 1,
    padding: 10,
  },
  cardButton: {
    width: deviceWindow.width * 0.3,
    backgroundColor: "rgb(2, 36, 96)",
    padding: 10,
  },
  cardButtonText: {
    color: "#f4c10c",
  },
  text: {
    fontSize: deviceWindow.height * 0.01,
    fontFamily: "Barlow_400Regular",
  },
  header: {
    color: "white",
    fontSize: deviceWindow.height * 0.027,
    fontFamily: "Barlow_600SemiBold",
    marginBottom: deviceWindow.height * 0.01,
  },
  reviewText: {
    color: "white",
    fontSize: deviceWindow.height * 0.02,
    fontFamily: "Barlow_500Medium",
    marginTop: deviceWindow.height * 0.01,
    marginBottom: deviceWindow.height * 0.01,
  },
  background: {
    padding: deviceWindow.height * 0.02,
    borderRadius: 15,
    borderWidth: 0,
    minHeight: deviceWindow.height * 0.3,
    marginBottom: deviceWindow.height * 0.02,
  },
  tabContainer: {
    justifyContent: "center",
    paddingRight: deviceWindow.height * 0.01,
    paddingLeft: deviceWindow.height * 0.01,
    backgroundColor: "#000260",
    height: deviceWindow.height * 0.05,
    paddingTop: deviceWindow.height * 0.01,
  },
  tabs: {
    color: "#FFC00C",
    fontSize: deviceWindow.height * 0.018,
    marginRight: deviceWindow.width * 0.05,
    fontFamily: "Barlow_500Medium",
    height: deviceWindow.height * 0.05,
    alignItems: "center",
  },
  aboutHeader: {
    color: "rgb(2, 36, 96)",
    fontSize: deviceWindow.height * 0.025,
    fontFamily: "Barlow_600SemiBold",
  },
  aboutContent: {
    marginTop: deviceWindow.height * 0.01,
    color: "rgb(2, 36, 96)",
    fontFamily: "Barlow_400Regular",
    textAlign: "justify",
    fontSize: deviceWindow.height * 0.019,
  },
  skills: {
    marginTop: deviceWindow.width * 0.05,
    padding: deviceWindow.width * 0.02,
    borderColor: "grey",
    borderRadius: 10,
    borderWidth: 1,
  },
  skillsHeader: {
    fontSize: deviceWindow.height * 0.02,
    fontFamily: "Barlow_600SemiBold",
    color: "rgb(2, 36, 96)",
    marginBottom: deviceWindow.height * 0.01,
  },
  features: {
    backgroundColor: "#BEE6F7",
    marginTop: deviceWindow.width * 0.03,
    padding: deviceWindow.width * 0.03,
    borderRadius: 8,
  },
  featureContainer: {
    marginBottom: deviceWindow.height * 0.01,
  },
  featureHeader: {
    fontSize: deviceWindow.height * 0.02,
    fontFamily: "Barlow_600SemiBold",
    color: "rgb(2, 36, 96)",
    textAlign: "left",
  },
  featureContent: {
    fontSize: deviceWindow.height * 0.015,
    fontFamily: "Barlow_600SemiBold",
    color: "rgb(2, 36, 96)",
    textAlign: "left",
  },
  instructor: {
    backgroundColor: "#BEE6F7",
    marginTop: deviceWindow.width * 0.03,
    padding: deviceWindow.width * 0.03,
    borderRadius: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  priceCardsHeader: {
    color: "rgb(2,36,96)",
    fontSize: deviceWindow.height * 0.032,
    fontFamily: "Barlow_500Medium",
  },
  priceCardsPrice: {
    color: "rgb(2,36,96)",
    fontSize: deviceWindow.height * 0.028,
    fontFamily: "Barlow_500Medium",
    margin: 0,
    marginBottom: deviceWindow.height * 0.022,
  },
  priceCardsPriceCancelled: {
    color: "rgb(2,36,96)",
    fontSize: deviceWindow.height * 0.02,
    fontFamily: "Barlow_500Medium",
    margin: 0,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  priceQualities: {
    color: "rgb(2,36,96)",
    fontSize: deviceWindow.height * 0.02,
    fontFamily: "Barlow_500Medium",
    margin: 0,
  },
  pricing: {
    color: "rgb(2, 36, 96)",
    fontFamily: "Barlow_600SemiBold",
    fontSize: deviceWindow.width * 0.07,
    textAlign: "center",
  },
};

export default css;

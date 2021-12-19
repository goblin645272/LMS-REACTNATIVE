import { Dimensions } from "react-native";
const deviceWindow = Dimensions.get("window");
const css = {
  scroll: {
    width: deviceWindow.width,
    height: deviceWindow.height,
  },
  background: {
    width: deviceWindow.width,
    height: deviceWindow.height,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background_image: {
    padding: deviceWindow.height * 0.1,
    width: deviceWindow.width,
    alignItems: "center",
    height: deviceWindow.height,
    justifyContent: "center",
    alignItems: "center",
  },
  login_box: {
    padding: deviceWindow.height * 0.03,
    width: deviceWindow.width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    height: deviceWindow.height * 0.8,
    backgroundColor: "rgba(63,81,181,0.18)",
    borderRadius: 16,
  },
  header: {
    color: "#022460",
    fontSize: deviceWindow.height * 0.05,
    fontFamily: "Barlow_500Medium",
    textAlign: "center",
    marginBottom: deviceWindow.height * 0.01,
  },
  input: {
    width: deviceWindow.width * 0.7,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3F51B5",
  },
  inputError: {
    width: deviceWindow.width * 0.7,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ff0000",
  },
  formControl: {
    width: deviceWindow.width * 0.7,
    backgroundColor: "transparent",
  },
  button: {
    width: deviceWindow.width / 2,
    backgroundColor: "#022460",
  },
  button_text: {
    color: "#FFC00C",
    fontSize: deviceWindow.height * 0.025,
    fontFamily: "Barlow_400Regular",
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: deviceWindow.height * 0.01,
  },
  register: {
    color: "#022460",
    fontSize: deviceWindow.height * 0.024,
    marginTop: deviceWindow.height * 0.024,
    fontFamily: "Barlow_400Regular",
    textDecorationLine: "underline",
    textAlign: "center",
  },
};

export default css;

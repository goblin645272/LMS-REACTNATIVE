import {
  changepassword,
  getprofile,
  getboughtcourses,
  login,
  signup,
  updateprofile,
} from "../api/auth";
import { Toast } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signIn = (formData) => async (dispatch) => {
  dispatch({ type: "LOAD" });

  try {
    const { data } = await login(formData);

    if (data.result.role === "admin" || data.result.role === "moderator") {
      dispatch({ type: "UNLOAD" });
      Toast.show({
        title: "Admin and Moderator cannot log in",
        isClosable: true,
      });
    } else {
      await AsyncStorage.setItem("token", data.token);
      dispatch({ type: "LOGIN", data: data });
      dispatch({ type: "UNLOAD" });
      Toast.show({
        title: "Logged In",
        isClosable: true,
      });
    }
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    console.log(error);

    if (error.response?.status === 400) {
      Toast.show({
        title: "Invalid Credentials",
        isClosable: true,
      });
    } else {
      Toast.show({
        title: "Something went Wrong! Please try again later",
        isClosable: true,
      });
    }
  }
};
export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "LOAD" });
  try {
    const { data } = await signup(formData);
    await AsyncStorage.setItem("token", data.token);
    dispatch({ type: "LOGIN", data: data });
    dispatch({ type: "UNLOAD" });
    Toast.show({
      title: "Logged In",
      isClosable: true,
    });
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    console.log(error);
    if (error.response?.status === 400) {
      Toast.show({
        title: "Email already in use",
        isClosable: true,
      });
    } else {
      Toast.show({
        title: "Something went Wrong! Please try again later",
        isClosable: true,
      });
    }
  }
};

// export const generateVerifyOTP = async (formdata, state, disable) => {
//   try {
//     const { data } = await generateverificationotp(formdata);
//     if (data.message) {
//       state();
//       disable();
//       toast("An OTP has been sent on your entered email.");
//       return localStorage.setItem("token", data.token);
//     }
//   } catch (error) {
//     if (error.response.status === 409) {
//       toast("Email already exists");
//     } else {
//       toast("Something went wrong....");
//     }
//     state();
//   }
// };

// export const emailVerifyOTP = async (formdata, state, register2) => {
//   try {
//     const { data } = await verifyverificationotp(formdata);
//     if (data.message) {
//       state();
//       register2();
//       toast.success("You have registered sucessfully .");
//     }
//   } catch (error) {
//     state();
//     toast("Please enter a valid otp");
//   }
// };

export const getBoughtCourses = async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await getboughtcourses();
    dispatch({ type: "UNLOAD" });

    return data.result;
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    console.log(error);
  }
};

export const changePassword = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });

    const { data } = await changepassword(formdata);
    dispatch({ type: "UNLOAD" });
    Toast.show({
      title: "Password changed",
      isClosable: true,
    });
  } catch (error) {
    dispatch({ type: "UNLOAD" });

    Toast.show({
      title: "Something went wrong",
      isClosable: true,
    });
    console.log(error);
  }
};

export const getProfile = async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await getprofile();

    dispatch({ type: "UNLOAD" });
    return data.result;
  } catch (error) {
    console.log(error);
    dispatch({ type: "UNLOAD" });
  }
};

export const updateProfile =
  (formdata, setState, buffer) => async (dispatch) => {
    try {
      dispatch({ type: "LOAD" });
      const { data } = await updateprofile(formdata);
      dispatch({ type: "UNLOAD" });
      setState(data.result);
      buffer();
    } catch (error) {
      console.log(error);
      dispatch({ type: "UNLOAD" });
    }
  };

export const logout = async (dispatch) => {
  try {
    dispatch({ type: "LOGOUT" });
    await AsyncStorage.clear();
    Toast.show({
      title: "Logged Out",
      isClosable: true,
    });
  } catch (error) {
    console.log(error);
    Toast.show({
      title: "Something went Wrong! Please try again later",
      isClosable: true,
    });
  }
};

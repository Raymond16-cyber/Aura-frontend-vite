import axios from "axios";
import {
  CLEAR_ERRORS,
  CLEAR_SUCCESS_MESSAGE,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  VERIFY_EMAIL_FAIL,
  VERIFY_EMAIL_SUCCESS,
} from "../types/type";

const baseURL = "https://aura-backend-1-53kt.onrender.com";

// clear success message
export const clearSuccessMessage = () => (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS_MESSAGE,
    payload: "",
  });
};

// clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
    payload: "",
  });
};

// register action
export const registerAction = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseURL}/api/auth/register`, data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          success: response.data.success,
          message: response.data.message,
          url: response.data.url,
        },
      });
    } catch (error) {
      const errorMsg = error.response?.data?.error || error?.message;
      dispatch({
        type: REGISTER_FAIL,
        payload: { error: errorMsg },
      });
      console.error("Registration error:", errorMsg);
    }
  };
};

// login action
export const loginAction = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseURL}/api/auth/login`, data);
      localStorage.setItem("token", response.data.token);
      const decodedToken = JSON.parse(atob(response.data.token.split(".")[1]));
      console.log("Decoded Token:", decodedToken);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          message: response.data.message,
          user: decodedToken,
        },
      });
    } catch (error) {
      const errorMsg = error.response?.data?.error || error?.message;
      dispatch({
        type: LOGIN_FAIL,
        payload: { error: errorMsg },
      });
      console.error(
        "Login error:",
        error.response?.data?.error || error?.error
      );
    }
  };
};

// verify email action
export const verifyEmailAction = (token) => {
  return async (dispatch) => {
    console.log("Verifying email with token:", token);
    try {
      const response = await axios.get(
        `${baseURL}/api/auth/verify-email/${token}`
      );
      dispatch({
        type: VERIFY_EMAIL_SUCCESS,
        payload: { message: response.data.message },
      });
    } catch (error) {
      const errorMsg = error.response?.data?.error || error?.message;
      dispatch({
        type: VERIFY_EMAIL_FAIL,
        payload: { error: errorMsg },
      });
      console.error("Email verification error:", errorMsg);
    }
  };
};

export const forgotPasswordAction = (email) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseURL}/api/auth/forgot-password`, {
        email,
      });
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: {
          success: response.data.success,
          message: response.data.message,
          url: response.data.url,
        },
      });
    } catch (error) {
      const errorMsg = error.response?.data?.error || error?.message;
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: { error: errorMsg },
      });
      console.error("Forgot password error:", errorMsg);
    }
  };
};

export const resetPasswordAction = (token, newPassword) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/reset-password`,

        { token, password: newPassword }
      );
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: { message: response.data.message },
      });
    } catch (error) {
      const errorMsg = error.response?.data?.error || error?.message;
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: { error: errorMsg },
      });
      console.error("Reset password error:", errorMsg);
    }
  };
};

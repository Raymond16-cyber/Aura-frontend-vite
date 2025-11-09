import {
  CLEAR_ERRORS,
  CLEAR_SUCCESS_MESSAGE,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  VERIFY_EMAIL_FAIL,
  VERIFY_EMAIL_SUCCESS,
} from "../types/type";

const authState = {
  myInfo: {},
  loading: false,
  isAuthenticated: false,
  error: "",
  successMessage: "",
  url: "",
};

export const authReducer = (state = authState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: "",
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: "",
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        successMessage: payload.message,
        url: payload.url,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: payload.error,
      };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        successMessage: payload.message,
        url: "",
      };
    case VERIFY_EMAIL_FAIL:
      return {
        ...state,
        error: payload.error,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        myInfo: payload.user,
        successMessage: payload.message,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        successMessage: payload.message,
        url: payload.url,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        error: payload.error,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        successMessage: payload.message,
        url: "",
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};

import {
  CLEAR_ERRORS,
  CLEAR_SUCCESS_MESSAGE,
  WAITLIST_JOIN_FAIL,
  WAITLIST_JOIN_SUCCESS,
} from "../types/type";

const waitlistState = {
  successMessage: "",
  error: null,
  referralCode: null,
  waitlistPosition: null,
  success:false
};

export const waitlistReducer = (state = waitlistState, action) => {
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
    case WAITLIST_JOIN_SUCCESS:
      return {
        ...state,
        successMessage: payload.message,
        success: payload.success,
        referralCode: payload.referralCode,
        waitlistPosition: payload.waitlistPosition,
      };
    case WAITLIST_JOIN_FAIL:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};

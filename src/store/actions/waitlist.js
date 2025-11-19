import axios from "axios";
import { WAITLIST_JOIN_FAIL, WAITLIST_JOIN_SUCCESS } from "../types/type";

const baseURL = "https://aura-backend-b781be7b7d74.herokuapp.com";

export const joinWaitlistAction =
  ({fullName, email, referralCode}) => async (dispatch) => {
    try {
      const res = await axios.post(`${baseURL}/waitlist/join`, {
        email,
        name: fullName,
        referralCode: referralCode || null,
      });

      dispatch({
        type: WAITLIST_JOIN_SUCCESS,
        payload: {
          message: res.data.message,
          success: res.data.success,
          referralCode: res.data.referralCode,
          waitlistPosition: res.data.waitlistPosition,
        },
      });
    } catch (error) {
      const errMsg = error.response?.data?.error || "Something went wrong.";
      console.error("Join waitlist error:", errMsg);
      dispatch({
        type: WAITLIST_JOIN_FAIL,
        payload: {
          error: errMsg,
        },
      });
    }
  };

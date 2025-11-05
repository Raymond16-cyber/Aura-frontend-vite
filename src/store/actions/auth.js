import axios from "axios";


const baseURL = "http://localhost:4000";

// register action
export const registerAction = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/register`,
        data
      );
    } catch (error) {}
  };
};


// login action
export const loginAction = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/login`,
        data
      );
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.error || error?.error
      );
      throw error;
    }
  };
};

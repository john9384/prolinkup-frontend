import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../../helpers/setAuthToken";
import jwt_decode from "jwt-decode";
import config from "../../config";

export const signupUser = (userData, history) => (dispatch) => {
  axios
    .post(`${config.api.prefix}/user/sign-up`, userData)
    .then((res) => {
      history.push("/login");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const loginUser = (userData) => (dispatch) => {
  axios
    .post(`${config.api.prefix}/user/authenticate`, userData)
    .then((res) => {
      const { token } = res.data.content;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

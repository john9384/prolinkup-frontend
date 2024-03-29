import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
} from "../actions/types";
const initialState = {
  user: null,
  list: null,
  loading: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default profileReducer;

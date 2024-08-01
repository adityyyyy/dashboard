import { Reducer } from "react";
import { AuthAction } from "./authActions";

export interface AuthState {
  isLoggedIn: boolean;
  authToken?: string;
  adminId?: string;
  name?: string;
  username?: string;
}

export const defaultAuthState: AuthState = {
  isLoggedIn: false,
};

const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  if (action.type === "LOG_IN") {
    console.log(action.payload);
    localStorage.setItem("user", JSON.stringify(action.payload));

    return {
      ...state,
      isLoggedIn: true,
      authToken: action.payload.authToken,
      adminId: action.payload.adminId,
      name: action.payload.name,
      username: action.payload.username,
    };
  }

  if (action.type === "LOG_OUT") {
    localStorage.removeItem("user");

    return defaultAuthState;
  }

  return state;
};

export default authReducer;

import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";
import authReducer, { AuthState, defaultAuthState } from "./authReducer";
import { AuthActionEnum } from "./authActions";

type AuthProviderProps = {
  children: React.ReactElement;
};

export type UserData = {
  authToken: string;
  adminId: number;
  name: string;
  username: string;
};

export interface AuthContext {
  authState: AuthState;
  globalLogInDispatch: (props: UserData) => void;
  globalLogOutDispatch: () => void;
}

const authCtx = createContext<AuthContext>({
  authState: defaultAuthState,
  globalLogInDispatch: () => {},
  globalLogOutDispatch: () => {},
});

export const AuthContextProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const [authState, authDispatch] = useReducer(authReducer, defaultAuthState);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const userData: UserData = JSON.parse(user);
      authDispatch({ type: AuthActionEnum.LOG_IN, payload: userData });
    }
  }, []);

  const globalLogInDispatch = useCallback((props: UserData) => {
    const { authToken, username, name, adminId } = props;
    console.log(props);
    authDispatch({
      type: AuthActionEnum.LOG_IN,
      payload: {
        authToken,
        adminId,
        name,
        username,
      },
    });
  }, []);

  const globalLogOutDispatch = useCallback(() => {
    authDispatch({ type: AuthActionEnum.LOG_OUT, payload: null });
    navigate("/login");
  }, [navigate]);

  const ctx = { authState, globalLogInDispatch, globalLogOutDispatch };

  return <authCtx.Provider value={ctx}>{children}</authCtx.Provider>;
};

export default authCtx;

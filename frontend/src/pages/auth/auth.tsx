import AuthContext from "../../store/AuthContextProvider";
import LoginForm from "../../components/login-form";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthData } from "../../definitions";
import axios from "axios";

const Auth = () => {
  const [authData, setAuthData] = useState<AuthData>();
  const { authState, globalLogInDispatch } = useContext(AuthContext);

  useEffect(() => {
    if (authData && "success" in authData) {
      globalLogInDispatch({
        authToken: authData.admin.auth_token,
        adminId: authData.admin.adminId,
        name: authData.admin.name,
        username: authData.admin.username,
      });
    }
  }, [authData, globalLogInDispatch]);

  // if (authState.isLoggedIn) {
  //   return <Navigate to="/" />;
  // }

  const authHandler = async (admin: { username: string; password: string }) => {
    axios
      .post(
        "http://localhost:3030/api/auth/login",
        {
          username: admin.username,
          password: admin.password,
        },
        {
          headers: {
            "x-access-token": authState.authToken,
            "Content-Type": "application/json",
          },
        },
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  return <LoginForm onSubmit={authHandler} />;
};

export default Auth;

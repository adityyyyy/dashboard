import { Navigate, Outlet } from "react-router-dom";
// import { useContext } from "react";
// import authCtx from "../../store/AuthContextProvider";
import NavBar from "../../components/navbar";

export default function Home() {
  // const { authState } = useContext(authCtx);

  // if (authState.isLoggedIn) {
  return (
    <div className="home">
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
  // } else {
  //   return <h1>Sum</h1>;
  // return <Navigate to="/login" />;
  // }
}

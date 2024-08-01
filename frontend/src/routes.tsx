import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// import Auth from "./pages/auth/auth";
import Home from "./pages/home/Home";
import Users from "./pages/users/users";
import Create from "./pages/create/create";
import Edit from "./pages/edit/edit";
import { AuthLayout } from "./store/authLayout";
import App from "./App";
import Dashboard from "./pages/dashboard/dashboard";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route element={<App />}>
        {/* <Route path="/login" element={<Auth />} /> */}
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="/employees" element={<Users />} />
          <Route path="/employee/create" element={<Create />} />
          <Route path="/employee/:id/edit/*" element={<Edit />} />
        </Route>
      </Route>
    </Route>,
  ),
);

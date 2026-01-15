import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [
    //   {
    //     path: "/",
    //     element: <DashboardManagement />,
    //   },
    // ]
  },
  {
    path: "/register",
    element: (
        <Register />
    ),
  },
  {
    path: "/login",
    element: (
        <Login />
    ),
  },
]);

export default router;
